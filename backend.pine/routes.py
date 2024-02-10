from flask import Blueprint, jsonify, request

from services import fetch_and_store_paper

bp = Blueprint('papers', __name__)

@bp.route('/')
def hello_world():
    # Implement logic to retrieve papers from the database
    return "Hello World"

@bp.route('/get', methods=['ADD'])
def get_papers():
    # Implement logic to retrieve papers from the database
    pass


@bp.route('/add', methods=['POST'])
def add_paper():
    data = request.json
    arxiv_id = data.get('arxiv_id')
    result = fetch_and_store_paper(arxiv_id)
    return jsonify(result)

# Add more routes as needed
