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
- ~~Allow drawn shape to be modified.~~- 
- Flask + Postgres (via SQLAlchemy) ,es [1](http://blog.y3xz.com/blog/2012/08/16/flask-and-postgresql-on-heroku), [2](https://www.youtube.com/watch?v=FD0p-opdyoE) **NEW:** take a look at [this](https://stackoverflow.com/questions/9901082/what-is-this-javascript-require) script.
- Nice Layout/Colours Palette/UI-UX etc etc..


# Why
Why not?

# How
Probably ~~GeoDjango~~ Flask + Postgres and some Leaflet wizardy.

***
***
***

## Self-notes:

###Python & Flask & venvs
- Installed python virtual environment  
- Activate it 

		source venv/bin/activate

- Installed packages Flask + Psycopg2

		pip install Flask
		pip install psycopg2

- Run Flask on pyscript

		python app.py
		
- Once done, deactivate it
	
		deactivate





