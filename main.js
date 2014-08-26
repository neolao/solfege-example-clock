var solfege = require('solfegejs');

// Initialize the application
var application = new solfege.kernel.Application(__dirname);

// Add the internal bundle
var Clock = require('./bundles/term-clock/Clock');
application.addBundle('clock', new Clock);

// Start the application
application.start();
