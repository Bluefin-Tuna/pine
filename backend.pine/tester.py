
from app import mongo
paper = mongo.db.papers.find_one({"_id": "8095a4fc1e5748c1ab7f18c65c6b57bc"})
print(paper)
