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

#def generate_connection(paper1, paper2):
