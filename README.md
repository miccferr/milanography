Milanography
============

# What
Shameless adaptation of the great [Bostonography](http://bostonography.com/neighborhoods/) project to *la cità la pusee bèla ad mùnd* (A.K.A. Milan).  

# When
Soon.  
~~But let's try first to start with a simpler site like [this](http://www.cityplanner.it/experiment_host/php/ol3_draw_save/draw-feature_mod1.php).~~  
Update! Completed porting from PJ's website.  
Next goal:    

- ~~Flask + SQLite~~
- ~~Set default brushes panel to exactly one polygon per category (every neighborhood is a catergory).~~
- ~~Set default polygon brush tool to draw just one and only one shape for each neighborhood.~~  
- ~~Allow drawn shape to be modified.~~
- ~~Flask + Postgres (via SQLAlchemy) ,es [1](http://blog.y3xz.com/blog/2012/08/16/flask-and-postgresql-on-heroku), [2](https://www.youtube.com/watch?v=FD0p-opdyoE) **NEW:** take a look at [this](https://stackoverflow.com/questions/9901082/what-is-this-javascript-require) script.~~ 
- Error Handling.
- HTML clean-up: Form section needs to be fixed.
- Optional: add a input GET button to retrieve the already drawn shapes, es [1](https://stackoverflow.com/questions/19794695/flask-python-buttons), [2](https://stackoverflow.com/questions/19796253/flask-python-buttons-not-responding).
- Front-End ()Nice Layout/Colours Palette/UI-UX etc etc..).


# Why
Why not?

# How
Probably ~~GeoDjango~~ Flask + Postgres and some Leaflet wizardy.

***
***
***

## Notes to Self:

###Python & Flask & venvs
- Instal python virtual environment  (just once)
- Activate it 

		source venv/bin/activate

- Installed packages Flask + Psycopg2

		pip install Flask
		pip install psycopg2
		pip install Flask-SQLAlchemy

- Run Flask on pyscript

		python app.py
		
- Once done, deactivate it
	
		deactivate

- **the latest dev brach is flask-postgres-dev**

### General app development
There are currently two dev. versions of the app, supporting respectively Sqlite and Postgres. The final goal is to have a production version running on Postgres.
#### SQLite version:
Create SQLlite Db. The data is stored simply as text, as suggested [here](http://stackoverflow.com/a/16603687/4118711):

	CREATE TABLE shapes(col-one smallint, col-two varchar(10));
	
Run app.py script:

	python app.py

To query via terminal the Db:
	
	sqlite3 <name-table>

Useful commands:

	.tables (outputs the list of table currently present)
	.help



#### PostgreSQL version:
Create PostgreSQL Db. The data is stored as JSON data type:

	CREATE TABLE shapes (id integer, data json);
	
Run postgres.py script:

	python postgres.py