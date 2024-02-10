# services.py
import requests
from xml.etree import ElementTree

from octoai.client import Client
ss_api_key = '9RgMpk4pid9xVnigSzo5SaQWq5nb202J7turPVPQ'

def fetch_paper_details(title):
    # URL for Semantic Scholar's paper search endpoint
    search_url = 'https://api.semanticscholar.org/graph/v1/paper/search'

    # Prepare headers with the API key
    headers = {
        'x-api-key': ss_api_key
    }

    # Set up search parameters
    params = {
        'query': title,
        'limit': 1,  # Assuming the first result is the most relevant
        'fields': 'title,abstract,authors,paperId'  # Specify the details you want to fetch
    }

    # Make the GET request to the Semantic Scholar search endpoint with the header
    response = requests.get(search_url, headers=headers, params=params)

    paper_details = {}

    if response.status_code == 200:
        # Parse the JSON response
        data = response.json()
        results = data.get('data', [])
        if results:
            # Assuming the first result is the most relevant
            result = results[0]
            paper_details['title'] = result.get('title')
            paper_details['abstract'] = result.get('abstract')
            paper_details['authors'] = [author['name'] for author in result.get('authors', [])]
            paper_details['uri'] = f"https://www.semanticscholar.org/paper/{result.get('paperId')}"
            print("Paper Details:", paper_details)
        else:
            print("No paper found matching the title.")
    else:
        # If the response code is not 200, print the error
        print(f"Error fetching data: HTTP {response.status_code} - {response.reason}")

    return paper_details

def find_similar_papers_by_title(parent_title, num_papers):
    # URL for Semantic Scholar's paper search endpoint
    search_url = 'https://api.semanticscholar.org/graph/v1/paper/search'

    # Prepare headers with the API key
    headers = {'x-api-key': ss_api_key}

    # Set up search parameters
    params = {
        'query': parent_title,
        'limit': num_papers,  # Adjust based on how many similar papers you want to find
        'fields': 'title,authors,abstract,paperId'
    }

    # Perform the search request
    response = requests.get(search_url, headers=headers, params=params)

    if response.status_code == 200:
        results = response.json().get('data', [])
        similar_papers = []
        for result in results:
            paper = {}
            paper['title'] = result.get('title')
            paper['abstract'] = result.get('abstract')
            paper['authors'] = [author['name'] for author in result.get('authors', [])]
            paper['uri'] = f"https://www.semanticscholar.org/paper/{result.get('paperId')}"
            similar_papers.append(paper)

        return similar_papers
    else:
        print(f"Failed to fetch similar papers: HTTP {response.status_code} - {response.reason}")
        return []


def fetch_and_store_paper(paper_name, parent_id=None, connection=None):
    # Fetch a paper's metadata from arXiv, parse it, and store it in MongoDB along with
    # information about its parent paper and the connection to it.
    from app import mongo
    # Fetch paper metadata from the arXiv API and parse it.

    metadata = fetch_paper_details(paper_name)
    if metadata:
        # Store the paper's metadata along with parent and connection information in MongoDB
        paper_document = {
            "title": metadata['title'],
            "abstract": metadata['abstract'],
            "authors": metadata['authors'],
            "uri": metadata['uri'],
            "parent": parent_id,  # Store the parent ID
            "connection": connection,  # Store the connection description
        }
        mongo.db.papers.insert_one(paper_document)
        return {"message": "Paper stored successfully", "paper_id": str(paper_document['_id'])}
    else:
        return {"message": "Failed to fetch paper metadata"}


def generate_connection(a1, a2):
    from octoai.client import Client

    client = Client(
        token="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjNkMjMzOTQ5In0.eyJzdWIiOiI5MDdiYWZlNy0xNDkxLTRkODgtOTczZS0zZDQ5MjgyZDk0NGUiLCJ0eXBlIjoidXNlckFjY2Vzc1Rva2VuIiwidGVuYW50SWQiOiI3YjJkYmNkOC02ZDRlLTQxNzAtYTUyOC00ODkyN2JiNjQyZWQiLCJ1c2VySWQiOiI1MTFkY2VkMC04MTgwLTQ1N2YtYTUyZC00YzI0NTA1YThiMWUiLCJyb2xlcyI6WyJGRVRDSC1ST0xFUy1CWS1BUEkiXSwicGVybWlzc2lvbnMiOlsiRkVUQ0gtUEVSTUlTU0lPTlMtQlktQVBJIl0sImF1ZCI6IjNkMjMzOTQ5LWEyZmItNGFiMC1iN2VjLTQ2ZjYyNTVjNTEwZSIsImlzcyI6Imh0dHBzOi8vaWRlbnRpdHkub2N0b21sLmFpIiwiaWF0IjoxNzA3NTkxNjg4fQ.PdRBN1PzrFyPMrtQUwT47zIOwn9so-hXOOPSJFJ3hTWQ1DzwBeqB18RnhtFafcXkmOEN2Sgz5DRLIKgoKuQT5yD8jHShnLSFRMRHmcBd7_xJO803YTWteLM1RJRs3rXJUrsYgpsu5c1OOQakzpO4Ox9uXekMmi0TOELZo7Zjl1uP52wzlS0TsN6jL-3SeXnrbfMkuSUQSQRdglcdcBNQq8zTD7GjyAOV5V-zNsGiwD9HrEV-o39scGLIeOlOBp4wcfDsKA65lcKz-HOv4-gefmEXfXGk58VXw9S47bnNDQ2Nh0Jpf0pn560Qh6FiYyPCKBkRP9ofz-NkAFNQ9i0zVw")

    completion = client.chat.completions.create(
        messages=[
            {
                "role": "system",
                "content": "Just read paper 1. Based on abstract 1, give 10 word description on how it relates ("
                           "varying perspective, smilar topic, etc) to abstract2. EXAMPLE: Expands on x topic. "
                           "EXAMPLE: Disputes x claim. EXAMPLE: Dives deeper into x topic."
            },
            {
                "role": "user",
                "content": "abstract1: " + a1 + ", abstract2: " + a2
            }
        ],
        model="llama-2-70b-chat-fp16",
        max_tokens=100,
        presence_penalty=0,
        temperature=0.1,
        top_p=0.9,
    )

    content = completion.dict()['choices'][0]['message']['content'].strip()
    return content


#def add_children(parent_title):


