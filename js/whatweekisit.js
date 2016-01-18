/*
 * Lots of *fun* stuff in here.
 */

// Check for localStorage
function storageAvailable(type) {
  try {
    var storage = window[type],
      x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  }
  catch(e) {
    return false;
  }
}

// Get the current week number, or -1 if error.
function getWeek() {
    nowMoment = moment();
    for (var i = 0; i < weeks.length; i++) {
        var beginning = weeks[i].beginning;
        var end = weeks[i].end;
        //Note: isBetween() is exclusive. This could be done with less || statements,
        //but I left the isBetween() call in case it is one day inclusive. -VB 1/15/16
        var withinWeek = nowMoment.isBetween(beginning, end, "day");
        withinWeek = withinWeek || nowMoment.isSame(beginning, "day");
        if (withinWeek) {
            return weeks[i].week;
        }
    }
    return -1; // Error
}

// Gets and update the counter in localStorage.
// Returns the count.
function updateLocalStorageAndGetTimes(week)
{
    var times = 1; // Initial

    // Update localStorage
    if (localStorage["HowManyTimesHaveYouCheckedThisWeek"] && localStorage["currentWeek"])
    {
        var oldWeek = parseInt(localStorage["currentWeek"], 10)
        // Only use the localStorage times if it's the same week
        if (oldWeek == week)
        {
            times = parseInt(localStorage["HowManyTimesHaveYouCheckedThisWeek"], 10) + 1;
        }
    }

    localStorage["HowManyTimesHaveYouCheckedThisWeek"] = times;
    localStorage["currentWeek"] = week;

    return times;
}


// Test for storage first
if (!storageAvailable("localStorage")) {
    // Hide some stuff...
    document.getElementById("quote").style.display = "none";
    document.getElementById("youVisited").style.display = "none";
}

// Time for the real stuff...

// Set up the dates
var fallStartDate = moment("2015-08-24");
var interTigerStartDate = moment("2016-01-04"); // Intersession TigerTerm
var springStartDate = moment("2016-01-25");
var springBreakMonday = moment("2016-03-21");
var summerTigerStartDate = moment("2016-05-31"); // Summer TigerTerm (10-week)

// Build weeks
var weeks = [];

// Fall, including finals and Christmas.
for (var i = 1; i <= 18; i++) {
    weeks.push({
        beginning: moment(fallStartDate).add((i-1), "weeks"),
        end: moment(fallStartDate).add(i, "weeks"),
        week: i
    });
}

// Intersession TigerTerm
for (var i = 1; i <= 3; i++) {
    weeks.push({
        beginning: moment(interTigerStartDate).add((i-1), "weeks"),
        end: moment(interTigerStartDate).add(i, "weeks"),
        week: i
    });
}

// Spring, dealing with Spring Break.
var springWeekNum = 1;
for (var i = 1; i <= 17; i++) {
    var begin = moment(springStartDate).add((i-1), "weeks");
    if (begin.isSame(springBreakMonday, "day")) // Check for Spring Break
    {
        weeks.push({
            beginning: begin,
            end: moment(springStartDate).add(i, "weeks"),
            week: 19 // Spring Break special code
        });
    }
    else // Normal week
    {
        weeks.push({
            beginning: begin,
            end: moment(springStartDate).add(i, "weeks"),
            week: springWeekNum
        });
        springWeekNum++;
    }
}

// Summer TigerTerm (10-week)
for (var i = 1; i <= 10; i++) {
    weeks.push({
        beginning: moment(summerTigerStartDate).add((i-1), "weeks"),
        end: moment(summerTigerStartDate).add(i, "weeks"),
        week: i
    });
}
weeks.push({
    beginning: moment(summerTigerStartDate).add((10), "weeks"),
    end: moment(summerTigerStartDate).add(11, "weeks"),
    week: 17 // Finals week code
});

var week = getWeek();
var times = updateLocalStorageAndGetTimes(week);

