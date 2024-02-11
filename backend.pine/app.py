from flask import Flask
from flask_pymongo import PyMongo
from routes import bp as paper_bp

app = Flask(__name__)

app.config["MONGO_URI"] = "mongodb+srv://new:new@cluster0.otzl1xs.mongodb.net/test?retryWrites=true&w=majority"

mongo = PyMongo(app)

# Register blueprints
app.register_blueprint(paper_bp, url_prefix='/')

if __name__ == '__main__':
    app.run(debug=True)
