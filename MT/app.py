from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo
from pprint import pprint

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/countries_info_db")
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