#!/usr/bin/env python
# -*- coding: utf-8 -*-

# SQL command to create a table 
# CREATE TABLE shapes (id integer, data json);

import psycopg2
import sys
from flask import Flask
from flask.ext.sqlalchemy import SQLAlchemy
from flask import request, redirect
from flask import render_template
from flask.ext.sqlalchemy import SQLAlchemy


app = Flask(__name__)

db_conn = 'postgresql+psycopg2://mic:@localhost/milanography'
app.config['SQLALCHEMY_DATABASE_URI'] = db_conn

con = psycopg2.connect(database='milanography', user='mic') 
cur = con.cursor()

# is this part still useful?
# @app.before_request
# def before_request():
#     try:
#         cur.connect()
#         cur.execute('SELECT version(); ')          
#         ver = cur.fetchone()
#         print ver 
#     except psycopg2.DatabaseError, e:
#         print 'Error %s' % e    
#         sys.exit(1) 

# @app.teardown_request
# def teardown_request(exception):      
#     con.close()

# good explanation  of the following code:
# https://stackoverflow.com/questions/5342698/cursor-executeinsert-into-im-entry-test-entrym-values-p
@app.route('/save_json', methods = ['POST'])
def save_json():    
    data = request.form['data']
    if data != '':
        cur.execute('INSERT INTO shapes (data) VALUES (%s)', [data])
        con.commit() 
        print "salvo data"
        print data
        return redirect('/')
    else:
        print "Non ho dati da salvare!"
        print data
        return redirect('/')

@app.route('/', methods = ['GET'])
def print_prova():
    print "funziona!"
    return render_template('index.html')

if __name__ == '__main__':
  # TODO remove debbuger in production!
  app.run(debug=True)
