# UQ-Pool #
A carpooling app for UQ students

## Enviroment Setup ##
You can google how to install these for your OS.  
  
Node v14.17.4 (best to use NVM to manage node version)  
Yarn  
If you haven't used react before, I highly recommend you watchn the first half of this https://www.youtube.com/watch?v=0-S5a0eXPoc+ 

Once you have the correct version of node running, run ```yarn install``` to install the package dependanices.

### Google API Key ###
To use the google map API's, and the autocomplete, you must have your API
key installed. This key should stay private.

1. Log in at https://console.cloud.google.com/.
2. Using the 'Select a project' button in the header, create a new project.
3. On the sidebar, navigate to 'APIs & Services>Dashboard'. 
4. You may need to select the project you created. 
5. On the dashboard, at the top, select 'Enable APIs and Services'
6. From this API Library page, you can enable all the nessecary APIs you need.
7. Go to the 'Credentials' page through sidebar and create an API Key. 
8. Go the the file '.env' in the root folder and paste the following ```GOOGLE_MAPS_API_KEY={Your API Key}```.
9. You will need to setup billing on your account for this to work.

Nathan currently has Directions, Places and Distance Matrix APIs enabled. 

## How to run ##
Ensure you have gone through the steps in enviroment setup. 

cd into the UQ-Pool directory and run ```yarn start``` from your terminal and scan the QR code on your phone.

## Adding dependancies ###
When you use a package, ensure that it getts added to the package.json file by running ```yarn add [package-name]```. This is done in place of ```npm install``` as well. 

### Versions ###
1. Node v14.17.4 (LTS)
2. Tested on Android 11.0x86 Pixel 4

## login form

3 important files (in ./components):
1. Login.js: contains regular expression validators to tick off all input fields are correct
2. Input.js: the single/multi pattern validation input component
3. ./slices/user.js: the persistent user information component (to be written)

The Login.js is a constructor that handles form submission for registration, and holds validators for sid (8 numbers), first and last names (at least one char), email (valid uq domain) and phone (04xxxxxxxx format). On submit, this will send a post request to the server and finalise the login and store the information into the slice if all goes well.

