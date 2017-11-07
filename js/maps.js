/**
 * Created by 002789 on 12/10/2017.
 */

const locations = [["Wally Alpha","2 Musgrave Road, Red Hill QLD 4059"], //2D Array of hotel locations.
    ["Wally Beta", "81 Surf Parade, Broadbeach QLD 4218"],
    ["Wally Delta", "398 Marine Parade, Biggera Waters QLD 4216"],
    ["Wally Gamma", "118 Eagle Terrace, Sandgate QLD 4017"]];

var map;    //Initializes map as a variable

var markers = [];   //Initializes markers as an empty array

function mapConfig() {  //function that holds the map configuration and initializes the map.
    var mapProp = {center:new google.maps.LatLng(-27.464234, 153.021178), zoom:14, disableDefaultUI: true};
    map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
}

function locTable (){   //Generates a table from the locations array.
    var contents = "";
    for(var i = 0; i < locations.length; i++) {
        contents += "<tr onclick='addressClick(" + i + ")'><td>" + locations[i][0] + "</td><td>" + locations[i][1] + "</td></tr>";
    }
    document.getElementById("locTable").innerHTML = contents;
}

function addressSearch() {
    /* Function that geocodes an address to coordinates, computes the distance between the given address and the array addresses,
    * and displays the closest address on the map. */
    var places = [];
    places = locations.slice();
    places.unshift(["user",document.getElementById("address").value]);
        geocodeArray(places, function(coords) {
            // Do something after finishing geocoding of multiple addresses
            console.log(coords);
            var distances = [];
            for(var i = 1; i < coords.length; i++) {
                distances[i-1] = google.maps.geometry.spherical.computeDistanceBetween(coords[0], coords[i])
            }
            console.log(distances);
            var closest = minVal(distances)[0];
            console.log(coords[closest]);
            clearMarkers();
            newMarker(coords[closest], closest);
            places = [];
        });
}

function addressClick(index) { //Function that geocodes an address to coordinates and displays the location on the map.
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'address': locations[index][1]}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
            clearMarkers();
            newMarker(results[0].geometry.location, index);
        } else {
            throw('No results found: ' + status);
        }
    });
}

function geocodeArray(addresses, callback) {    //Geocodes an array of addresses sequentially.
    var coords = [];
    console.log(addresses);
    console.log(locations);
    for(var i = 0; i < addresses.length; i++) {
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode({'address':addresses[i][1]}, function (results, status) {
            if (status === google.maps.GeocoderStatus.OK) {
                coords.push(results[0].geometry.location);
                if(coords.length === addresses.length) {
                    callback(coords);
                }
            }
            else {
                throw('No results found: ' + status);
            }
        });

    }
}

function newMarker(coords, index) {
    //Given coordinates and the index of the address in the array, displays a marker at those coordinates
    var name = locations[index][0];
    var address = locations[index][1];
    var marker = new google.maps.Marker({position:coords, map:map, title:name, animation:google.maps.Animation.DROP});
    marker.setMap(map);
    markers.push(marker);
    showMarker(marker);
    google.maps.event.addListenerOnce(map, 'idle', function(){
        new google.maps.InfoWindow({content:(name + ": " + address)}).open(map, marker);
    });
}

function showMarker(marker) {   //Centers the map on a marker
    map.setCenter(marker.getPosition());
    map.setZoom(14);
}

function clearMarkers() {   //Clears the markers off the map
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];

}

function minVal (array) {   //Gives the minimum value of an array
    var index = 0;
    var value = array[0];
    for (var i = 1; i < array.length; i++) {
        if (array[i] < value) {
            value = array[i];
            index = i;
        }
    }
    return [index,value]
}

/*function geocode(address, callback) {
    var geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(0,0);
    geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
            latlng.push(new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng()));
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    });
}*/

/* geocode(address, function(addr){a1 = addr;});
 //var a2 = geocode(locations[i][1]);
 console.log(a1.lat(), a1.lng(), a2.lat(), a2.lng());
 //console.log(google.maps.geometry.spherical.computeDistanceBetween(a1, a2)); */