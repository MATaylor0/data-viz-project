from flask import Flask, render_template, redirect, jsonify
from flask_pymongo import PyMongo

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/countries_info_db")

@app.route("/")
def index():

    # mars = mongo.db.collection.find_one()
    
    return render_template("index.html") #export = export_data)

@app.route("/data/<country>")
def retreive(country):


@app.route("/scrape")
def scrape():
    
    scrape_dict = scrape_mars.scrape()

    mongo.db.collection.update({}, scrape_dict, upsert = True)

    return redirect("/", code = 302)


if __name__ == "__main__":
    app.run(debug=True)