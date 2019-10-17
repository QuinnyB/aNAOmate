const url_string = window.location.href;
const url = new URL(url_string);
const robotIP = url.searchParams.get("robot");

// If the URL contains the "robot" parameter then load the robotutils.js
if (robotIP != null) {
    document.write('<script src="js/robotutils.qim1.js"><\/script>');
}

// Load main js
document.write('<script src="js/main.js"><\/script>');
