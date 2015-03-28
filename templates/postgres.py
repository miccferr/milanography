#!/usr/bin/env python
# -*- coding: utf-8 -*-

# SQL command to create a table 
# CREATE TABLE shapes (id integer, data json);

import psycopg2
import sys
import json
from flask import Flask, request, redirect, render_template, Response
from flask.ext.sqlalchemy import SQLAlchemy
from psycopg2.extras import RealDictCursor


app = Flask(__name__)

db_conn = 'postgresql+psycopg2://mic:@localhost/test'
app.config['SQLALCHEMY_DATABASE_URI'] = db_conn

con = psycopg2.connect(database='test', user='mic') 
# cur = con.cursor()
cur = con.cursor(cursor_factory=RealDictCursor)

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

@app.route('/display_drawings', methods = ['GET'])
def display():
    print "Recupero disegni!"
    cur.execute('SELECT * FROM shapes')
    
    cicci = json.dumps(cur.fetchall(), indent=2)
    # return Response(json.dumps(motifs), mimetype='application/json')
    # return Response(json.dumps(cur.fetchall(), indent=2), mimetype='application/json')

    # print cicci
    ciccio = 'sadasdas'
    ciccio = cicci
    # print risultati
    return render_template('index.html', cicci= json.dumps(cur.fetchall(), indent=2))

if __name__ == '__main__':
  # TODO remove debbuger in production!
  app.run(debug=True)

