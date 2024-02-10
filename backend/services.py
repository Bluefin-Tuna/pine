import requests
def fetch_arxiv_metadata(arxiv_id):
    """Fetch paper metadata from the arXiv API."""
    arxiv_api_url = f'http://export.arxiv.org/api/query?id_list={arxiv_id}'
    response = requests.get(arxiv_api_url)
    if response.status_code == 200:
        # Here, you would parse the XML response to extract needed information.
        return response.text
    else:
        return None

def fetch_and_store_paper(arxiv_id):
    from app import mongo
    """Fetch a paper's metadata from arXiv and store it in MongoDB."""
    metadata = fetch_arxiv_metadata(arxiv_id)
    if metadata:
        mongo.db.papers.insert_one({"arxiv_id": arxiv_id, "metadata": metadata})
        return {"message": "Paper stored successfully"}
    else:
        return {"message": "Failed to fetch paper metadata"}
