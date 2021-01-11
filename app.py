from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from pprint import pprint
from config import password

app = Flask(__name__)

conn = f"mongodb+srv://admin:{password}@cluster0.c0z5f.mongodb.net/countries_info_db?retryWrites=true&w=majority"
mongo = PyMongo(app, uri = conn)

collection = mongo.db.countries_info
country_data = collection.find_one()

print(country_data["Australia"]["data"])

@app.route("/")
def index():
    
    return render_template("index.html")

@app.route("/data/<country>")
def retreive(country):

    data = {}

    data = country_data[country]["data"]

    return jsonify(data)

if __name__ == "__main__":
    app.run(debug=True)