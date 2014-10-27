#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask import Flask
from flask import g
from flask import request, redirect
import json
import sqlite3

app = Flask(__name__)


@app.before_request
def before_request():
    g.db = sqlite3.connect("shapes.db")

@app.teardown_request
def teardown_request(exception):
    if hasattr(g, 'db'):
        g.db.close()

@app.route('/save_json', methods = ['POST'])
def save_json():
    data = request.form['data']
    g.db.execute("INSERT INTO shapes VALUES (?)", [data])
    g.db.commit()
    print "salvo data"
    # return redirect('/')

# @app.route('/emails')
# def emails():
#     email_addresses = g.db.execute("SELECT email FROM email_addresses").fetchall()
#     return render_template('emails.html', email_addresses=email_addresses)

@app.route('/export_json', methods = ['POST'])
def export_json():
    json_data = json.dumps(data)
    with open('data_flask.txt', 'w') as outfile:    
        json.dump(data, some_file_object)
    print "esporto json_data"
    return redirect('/')


@app.route('/', methods = ['POST'])
def print_prova():
    print "funziona!"
    return redirect('/')

if __name__ == '__main__':
	app.run(debug=True)


