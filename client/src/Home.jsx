import L from 'leaflet';
import countries from './data.json';
import users from './users.json';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';



L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Home = () => {
// console.log(users.users);
var [userData,setData] = useState([]);

const fatchArea = async () =>{
    await axios.get('https://kyupid-api.vercel.app/api/areas').then((data) =>{
        setData(userData =>([...userData,data.data]));
    }).catch((err)=>{
        console.log(err);
        console.log(err);
    })

}
useEffect(()=>{
    // setData([]);
    fatchArea();

},[]);

console.log(userData[0]);

    const onEachFeature = (feature, layer) => {
        var fem = 0;
        var male = 0;
        var sub = 0;
        var total = 0;
        
        users.users.map((user) =>{
            if(user.area_id===feature.properties.area_id)
            {
                if(user.is_pro_user)
                {
                    sub++;
                }
                if(user.gender==='F')
                {
                    fem++;
                }
                else
                {
                    male++;
                }
                
                total++;

            }
        
        })
        

        const ppop = `<div>${feature.properties.name}<br>total user: ${total}<br>female:${fem}<br>male:${male}<br>pro user:${sub}<br>id:${feature.properties.area_id}</div>`
        layer.bindPopup(ppop);
    }
    
    const position = [12.9716, 77.5946];
    console.log(countries.features);
    console.log(userData[0]);
    return (
        <MapContainer center={position} zoom={13}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                userData[0]!==undefined?
            <GeoJSON data={userData[0].features} onEachFeature={onEachFeature} />
            :
            <></>
            }
        </MapContainer>
    )
}

export default Home;