function onDocumentReady() {
	// Conectamos sockets con el dominio
	var socket = io.connect(window.location.href);

	// Coordenada inicial
	var defaultLatLng = [0, -23.818359375];

	// Creamos mapa
	var map = L.map('map', { //Id de nuestro div
		center: defaultLatLng,
		zoom: 3,
		maxZoom: 18
	});

	// Creamos tiles y los añadimos al mapa, algunos ejemplos, ver más en http://wiki.openstreetmap.org/wiki/Tileserver
	// OpenStreetMaps Tiles: http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
	// Cloudmade Tiles: http://{s}.tile.cloudmade.com/BC9A493B41014CAABB98F0471D759707/997/256/{z}/{x}/{y}.png
	// Toner Tiles: http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png
	var layer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		attribution: 'Jose',
		maxZoom: 18
	});

	// Añadimos el layer creado al mapa
	layer.addTo(map);
	map.locate({
		enableHighAccuracy: true
	});

	//evento de localización exitosa
	map.on('locationfound', onLocationFound);

	// Creamos marker cuando nos llega una coordenada
	socket.on('load:coords', onLoadCoords);
	
	function onLoadCoords(data) {
		if (data) {
			console.log("nuevito"+data.coords);
			showUser(data.coords);
		}		
	}
	//emite el nueveo usuario y manda a pintar el marker
	function onLocationFound(position) {
		
		var coords = [position.latlng.lat, position.latlng.lng];

		showUser(coords);

		socket.emit('send:coords', {
			coords: coords
		});	
	}

	//pinta un nuevo marker
	function showUser(coords) {
		var mycoords = coords;
		console.log(coords);
		var marker = L.marker(mycoords);
		marker.addTo(map);
		marker.bindPopup("Hola mundo");
	}

}

$(document).on('ready', onDocumentReady);