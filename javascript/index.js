let maps;
let position = { lat: 13.847860, lng: 100.604274 };
let positionArr = [];

function positionItem(lat, lng) {
    this.lat = lat;
    this.lng = lng;
}

function initMap() {
    maps = new google.maps.Map(document.getElementById('map'), {
        center: position,
        zoom: 15
    });
    let geocoder = new google.maps.Geocoder();
    document.getElementById('submit').addEventListener('click', function () {
        geocoderAddress(geocoder, maps);
    });
}

//กด Search ค้นหาตำแหน่ง
function geocoderAddress(geocoder, resultsMap) {
    let address = document.getElementById('address').value;
    geocoder.geocode({ 'address': address }, function (results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            let marker = new google.maps.Marker({
                animation: google.maps.Animation.DROP,
                map: resultsMap,
                position: results[0].geometry.location,
                draggable: true
            })
            let latitude = marker.getPosition().lat();
            let longitude = marker.getPosition().lng();

            console.log(results[0].formatted_address);

            document.getElementById("latitude").value = latitude;
            document.getElementById("longitude").value = longitude;

            //drag mark เพิ่มเปลี่ยน lat,lng
            google.maps.event.addListener(marker, 'dragend', function (event) {
                document.getElementById("latitude").value = this.getPosition().lat();
                document.getElementById("longitude").value = this.getPosition().lng();
            });
        } else {
            alert('Geocode was not successful for the following reason: ' + status);
        }
    })
}

//กด Add เพิ่มตำแหน่งลงในตาราง
function addLocationHandler() {
    let lat = document.getElementById("latitude").value;
    let lng = document.getElementById("longitude").value;
    let rowLength = document.getElementById("myTable").rows.length;
    let currentPosition = new positionItem(lat, lng);

    if (lat && lng) {
        if (rowLength < 6) {
            let table = document.getElementById("myTable");
            let row = table.insertRow(0);
            let cell1 = row.insertCell(0);
            let cell2 = row.insertCell(1);
            let cell3 = row.insertCell(2);
            cell1.innerHTML = "ที่อยู่.....";
            cell2.innerHTML = lat;
            cell3.innerHTML = lng;

            positionArr.push(currentPosition);

            console.log(positionArr);

        } else {
            alert('เพิ่มตำแหน่งครบแล้ว');
        }
    } else {
        alert('กรุณาเลือกตำแหน่ง');
    }

}

function confirmLocationHandler() {
    let rowLength = document.getElementById("myTable").rows.length;
    if (rowLength > 5) {
        localStorage.myArrData = JSON.stringify(positionArr);
        location.replace("http://localhost:3020/map");
    } else {
        alert('กรุณาเพิ่มตำแหน่งในตารางให้ครบ');
    }

}