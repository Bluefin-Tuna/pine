# services.py
import requests
from xml.etree import ElementTree
from octoai.client import Client


def parse_xml_metadata(xml_data):
    """Parse XML data to extract author names, paper title, and summary."""
    ns = {'atom': 'http://www.w3.org/2005/Atom'}  # Define namespace for XML parsing
    root = ElementTree.fromstring(xml_data)

    # Initialize the dictionary to hold the extracted information
    paper_info = {'authors': [], 'title': None, 'summary': None}

    # Extract the title and summary
    paper_info['title'] = root.find('atom:entry/atom:title', ns).text.strip()
    paper_info['summary'] = root.find('atom:entry/atom:summary', ns).text.strip()

    # Extract author names
    authors = root.findall('atom:entry/atom:author/atom:name', ns)
    for author in authors:
        paper_info['authors'].append(author.text)

    return paper_info


def fetch_arxiv_metadata(arxiv_id):
    # fetch paper metadata from the arXiv API and parse it.
    arxiv_api_url = f'http://export.arxiv.org/api/query?id_list={arxiv_id}'
    try:
        response = requests.get(arxiv_api_url)
        response.raise_for_status()
        return parse_xml_metadata(response.text)
    except requests.RequestException as e:
        print(f"Request failed: {e}")
        return None


def fetch_and_store_paper(arxiv_id, parent_id=None, connection=None):
    # Fetch a paper's metadata from arXiv, parse it, and store it in MongoDB along with
    # information about its parent paper and the connection to it.
    from app import mongo
    # Fetch paper metadata from the arXiv API and parse it.

    metadata = fetch_arxiv_metadata(arxiv_id)
    if metadata:
        # Store the paper's metadata along with parent and connection information in MongoDB
        paper_document = {
            "arxiv_id": arxiv_id,
            "title": metadata['title'],
            "authors": metadata['authors'],
            "summary": metadata['summary'],
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
