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
    try:
        obj_id = ObjectId(id)
    except:
        return abort(400, description="Invalid paper ID format")

    paper = mongo.db.papers.find_one({"_id": obj_id})
    if not paper:
        return abort(404, description="Paper not found")

    paper['_id'] = str(paper['_id'])
    return jsonify(paper)


@bp.route('/add', methods=['POST'])
def add_paper():
    data = request.json
    arxiv_id = data.get('arxiv_id')
    result = fetch_and_store_paper(arxiv_id)
    return jsonify(result)

# Add more routes as needed
