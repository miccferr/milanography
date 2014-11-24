#!/usr/bin/env python
# -*- coding: utf-8 -*-
import os
from flask import Flask
from flask import g
from flask import request, redirect
from flask import render_template
import json

from flask.ext.sqlalchemy import SQLAlchemy
from sqlalchemy import Table, MetaData, create_engine

app = Flask(__name__)
# app.config.from_pyfile(config.py)
# db = SQLAlchemy(app)
engine = create_engine("postgresql://mic:@localhost/milanography",
                       client_encoding='utf8')
with engine.connect() as conn:

# @app.before_request
# def before_request():
#     g.db = sqlite3.connect("shapes.db")

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
    print data
    return redirect('/')

@app.route('/', methods = ['GET'])
def print_prova():
    print "funziona!"
    return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)



