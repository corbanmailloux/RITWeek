/*
 * Lots of *fun* stuff in here.
 *
 * (I should clean some of this up.)
 */

// Week number lookup.
// Date is the day after the last day of the week (I'm gonna change that soon...)
var weeks = [
    {date: new Date("Nov 01, 2015"), week: -1}, // Error code. Always set a lower bound
    {date: new Date("Nov 09, 2015"), week: 11},
    {date: new Date("Nov 15, 2015"), week: 12},
    {date: new Date("Nov 22, 2015"), week: 13},
    {date: new Date("Nov 29, 2015"), week: 14},
    {date: new Date("Dec 06, 2015"), week: 15},
    {date: new Date("Dec 13, 2015"), week: 16},
    {date: new Date("Dec 20, 2015"), week: 17}, // Finals week...
    {date: new Date("Dec 27, 2015"), week: 18} // Christmas week!
    // Upper error not necessary
];


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

// Checks if the given Date object is in the future.
function dateInTheFuture(date, nowDate)
{
    return (nowDate.getTime() < date.getTime());
}


// Test for storage first
if (!storageAvailable("localStorage")) {
    // Hide some stuff...
    document.getElementById("quote").style.display = "none";
    document.getElementById("youVisited").style.display = "none";
}

// Time for the real stuff...
var now = new Date();
var week = 0; // Initial value
var times = 1;
var name = "HowManyTimesHaveYouCheckedThisWeek";

for (var i = 0; i < weeks.length; i++) {
    if (dateInTheFuture(weeks[i].date, now))
    {
        week = weeks[i].week;

        if (localStorage[name] && localStorage["currentWeek"])
        {
            var oldWeek = parseInt(localStorage["currentWeek"], 10)
            // Only use the localStorage times if it's the same week
            if (oldWeek == week)
            {
                times = parseInt(localStorage[name], 10) + 1;
            }
        }

        localStorage[name] = times;
        localStorage["currentWeek"] = week;
        break;
    }
}

if (week > 0)
{
    if (week == 17)
    {
        // AHH! FINALS WEEK!
        document.getElementById("currently").innerHTML = "It is <strong>FINALS WEEK</strong>";
        document.title = "FINALS! - " + document.title;

        document.getElementById("timesVisited").innerHTML = times;
        document.getElementById("timesPlural").innerHTML = ((times == 1) ? "" : "s");
        document.getElementById("quote").innerHTML = "Good luck on your finals!";
    }
    else if (week == 18)
    {
        // Christmas!
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
    else
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
else
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
