<template>
    <div id="map-canvas">div</div>

</template>
<script>
import Vue from 'vue'
const VueGoogleMaps = require('vue2-google-maps');

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyAIaE1djVXVF6V-ab6FjW-RQ48Q5ErH71Q',
    v: '3',
    libraries: 'places'
  }
})
export default {
  name: 'Ex',
  props: ['name'],
  data: function () {
    return {
      mapName: this.name + "-map",
      center:{lat:32.38, lng:34.8},
      markers: [{id:1,position:{lat:32.38, lng:34.8}},{id:2,position:{lat:32.39, lng:34.9}}],
    }
  },
  mounted () {
    var that = this;
    setTimeout(function() {
        that.initMap();
    }, 500);
  },
  
  methods: {
     initMap() {
    var pointA = new google.maps.LatLng(51.7519, -1.2578),
        pointB = new google.maps.LatLng(50.8429, -0.1313),
        myOptions = {
            zoom: 7,
            center: pointA
        },
        map = new google.maps.Map(document.getElementById('map-canvas'), myOptions),
        // Instantiate a directions service.
        directionsService = new google.maps.DirectionsService,
        directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        }),
        markerA = new google.maps.Marker({
            position: pointA,
            title: "point A",
            label: "A",
            map: map
        }),
        markerB = new google.maps.Marker({
            position: pointB,
            title: "point B",
            label: "B",
            map: map
        });

    // get route from A to B
    this.calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB);

},
calculateAndDisplayRoute(directionsService, directionsDisplay, pointA, pointB) {
    directionsService.route({
        origin: pointA,
        destination: pointB,
        avoidTolls: true,
        avoidHighways: false,
        travelMode: google.maps.TravelMode.DRIVING
    }, function (response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


  }
};
</script>
<style>
   html, body {
          height: 100%;
          margin: 0;
          padding: 0;
      }
      #map-canvas {
          height: 100%;
          width: 100%;
      }
</style>