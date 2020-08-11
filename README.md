# Opioid Medication Assisted Therapy Decision Aid
This project is an interactive decision aid to help patients pick a medication assisted therapy for opioid abuse. The interactive decision aid is editable by providers, to allow the content of the decision aid to be appropriately tailored to a community.

[Docker,](https://www.docker.com/) [Angular,](https://angular.io/) and [Django](https://www.djangoproject.com/) are the software packages used to create this application. Deployment is managed by TravisCI, and all changes to this repository are automatically deployed at https://opioid-mat.nickreid.com. The application is hosted on Google Cloud, and deployment details are below.

## Quick Start
[Install and setup git,](https://help.github.com/en/github/getting-started-with-github/set-up-git) then install docker and docker-compose [(Mac)](https://hub.docker.com/editions/community/docker-ce-desktop-mac) [(Win)](https://hub.docker.com/editions/community/docker-ce-desktop-windows).

Then, in the directory you want to work in, run the following commands:

```
# Clone this repository
$ git clone git@github.com:nickdotreid/opioid-mat-decision-aid.git
$ cd opioid-mat-decision-aid

# Creates and updates server database
$ docker-compose run server python manage.py migrate
# Loads test data into the database using Django fixture
$ docker-compose run server python manage.py loaddata test

$ docker-compose up
# Running docker-compose up will build and start the entire application
# Starting the application will take some time the first time because base images need to be downloaded. 
# When complete, the decision aid is running at http://localhost:4200
```

Detailed instructions and docker-voodoo about running and testing the application are covered below.

## Application Overview

This dockerized application has 4 services:
	* A client application, written in Angular (version 6). This application compiles HTML, CSS, and Javascript files used to create the interactive decision aid.
	* The server application is written in Django, and is responsible for retriving and storing the data used and created by the client application.
	* The database used is PostGres.
	* Lastly, a nginx component is also included, which directs requests in a production environment.

The application configuration is available in docker-compose.yaml -- which is a great place to see how individual services are run. docker-compose.gcloud.yaml contains configuration to the production configuration in your local environment 

## Client Application
The client application is written in Angular because its a component based framework with structure that is well documented by the Angular team.

The root of the application is [client/src/app/app.component.ts](client/src/app/app.component.ts).

The CSS stylesheet used in the application is [client/src/styles.scss](client/src/styles.scss).

Here are some docker-compose commands that are useful when working with the client
```
# How to install a new npm module
$ docker-compose run client npm install PACKAGE_NAME_HERE --save

# How to enter client command line, and turn on interactive development mode
$ docker-compose run --service-ports client bash
> npm run dev

```

## Server Applicaiton
The server application is written in Django and implements a REST Api that is consumed by the client application.

Here are some docker-compose commands that are useful when working with the Django server
```
# Create a database migration
$ docker-compose run server python manage.py makemigrations

# Update the database with created migrations
$ docker-compose run server python manage.py migrate

# Run unit test to ensure you didn't brake something
$ docker-compose run server python manage.py test

# Destroy the database when *something* brakes
$ docker-compose run server python manage.py flush
# This command removes the docker volume that stores the database
# which should be used when something is really, REALLY broken
$ docker volume rm opioid-mat-decision-aid_pg-data

# Create a new app in Django
$ docker-compose run server python manage.py startapp YOUR_APP_NAME

# Add new python library via pip, note that the second command saves the new package
$ docker-compose run server pip install PACKAGE_NAME_HERE
$ docker-compose run server pip freeze > requirements.txt

# Enter command line, then run development server so you can access it at http://localhost:8080
$ docker-compose run --service-ports server bash
> honcho start dev

```

**Deployment**
This application is currently deployed in Heroku, and creates a single docker image [using this Dockerfile.](Dockerfile). The file is set up to generate a static Angular application and run the Django server behind an nginx proxy. Nginx is responsible for serving all static files, and is [configured with this nginx.conf.](nginx.conf)
