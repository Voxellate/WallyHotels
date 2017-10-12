/**
 * Created by 002789 on 12/10/2017.
 */
function myMap() {
    var mapProp = {center:new google.maps.LatLng(-27.464234, 153.021178), zoom:16};
    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    var marker = new google.maps.Marker({position: new google.maps.LatLng(-27.464234, 153.021178), animation:google.maps.Animation.BOUNCE});
    marker.setMap(map);
}