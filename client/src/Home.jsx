import L from 'leaflet';
import countries from './data.json';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, FeatureGroup,Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef } from 'react';



L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Home = () => {


        
    const  onEachFeature = (feature, layer) => {
        const ppop = `<div>${feature.properties.name}</div>`
        layer.bindPopup(ppop);
    }
    const position = [12.9716, 77.5946];
   
    return (
        <MapContainer center={position} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <GeoJSON data={countries.features} onEachFeature={onEachFeature}/>
        </MapContainer>
    )
}

export default Home;