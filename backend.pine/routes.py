from flask import Blueprint, jsonify, request, abort
from bson.objectid import ObjectId
from services import fetch_and_store_paper
from services import add_children

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
    response = jsonify(paper)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

@bp.route('/add-children', methods=['POST'])
def addchildren():
    data = request.json
    uuid = data.get('uuid')
    result = add_children(uuid)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


@bp.route('/add', methods=['POST'])
def add_paper():
    data = request.get_json(force=True)
    paper_name = data.get('paper_name')
    result = fetch_and_store_paper(paper_name)
    response = jsonify(result)
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response

# Add more routes as needed
