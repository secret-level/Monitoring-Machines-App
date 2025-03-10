This is a simple Express/React app that was a prototype for uptime tracking of machines in a manufacturing factory.
It's made of a couple of different elements which fetch the data from the database and display it in table format.

## The login system
The app checks the database for the submitted username, fetches the salt, calculates the hash based on the salt and the submitted password and ultimately authorizes the login.

## Machines: Fetches the data for a single machine
The app checks the database for existing machines and displays a button for each one. Clicking on a button fetches and displays the data for that machine.

## Autoreport: Fetches all the data from the past 24h
The app checks the database for existing machines, then runs a query that limits the results from 6 am yesterday to 6 am today and displays the results of the query.
Once a day it runs a cronjob that automatically compiles the query via .ejs to a .pdf file and sends it per email.

## User Settings
A work in progress. At the moment it does nothing except fetch and display the username and the user email.
        
## Logout: logs out the user
It redirects the user to the login page and destroys the session.