if (week > 0) // Valid week
{
    /* SPECIAL WEEKS
     *  17 - Finals Week
     *  18 - Christmas
     *  19 - Spring Break
     */
    if (week == 17) // Finals week
    {
        // AHH! FINALS WEEK!
        document.getElementById("currently").innerHTML = "It is <strong>FINALS WEEK</strong>";
        document.title = "FINALS! - " + document.title;

        document.getElementById("timesVisited").innerHTML = times;
        document.getElementById("timesPlural").innerHTML = ((times == 1) ? "" : "s");
        document.getElementById("quote").innerHTML = "Good luck on your finals!";
    }
    else if (week == 18) // Christmas
    {
        // This should not be done this way, but it's Christmas and I'm lazy.
        document.getElementById("currently").innerHTML = '' +
            'It is <strong><span class="text-christmas">' +
                '<span>C</span>' +
                '<span>H</span>' +
                '<span>R</span>' +
                '<span>I</span>' +
                '<span>S</span>' +
                '<span>T</span>' +
                '<span>M</span>' +
                '<span>A</span>' +
                '<span>S</span>' +
            '</span></strong>'
        ;

        $("body").addClass("christmas");
        document.title = "Christmas! - " + document.title;

        document.getElementById("timesVisited").innerHTML = times;
        document.getElementById("timesPlural").innerHTML = ((times == 1) ? "" : "s");
        document.getElementById("quote").innerHTML = "Have yourself a merry little Christmas!";
    }
    else if (week == 19) // Spring Break
    {
        document.getElementById("currently").innerHTML = "It is <strong>SPRING BREAK</strong>";
        document.title = "Spring Break - " + document.title;

        document.getElementById("timesVisited").innerHTML = times;
        document.getElementById("timesPlural").innerHTML = ((times == 1) ? "" : "s");
        document.getElementById("quote").innerHTML = "Go have fun!";
    }
    else // Normal weeks
    {
        // OOH! I KNOW WHAT WEEK IT IS! YAY! I'M HELPFUL!
        document.getElementById("weekNum").innerHTML = week;
        document.title = "Week " + week + " - " + document.title;

        var quote = "";

        if (times <= 5)
        {
            quote = "What are you, new?";
        }
        else if (times <= 10)
        {
            quote = "Having some memory issues?";
        }
        else if (times <= 15)
        {
            quote = "This is getting silly.";
        }
        else if (times <= 20)
        {
            quote = "You must have a project due this week. Good luck!";
        }
        else if (times <= 25)
        {
            quote = "Quit procrastinating!";
        }
        else if (times <= 30)
        {
            quote = "Get a memory test, tiger.";
        }
        else // 30+
        {
            quote = "Stop spamming me.";
        }

        document.getElementById("timesVisited").innerHTML = times;
        document.getElementById("timesPlural").innerHTML = ((times == 1) ? "" : "s");
        document.getElementById("quote").innerHTML = quote;
    }
}
else // Error
{
    // BOO! I don't know what week it is. I suck. Sorry 'bout that.
    document.getElementById("currently").innerHTML = "I don't know what week it is";
    document.getElementById("broken").style.display = "block";
    // Hide some stuff...
    document.getElementById("quote").style.display = "none";
    document.getElementById("youVisited").style.display = "none";

    // Remove the storage values
    localStorage.removeItem(name);
    localStorage.removeItem("currentWeek");
}

// Most important piece of code, courtesy of Maggie Russ:
/*
function maggie (pineapple) {
    var m = "jellybeans";
    if (m == 3) {
        var pancakes = "naranja";
        var sprinkle = 2 < (1 - 8);
        var bicycle = sprinkle;
        sprinkle = pineapple + pancakes;
    }
    return ("Joules");
} // badumshpuh
*/


// For Adam -VB
/*
    function areThereItaliansInCanada(){
        return false;
    }
*/
