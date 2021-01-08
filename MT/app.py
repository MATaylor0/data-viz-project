from flask import Flask, render_template, redirect
from flask_pymongo import PyMongo
import scrape_mars
import codecs

app = Flask(__name__)

mongo = PyMongo(app, uri="mongodb://localhost:27017/mars_app")

@app.route("/")
def index():

    mars = mongo.db.collection.find_one()
    
    return render_template("index.html", mars = mars)

@app.route("/scrape")
def scrape():
    
    scrape_dict = scrape_mars.scrape()

    mongo.db.collection.update({}, scrape_dict, upsert = True)

    return redirect("/", code = 302)


if __name__ == "__main__":
    app.run(debug=True)