#!/usr/bin/env python
# -*- coding: utf-8 -*-
# import os
# import sys
# import psycopg2
# from flask import Flask
# from flask import g
# from flask import request, redirect
# from flask import render_template
# from flask.ext.sqlalchemy import SQLAlchemy
# import json
# # import sqlite3



# db_conn = 'postgresql+psycopg2://databaseuser:P@ssw0rd@localhost/the_database'
db_conn = 'postgresql+psycopg2://mic:@localhost/milanography'
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = db_conn
db = SQLAlchemy(app)

@app.before_request
def before_request():
    # print SQLAlchemy(app)
    # db = SQLAlchemy(app)

# @app.teardown_request
# def teardown_request(exception):
#     if hasattr(db, 'db'):
#         db.close()

# @app.route('/save_json', methods = ['POST'])
# def save_json():
#     data = request.form['data']
#     db.execute("INSERT INTO shapes VALUES (?)", [data])
#     db.commit()
#     print "salvo data"
#     print data
#     return redirect('/')

# @app.route('/', methods = ['GET'])
# def print_prova():
#     print "funziona!"
#     return render_template('index.html')

# if __name__ == '__main__':
#   app.run(debug=True)


# SQL command to create table
CREATE TABLE shapes (id integer, data json);

# script funzionante
import psycopg2
import sys


con = None

try:
     
    con = psycopg2.connect(database='milanography', user='mic') 
    cur = con.cursor()
    cur.execute('SELECT version(); ')          
    ver = cur.fetchone()
    print ver    
    

except psycopg2.DatabaseError, e:
    print 'Error %s' % e    
    sys.exit(1)
    
    
finally:
    
    if con:
        con.close()