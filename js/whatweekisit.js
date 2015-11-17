/*
 * Lots of *fun* stuff in here.
 * 
 * (I should clean some of this up.)
 */

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
// Depends on global variable "now," because I'm lazy.
function dateInTheFuture(date)
{
    return (now.getTime() < date.getTime());
}

// Checks if the date is in the future, sets the cookies, 
// and updates global variable "times" with times visited.
// Depends on global variables "name," "times," and "now," because I'm lazy.
function checkAndSet(dateString)
{
    var date = new Date(dateString);

    if (dateInTheFuture(date))
    {
        if (checkCookie(name))
        {
            times = parseInt(getCookie(name), 10) + 1;
        }

        setCookie(name, times, date);

        return true;
    }
    return false;
}

// Time for the real stuff...
var now = new Date();
var week;
var times = 1;
var name = "HowManyTimesHaveYouCheckedThisWeek";

if (checkAndSet("2015-11-01"))
{
    week = -1;
}
else if (checkAndSet("2015-11-09"))
{
    week = 11;
}
else if (checkAndSet("2015-11-15"))
{
    week = 12;
}
else if (checkAndSet("2015-11-22"))
{
    week = 13;
}
else if (checkAndSet("2015-11-29"))
{
    week = 14;
}
else if (checkAndSet("2015-12-06"))
{
    week = 15;
}
else if (checkAndSet("2015-12-13"))
{
    week = 16;
}
else
{
    week = -2;
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