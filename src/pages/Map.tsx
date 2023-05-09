import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useState, useEffect } from "react";
// @ts-ignore
import L from 'leaflet';
import iconMarker from 'leaflet/dist/images/marker-icon.png'
import iconRetina from 'leaflet/dist/images/marker-icon-2x.png'
import iconShadow from 'leaflet/dist/images/marker-shadow.png'

interface Country {
  country: string;
  cases: number;
  recovered: number;
  deaths: number;
  active: number;
  countryInfo: {
    flag: string;
    lat: number;
    long: number;
    iso3:number;
  };
}

const icon = L.icon({
  iconRetinaUrl:iconRetina,
  iconUrl: iconMarker,
  shadowUrl: iconShadow
});

const Map = () => {
  const position = [20.5937, 78.9629];
  const [countries, setCountries] = useState<Country[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch(
        "https://disease.sh/v3/covid-19/countries"
    ).then(response => response.json()).then(result => {
      setCountries(result);
    });
  };

  // @ts-ignore
  return (
      // @ts-ignore
        <MapContainer center={position} zoom={5} style={{height: '100%'}}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          {countries.map(country =>
              // @ts-ignore
            (<Marker position={[country.countryInfo.lat, country.countryInfo.long]} icon={icon}>
              <Popup>
                <h3>{country.country}</h3>
                <p>Active cases: {country.active}</p>
                <p>Recovered cases: {country.recovered}</p>
                <p>Deaths: {country.deaths}</p>
              </Popup>
            </Marker>)
          )}
        </MapContainer>
  )}


export default Map;