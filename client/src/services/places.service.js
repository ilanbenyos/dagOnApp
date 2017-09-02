
//for server
let baseUrl = 'http://localhost:3003/places';
if (process.env.NODE_ENV !== 'development') {
//for client
  baseUrl = '/places';
}

import axios from 'axios'
import _ from 'lodash'



function getMarkerById(markerId) {
    return getMarkers()
        .then(markers => {
            return markers.find(marker => markerId === marker.id);
        });
}


function saveMarker(lat, lng) {
    const marker = {
        position: { lat: lat, lng: lng },
    }
    return findTitle(marker.position)
        .then((res) => {
            marker.title = res
            return marker;
        })
}


function findTitle(latlng) {
    console.log('latlng from find title')
    console.log(latlng)
    var geocoder = new google.maps.Geocoder;
    var infowindow = new google.maps.InfoWindow;
    return new Promise(function (resolve, reject) {
        geocoder.geocode({ 'location': latlng }, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    resolve(results[0].formatted_address)
                } else {
                    resolve('Area 51');
                }
            } else {
                resolve('Area 51');
            }
        });
    })
}

function changeMarkerPos(marker, lat, lng) {
    marker.position.lat = lat;
    marker.position.lng = lng;
    findTitle(marker.position)
        .then((res) => { marker.title = res })
}


export default {
    saveMarker,
    changeMarkerPos,
    findTitle
}