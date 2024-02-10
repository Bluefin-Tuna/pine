import requests
import feedparser
import requests

def fetch_paper_details_by_title_with_key(title, api_key):
    # URL for Semantic Scholar's paper search endpoint
    search_url = 'https://api.semanticscholar.org/graph/v1/paper/search'

    # Prepare headers with the API key
    headers = {
        'x-api-key': api_key
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
            paper_details['authors'] = [{'name': author['name']} for author in result.get('authors', [])]
            paper_details['url'] = f"https://www.semanticscholar.org/paper/{result.get('paperId')}"  # Construct the URL

            print("Paper Details:", paper_details)
        else:
            print("No paper found matching the title.")
    else:
        # If the response code is not 200, print the error
        print(f"Error fetching data: HTTP {response.status_code} - {response.reason}")

    return paper_details



# Example usage
doi = 'ImageNet Classification with Deep Convolutional Neural Networks'  # Replace with your specific DOI
api_key = '9RgMpk4pid9xVnigSzo5SaQWq5nb202J7turPVPQ'  # Replace with your Semantic Scholar API key
paper_details = fetch_paper_details_by_title_with_key(doi, api_key)



def find_similar_papers_by_title(title, api_key):
    # URL for Semantic Scholar's paper search endpoint
    search_url = 'https://api.semanticscholar.org/graph/v1/paper/search'

    # Prepare headers with the API key
    headers = {'x-api-key': api_key}

    # Set up search parameters
    params = {
        'query': title,
        'limit': 5,  # Adjust based on how many similar papers you want to find
        'fields': 'title,authors,abstract,year'
    }

    # Perform the search request
    response = requests.get(search_url, headers=headers, params=params)

    if response.status_code == 200:
        results = response.json().get('data', [])
        similar_papers = []
        for result in results:
            paper = {
                'title': result.get('title'),
                'year': result.get('year'),
                'abstract': result.get('abstract'),
                'authors': ', '.join([author['name'] for author in result.get('authors', [])]),

            }
            similar_papers.append(paper)

        return similar_papers
    else:
        print(f"Failed to fetch similar papers: HTTP {response.status_code} - {response.reason}")
        return []



# Example usage
title = "ImageNet classification with deep convolutional neural networks"  # Use the title of the paper you're interested in
api_key = '9RgMpk4pid9xVnigSzo5SaQWq5nb202J7turPVPQ'  # Replace with your Semantic Scholar API key
similar_papers = find_similar_papers_by_title(title, api_key)

for paper in similar_papers:
    print(paper)








