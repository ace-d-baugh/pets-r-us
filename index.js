/* ============================================
; Title: Assignment 4.2-9.2 - Pets-R-Us - index.js
; Author: Ace Baugh
; Start Date: 08/29/2022
; Description: WEB 340 Launching page for all subsequent
; 				pages for Pets-R-Us website. Routes are available
; 				for the home page and others as we make them.
============================================ */

// Require statements for express, http, and path
const { Console } = require('console');
const express = require('express');
const path = require('path');
const Routes = require('./routes');

// Create the express application
const app = express();

// constants for the website to be passed in
const title = `Pets-&#7449;-Us`;
const companyName = `<div class="company-name">Pets-<div class="reverse">R</div>-Us</div>`;

// Use ejs to render the html pages
app.engine('html', require('ejs').__express);

// Set the view engine to html and redirect to the views folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// Use the public folder for static assets
app.use(express.static(path.join(__dirname, 'public')));

// Port to listen on
const PORT = process.env.PORT || 3000;

// Loops through the routes object and creates a route for each
// then renders the page
for(let [url, page] of Object.entries(Routes.Routes)) {
   app.get(url, (req, res) => {
      res.render(page, {
			// Passes the title and company name to the page
			title: `${title} | ${page[0].toUpperCase() + page.slice(1)}`,
			companyName: companyName,
		});
   });
};

// If page is not found, render the 404 page
app.use((req, res) => {
   res.status(404).render('404', {
		title: `${title} | 404 - Page Not Found!`,
		companyName: companyName,
	});
});

// Show active port in console
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
