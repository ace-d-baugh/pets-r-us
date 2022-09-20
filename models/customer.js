/* ============================================
; Title: Assignment 4.2-9.2 - Pets-R-Us - customer.js
; Author: Ace Baugh
; Start Date: 08/29/2022
; Description: WEB 340 Customer model for Pets-R-Us website.
============================================ */

const mongoose = require('mongoose');
// Call the mongoose schema function
const Schema = mongoose.Schema;

// Create the customer schema
let customerSchema = new Schema({
	customerID: { type: String, required: true, unique: true },
	email: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Customer', customerSchema);
