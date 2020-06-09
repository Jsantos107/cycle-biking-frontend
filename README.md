# cycle-biking-frontend
## General info
Cycle biking is a single page application that allows users to 
view and submit posts if seeking to help other cyclists and stay organized with a checklist. Users can also create a user account, which enables them to
log in,
create a bike route and explore the world.

## Intro Video
![](CycleBikingapp.gif)
## Technologies
* JavaScript
* Ruby on Rails - version 5.2.3
* SQLite - version 3.24.0
* Google maps API
* Dark Sky API

## Setup
To run this project, install it locally by cloning the GitHub repository.

From inside the project directory:
```
cd cycle-biking-backend
bundle install
rails db:{create,migrate,seed}
rails s
```
Open your browser (preferably Chrome) and go to http://localhost:3000.
In order to ensure rails is connected
Then (back in terminal):
```
cd ..
cd cycle-biking-frontend
lite-server
```

## Features
* Create a checklist for a biking trip 
* View current weather & forecast
* Create/login a user account
* View bike routes for a bike trip
* Create a new post
* Edit a post
* Delete a post

## *Note*
You will need to go to 
 https://cloud.google.com/maps-platform/maps
 for a google maps API key as well as
 https://darksky.net/
 for a weather API key.