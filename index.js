/* ============================================
; Title: Assignment 4.2-9.2 - Pets-R-Us - index.js
; Author: Ace Baugh
; Start Date: 08/29/2022
; Description: WEB 340 Launching page for all subsequent
; 				pages for Pets-R-Us website. Routes are available
; 				for the home page and others as we make them.
============================================ */

// Require statements for express, http, and path
const express = require('express');
const path = require('path');
const Routes = require('./routes');
const mongoose = require('mongoose');
const fs = require('fs');

const Customer = require('./models/customer');
const Appointment = require('./models/appointment');

// Create the express application
const app = express();

// Port to listen on
const PORT = process.env.PORT || 3000;
// Mongoose connection string
const CONN = `mongodb+srv://acieffe:monbijou13@buwebdev-cluster-1.9wmv0d7.mongodb.net/pets-r-usDB`;

// Connect to the database
mongoose
	.connect(CONN)
	.then(() => {
		console.log('Database connection successful');
	})
	.catch((err) => {
		console.log('Database connection error: ' + err.message);
	});

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
app.use(express.urlencoded({ extended: true })); // added during week 6 assignment
app.use(express.json()); // added during week 6 assignment

// Loops through the routes object and creates a route for each
// then renders the page
for (let [url, page] of Object.entries(Routes.Routes)) {
	app.get(url, (req, res) => {
		res.render(page, {
			// Passes the title and company name to the page
			title: `${title} | ${page[0].toUpperCase() + page.slice(1)}`,
			companyName: companyName,
			page: page,
		});
	});
}

// Post customer form data to database
app.post('/customers', (req, res, next) => {
	// console.log the sent data
	console.log(req.body);
	console.log(req.body.customerID);
	console.log(req.body.email);

	// Create a new customer object
	const newCustomer = new Customer({
		customerID: req.body.customerID,
		email: req.body.email,
	});

	console.log(newCustomer);

	// Save the new customer to the database
	Customer.create(newCustomer, (err, customer) => {
		// If there is an error, log it
		if (err) {
			console.log(err);
			next(err);
			// If there is no error, log the customer and redirect to the home page
		} else {
			console.log(`New Customer: ${customer} has been added to the database`);
			res.render('index', {
				title: `${title} | Index`,
				companyName: companyName,
				page: 'index',
			});
		}
	});
});

// get the customer list
app.get('/customers', (req, res, next) => {
	Customer.find({}, (err, customers) => {
		if (err) {
			console.log(err);
			next(err);
		} else {
			// send the customer list to the customers page
			res.render('customers', {
				title: `${title} | Customer List`,
				companyName: companyName,
				page: 'customers',
				customers: customers,
			});
		}
	});
});

// post form input into mongoose database
app.post('/booking', (req, res, next) => {
	console.log(req.body);
	console.log(req.body.firstName);
	console.log(req.body.lastName);
	console.log(req.body.email);
	console.log(req.body.services);

	// Create a new appointment object
	const newAppointment = new Appointment({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		services: req.body.services,
	});

	console.log(newAppointment);

	// Save the new appointment to the database
	Appointment.create(newAppointment, (err, appointment) => {
		// If there is an error, log it
		if (err) {
			console.log(err);
			next(err);
			// If there is no error, log the appointment and redirect to the home page
		} else {
			console.log(`New Appointment: ${appointment} has been added to the database`);
			res.render('index', {
				title: `${title} | Index`,
				companyName: companyName,
				page: 'index',
			});
		}
	});
});

// get the services list and add it to booking page
app.get('/booking', (req, res) => {
	let jsonFile = fs.readFileSync('./public/data/services.json');
	let services = JSON.parse(jsonFile);

	console.log(services);

	res.render('booking', {
		title: `${title} | Services`,
		companyName: companyName,
		page: 'services',
		services: services,
	});
});

// get the appointment list ** FOR NOW **
app.get('/appointments', (req, res, next) => {
	Appointment.find({}, (err, appointments) => {
		if (err) {
			console.log(err);
			next(err);
		} else {
			// send the appointments list to the appointments page
			res.render('appointments', {
				title: `${title} | My Appointments`,
				companyName: companyName,
				page: 'appointments',
				appointments: appointments,
			});
		}
	});
});

// If page is not found, render the 404 page
app.use((req, res) => {
	res.status(404).render('404', {
		title: `${title} | 404 - Page Not Found!`,
		companyName: companyName,
		page: '404',
	});
});

// Show active port in console
app.listen(PORT, () => {
	console.log(`Server listening on port ${PORT}`);
});
