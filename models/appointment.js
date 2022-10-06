/* ============================================
; Title: Assignment 4.2-9.2 - Pets-R-Us - appointments.js
; Author: Ace Baugh
; Start Date: 08/29/2022
; Description: WEB 340 Appointments model for Pets-R-Us website.
============================================ */

const mongoose = require('mongoose');
// Call the mongoose schema function
const Schema = mongoose.Schema;

// Create the appointment schema
let appointmentSchema = new Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	services: { type: String, required: true },
});

module.exports = mongoose.model('Appointment', appointmentSchema);
