/*
 * Lots of *fun* stuff in here.
 * 
 * (I should clean some of this up.)
 */

// Week number lookup.
// Date is the day after the last day of the week (I'm gonna change that soon)
var weeks = [
    {date: new Date("Nov 01, 2015"), week: -1}, // Error code. Always set a lower bound
    {date: new Date("Nov 09, 2015"), week: 11},
    {date: new Date("Nov 15, 2015"), week: 12},
    {date: new Date("Nov 22, 2015"), week: 13},
    {date: new Date("Nov 29, 2015"), week: 14},
    {date: new Date("Dec 06, 2015"), week: 15},
    {date: new Date("Dec 13, 2015"), week: 16}
    // Upper error not necessary
];

// Creates a cookie with the given name, value, and expire date.
function setCookie(cname, cvalue, date) {
    var expires = "expires=" + date.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

// Gets a cookie with the given name, or empty string.
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i=0; i<ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1);
        if (c.indexOf(name) == 0) return c.substring(name.length, c.length);
    }
    return "";
}

// Checks if a cookie with the given name exists.
function checkCookie(name) {
    var cookie = getCookie(name);
    return (cookie != "");
}

// Checks if the given Date object is in the future.
function dateInTheFuture(date, nowDate)
{
    return (nowDate.getTime() < date.getTime());
}


// Time for the real stuff...
var now = new Date();
var week = 0; // Initial value
var times = 1;
var name = "HowManyTimesHaveYouCheckedThisWeek";

for (var i = 0; i < weeks.length; i++) {
    if (dateInTheFuture(weeks[i].date, now))
    {
        if (checkCookie(name))
        {
            times = parseInt(getCookie(name), 10) + 1;
        }

        setCookie(name, times, weeks[i].date);

        week = weeks[i].week;
        break;
    }
}

if (week > 0)
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
else
{
    // BOO! I don't know what week it is. I suck. Sorry 'bout that.
    document.getElementById("currently").innerHTML = "I don't know what week it is";
    document.getElementById("broken").style.display = "block";
    // Hide some stuff...
    document.getElementById("quote").style.display = "none";
    document.getElementById("youVisited").style.display = "none";

    // Expire the cookie
    setCookie(name, times, new Date("2000-01-01"));
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