Milanography
============

**WHAT:**  

Milanography is a partecipative mapping project focused on Milan's neighborhoods.  

It aims to make visible the "shared" image of the city, as perceived by its inhabitants, by mapping the closest spatial unit to their daily life. Which is precisely the neighborhood.

It's basically a shameless adaptation of the great [Bostonography](http://bostonography.com/neighborhoods/) project to *la cità la pusee bèla ad mùnd* (A.K.A. Milan), but has also been  inspired by [Areas of Edinburgh](http://saintamh.org/maps/areas-of-edinburgh/) and [The Neighborhood Project.](https:%20//hood.theory%20.org%20/)  

Here's a [Live version](104.167.110.117)  

**WHY:**  

I liked all those experiences and wanted to replicate them in milan, but I missed the tools. Hence I decided to build it myslef.  
This time though, entirely onto an **open-stack**:  *Postgres / PostGIS + Flask + LeafletJS*  

**HOW:**  
Milanography allows the user to draw a shape representing a neighborhood, from a list of suggest places. The user can then save and submit such shape, which is consequently saved on a Postgres instance via Flask.

Everyone is warmly encouraged to contribute to and to improve the project!

**Disclaimer!**  
This is my first project with Python Flask, hence it's a truly *crude* application. Fork it and make it better!

##Update:
Of course the minute I finished this project I discovered somebody else did the same -but better! :)  
Props to [@nichom](https://twitter.com/nichom) for his amazing piece of code: [neighborhoods](https://github.com/enam/neighborhoods)  
I'm in love with it!

Nonetheless, if you want to have the complete control of your infrastructure and run your own instances, this is still a good, yet basic, starting point to develop your own draw-collecting app.

---

## Dependencies:

I assume you have the following tools in your system:

- [Python](https://www.python.org/) (v. 2.7)
- [PostgreSQL](http://postgresapp.com/) (latest) If you are running on an Apple machine you might want to check out [PostgresApp](http://postgresapp.com/)


### Front-end 
Common front-end dependencies are managed through [Bower](http://bower.io/)  
Run on ```bower.json```

	bower install 
Other dependencies are:

- [Leaflet.Draw](https://github.com/Leaflet/Leaflet.draw/)
- [FileSaver.js](https://github.com/eligrey/FileSaver.js/)

### Python
- Python  dependencies are contained within a [virtualenv](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

- Activate it 

		source env/bin/activate

- Install (via [pip](https://pypi.python.org/pypi/pip)) Flask + Psycopg2 + SQLAlchemy

		pip install Flask
		pip install psycopg2
		pip install Flask-SQLAlchemy

- Run Flask 

		python app.py
		
- Once done, deactivate the virtualenv
	
		deactivate

## Usage:

Download or ```git clone``` the repo.

Then ```cd dist``` if you want to use a raw, unstylized version of the app.
Otherwise you can ```cd examples/milan``` to use a simple theme.

#### PostgreSQL set-up:
Create PostgreSQL Db. The data is stored as JSON data type, es:  

	CREATE TABLE shapes (id integer, data json);

#### Activate virtualenv: 

	source env/bin/activate

#### Run Flask: 
Run postgres.py script:

	python app.py
	
#### Profit:
See the result (localhost) [127.0.0.1:5000](127.0.0.1:5000/)

## Deploy:
So far I've only tested the app on a virtual server running Ubuntu server (v. 14.0) and a combination of Gunicorn + NGINX, but flask it's a pretty versitile framework. 

