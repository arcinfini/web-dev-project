import sqlite3
import os, sys, logging
from flask import Flask, abort, request, redirect, url_for, send_from_directory, make_response
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

gunicorn_logger = logging.getLogger('gunicorn.error')
app.logger.handlers = gunicorn_logger.handlers
app.logger.setLevel(gunicorn_logger.level)

# https://flask.palletsprojects.com/en/2.3.x/api/#flask.Flask.errorhandler

@app.errorhandler(404)
def not_found(e):
    return f"<div><p>the page you were looking for was not found</p></br><b>{request.url}</b>"

with sqlite3.connect("data.sqlite") as conn:

    conn.execute(
        """
        CREATE TABLE IF NOT EXISTS contact (
            name TEXT,
            email TEXT NOT NULL,
            message TEXT NOT NULL
        )
        """
    )

    conn.commit()

import csv

def read_csv(file_path):
    data_list = []

    with open(file_path, 'r', newline='', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file)

        for row in csv_reader:
            data_list.append(dict(row))

    return data_list

@app.route("/api/about", methods=["GET"])
def about_content():
    with open("about.txt", "r") as file:
        content = file.read()
    
    
    resp = make_response( {
        "content": content
    }, 200)

    return resp

@app.route("/api/contact/send", methods=["POST"])
def contact_send():
    print(request.json)

    try:
        with sqlite3.connect("data.sqlite") as conn:
            conn.executemany(
                """
                INSERT INTO contact (name, email, message) 
                VALUES (?, ?, ?)
                """,
                ([x['name'], x['email'], x['message']] for x in request.json)
            )
    except:
        return {}, 500

    return {}, 200

@app.route("/api/projects", methods=["GET"])
def fetch_projects():
    data = read_csv('projects.csv')
    print(data)

    resp = make_response( {
        "results": data
    }, 200)

    return resp

if __name__ == '__main__':
    app.run(debug=True,host='0.0.0.0')