var solfege = require('solfegejs');

// Initialize the application
var application = new solfege.Application;

// Add bundle
var Clock = require('./bundles/term-clock/Clock');
application.addBundle(new Clock);

// Start the application
application.start();
