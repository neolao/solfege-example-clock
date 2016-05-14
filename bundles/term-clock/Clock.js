const solfege = require("solfegejs");
const GeneratorUtil = require("solfegejs/lib/utils/GeneratorUtil");

/**
 * The class that display a clock
 */
let Clock = function()
{
};
let proto = Clock.prototype;

/**
 * Character map
 *
 * @constant    {Map} solfege.example.termClock.Clock.CHARACTERS
 */
let characters = new Map();
Clock.CHARACTERS = characters;
characters.set('0', ['███',
                     '█ █',
                     '█ █',
                     '█ █',
                     '███']);
characters.set('1', ['██ ',
                     ' █ ',
                     ' █ ',
                     ' █ ',
                     '███']);
characters.set('2', ['███',
                     '  █',
                     '███',
                     '█  ',
                     '███']);
characters.set('3', ['███',
                     '  █',
                     ' ██',
                     '  █',
                     '███']);
characters.set('4', ['█ █',
                     '█ █',
                     '███',
                     '  █',
                     '  █']);
characters.set('5', ['███',
                     '█  ',
                     '███',
                     '  █',
                     '███']);
characters.set('6', ['███',
                     '█  ',
                     '███',
                     '█ █',
                     '███']);
characters.set('7', ['███',
                     '  █',
                     '  █',
                     '  █',
                     '  █']);
characters.set('8', ['███',
                     '█ █',
                     '███',
                     '█ █',
                     '███']);
characters.set('9', ['███',
                     '█ █',
                     '███',
                     '  █',
                     '███']);
characters.set(':', ['   ',
                     ' █ ',
                     '   ',
                     ' █ ',
                     '   ']);


/**
 * The application instance
 *
 * @private
 * @member  {solfege.kernel.Application} solfege.example.termClock.Clock.prototype.application
 */
proto.application;

/**
 * The "charm" instance
 *
 * @private
 * @member  {*} solfege.example.termClock.Clock.prototype.charm
 */
proto.charm;

/**
 * The timer
 *
 * @private
 * @member  {Number} solfege.example.termClock.Clock.prototype.timer
 */
proto.timer;


/**
 * Set the application
 *
 * @param   {solfege.kernel.Application} application - Application instance
 */
proto.initialize = function*(application)
{
    this.application = application;

    // Set listeners
    this.application.on(solfege.Application.EVENT_START, GeneratorUtil.bindGenerator(this, this.onApplicationStart));
    this.application.on(solfege.Application.EVENT_END, GeneratorUtil.bindGenerator(this, this.onApplicationEnd));
};


/**
 * Executed when the application starts
 */
proto.onApplicationStart = function*()
{
    // Initialize "charm"
    this.charm = require('charm')();
    this.charm.pipe(process.stdout);
    this.charm.cursor(false);

    // Refresh the time display every second
    this.timer = setInterval(this.displayTime.bind(this), 1000);
};

/**
 * Executed when the application ends
 */
proto.onApplicationEnd = function*()
{
    // Destroy "charm"
    this.charm.cursor(true);
    this.charm.end();

    // Clear the timer
    clearInterval(this.timer);
};


/**
 * Display the time
 *
 * @private
 */
proto.displayTime = function()
{
    var currentDate = new Date();
    var currentHours = currentDate.getHours().toString();
    var currentMinutes = currentDate.getMinutes().toString();
    var currentSeconds = currentDate.getSeconds().toString();

    this.charm.reset();

    // Dipslay the hours
    if (currentHours < 10) {
        currentHours = "0" + currentHours;
    }
    this.displayCharacter(currentHours[0], 1, 1);
    this.displayCharacter(currentHours[1], 5, 1);

    // Display a separator
    this.displayCharacter(':', 9, 1);

    // Dipslay the minutes
    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
    }
    this.displayCharacter(currentMinutes[0], 13, 1);
    this.displayCharacter(currentMinutes[1], 17, 1);

    // Display a separator
    this.displayCharacter(':', 21, 1);

    // Dipslay the seconds
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    }
    this.displayCharacter(currentSeconds[0], 25, 1);
    this.displayCharacter(currentSeconds[1], 29, 1);
};

/**
 * Display a character at a position
 *
 * @private
 */
proto.displayCharacter = function(character, x, y)
{
    var rows = Clock.CHARACTERS.get(character);

    // If the rows does not exist, than display simply the character
    if (!rows) {
        this.charm.position(x, y);
        this.charm.write(character);
        return;
    }

    // Display the rows
    for (var index = 0, total = rows.length; index < total; ++index) {
        this.charm.position(x, y + index);
        this.charm.write(rows[index]);
    }
};

module.exports = Clock;
