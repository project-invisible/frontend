import React, { Component } from 'react'
import { Map, Marker, Popup, TileLayer, Pane, ZoomControl } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar.tsx';
import Control from 'react-leaflet-control';

const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        minHeight: '100%',
    },
  });

export default function HomeMap() {
  const classes = useStyles({});
  const mapProps = {
    lat: 51.505,
    lng: -0.09,
    zoom: 13,
  }
  const zoomControl = {
      position: "bottomright",
  }
  const position: LatLngExpression = [mapProps.lat, mapProps.lng]

    return (
      <Map center={position} zoom={mapProps.zoom} className={classes.root} zoomControl={false} >
        <ZoomControl position="bottomright"/>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Control position="topleft" >
            <SearchBar />
        </Control>
        <Marker position={position}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </Map>
    )
}