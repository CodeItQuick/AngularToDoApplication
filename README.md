# Angular To-Do Application

To-Do Application that can do standard tasks, such as:
* Load a default list of To-Do's 
* Create a new To-Do 
* Edit a To-Do 
* Delete a To-Do

This website was to show my ability to work with:
* Angular/Typescript
* RxJs
* Moleculer Backend
* Material UI/UX
* Nginx

There is an nginx.conf file. Install this in your nginx configuration to run the main site on /site/ and
the api on /api/.

I've created a docker-compose that will run the project on 'docker-compose up'. It is also 
necessary to copy the nginx.conf file into another nginx conf folder, and running nginx. The version of nginx
I used was 1.21.6.
