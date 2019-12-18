import React, { Component, useEffect } from 'react'
import { Map, Marker, Popup, TileLayer, Pane, ZoomControl, LayerGroup, Circle } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import Control from 'react-leaflet-control';
import SwitchLayer from './SwitchLayer';
import { useSelector } from 'react-redux';
import Navigationbar from '../navigationbar/Navigationbar';

const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        minHeight: 'calc( 100% - 64px)',
    },
  });

  const center: LatLngExpression = [52.505, -0.09];

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

  const markers: Array<LatLngExpression> = useSelector((state: any) => state.switchLayerStore.mapMarker);

    return (
      <>
        <Navigationbar />
        <Map center={position} zoom={mapProps.zoom} className={classes.root} zoomControl={false} >
          <ZoomControl position="bottomright"/>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Control position="topleft" >
              <SearchBar />
          </Control>
          <Control position="topleft" >
              <SwitchLayer />
          </Control>
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
          <LayerGroup>
            {
              markers ?
              markers.map( marker => {
                return (
                  <Marker position={marker}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                )
              })
              : <div/>
            }
          </LayerGroup>
        </Map>
      </>
    )
}