from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from routes import bp as paper_bp

app = Flask(__name__)

CORS(app)
app.config["MONGO_URI"] = "INSERT_URI_HERE"

mongo = PyMongo(app)


# Register blueprints
app.register_blueprint(paper_bp, url_prefix='/')

if __name__ == '__main__':
    app.run(debug=True)
