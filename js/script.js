/**
 * Created by Lucas on 10/12/2017.
 */

function scrollto (x) {
    document.getElementById(x).scrollIntoView();
}

function validateForm () {
    var x = document.forms["mapsearch"]["postcode"].value;
    if (isNaN(x) || x < 1000 || x > 9999) {
        document.getElementById("postcode").innerHTML = "Please enter a valid postcode:";
        return false;
    } else {
        document.getElementById("postcode").innerHTML = "Postcode:";
    }
}


