/*
 * Lots of *fun* stuff in here.
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

    document.write("You've visited this site <strong>" + times + "</strong> time" + ((times == 1) ? "" : "s") + " this academic week.")
}
else
{
    // BOO! I don't know what week it is. I suck. Sorry 'bout that.
    document.getElementById("currently").innerHTML = "I don't know what week it is";
    document.getElementById("broken").style.display = "block";

    // Expire the cookie
    setCookie(name, times, new Date("2000-01-01"));
}