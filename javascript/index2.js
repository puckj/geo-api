let maps;
let position = { lat: 13.883932, lng: 100.512292 }

let positionArr = JSON.parse(localStorage.myArrData);


function initMap() {
    maps = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 12
    });

    let officeMarker = new google.maps.Marker({
        position: position,
        map: maps,
        animation: google.maps.Animation.BOUNCE,
    })

    let marker, info;
    let i;

    $.each(positionArr, function (i, item) {
        marker = new google.maps.Marker({
            position: new google.maps.LatLng(item.lat, item.lng),
            map: maps
        });


        info = new google.maps.InfoWindow();
        google.maps.event.addListener(marker, 'click', (function (marker, i) {
            return function () {
                info.setContent(item.address);
                info.open(maps, marker)
            }
        })(marker, i));
    })
}