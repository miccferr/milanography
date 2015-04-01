#!/usr/bin/env python
# -*- coding: utf-8 -*-
import psycopg2
import sys
import json
from flask import Flask, request, redirect, render_template, Response
from flask.ext.sqlalchemy import SQLAlchemy
from psycopg2.extras import RealDictCursor


app = Flask(__name__)

db_conn = 'postgresql+psycopg2://YOUR-USERNAME:@localhost/YOUR-DATABASE'
app.config['SQLALCHEMY_DATABASE_URI'] = db_conn

con = psycopg2.connect(database='YOUR-DATABASE', user='YOUR-USERNAME')
cur = con.cursor(cursor_factory=RealDictCursor)

@app.route('/save_json', methods = ['POST'])
def save_json():    
    data = request.form['data']
    if data != '':
        cur.execute('INSERT INTO YOUR-DATABASE (YOUR-TABLE) VALUES (%s)', [data])
        con.commit() 
        print "saving data"
        print data
        return redirect('/')
    else:
        print "No data to save!"
        print data
        return redirect('/')

@app.route('/', methods = ['GET'])
def print_prova():
    print "It works!"
    return render_template('index.html')

# @app.route('/display_drawings', methods = ['GET'])
# def display():
#     print "Fetch drawings!"
#     cur.execute('SELECT * FROM YOUR-DATABASE')
    
#     drawings = json.dumps(cur.fetchall(), indent=2)
#     drawings = drawings
#     # print risultati
#     return render_template('index.html', drawings= json.dumps(cur.fetchall(), indent=2))

if __name__ == '__main__':
  # TODO remove debbuger in production!
  app.run(debug=True)

