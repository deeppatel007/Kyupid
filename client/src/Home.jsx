import L from 'leaflet';
import countries from './data.json';
import users from './users.json';
import { MapContainer, Marker, Popup, TileLayer, GeoJSON, FeatureGroup, Circle } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';


L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

const Home = () => {
    // console.log(users.users);
    var [areaData, setData] = useState([]);
    // var [userData, setUserData] = useState([]);
    var a = {};

    const fatchArea = async () => {
        await axios.get('https://kyupid-api.vercel.app/api/areas').then((data) => {
            setData(areaData => ([...areaData, data.data]));
        }).catch((err) => {
            console.log(err);

        })

    }


    const fatchUser = async () => {
        await axios.get('https://kyupid-api.vercel.app/api/users').then((data) => {

            data.data.users.map((data) => {

                a[data.area_id] = [0, 0, 0, 0];


            })
            console.log(a);


            data.data.users.map((data) => {


                a[data.area_id][0]++;
                if (data.gender === 'M')
                    a[data.area_id][1]++;
                else
                    a[data.area_id][2]++;

                if (data.is_pro_user === true)
                    a[data.area_id][3]++;
            })
            localStorage.setItem("arr", JSON.stringify(a));
            console.log(a);
        }).catch((err) => {
            console.log(err);
            console.log(err);
        })

    }
    useEffect(() => {
        fatchArea();
        fatchUser();
    }, []);
    var d = JSON.parse(localStorage.getItem("arr"));
    console.log(d);

    const onEachFeature = (feature, layer) => {
        console.log(feature);
        const ppop = `<div><h1>${feature.properties.name}<br>Total User: ${d[feature.properties.area_id][0]}<br>Male User:${d[feature.properties.area_id][1]}<br>Female User:${d[feature.properties.area_id][2]}<br>Pro User:${d[feature.properties.area_id][3]}<br></h1></div>`
        layer.bindPopup(ppop);
        layer.options.fillOpacity = (d[feature.properties.area_id][0]) / 350;
        layer.on({
            mouseover: function over(e) {
                this.openPopup()
            }
        })
    }

    const position = [12.9716, 77.5946];
    console.log(countries.features);

    return (
        <div >

            <MapContainer center={position} zoom={13} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {
                    areaData[0] !== undefined ?
                        <GeoJSON data={areaData[0].features} onEachFeature={onEachFeature} />
                        :
                        <></>
                }
            </MapContainer>

        </div>
    )
}

export default Home;