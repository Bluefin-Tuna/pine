from flask import Blueprint, jsonify, request, abort
from bson.objectid import ObjectId
from services import fetch_and_store_paper

bp = Blueprint('papers', __name__)

@bp.route('/')
def hello_world():
    # Implement logic to retrieve papers from the database
    return "Hello World"


@bp.route('/get/<id>', methods=['GET'])
def get_paper(id):
    from app import mongo
    # Directly use the id string to query the document, as _id is now a string
    paper = mongo.db.papers.find_one({"_id": id})
    if not paper:
        return abort(404, description="Paper not found")

    # No need to convert _id to string, as it's already a string
    return jsonify(paper)


@bp.route('/add', methods=['POST'])
def add_paper():
    data = request.json
    paper_name = data.get('paper_name')
    result = fetch_and_store_paper(paper_name)
    return jsonify(result)

# Add more routes as needed
