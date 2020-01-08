import React, { Component, useEffect, useRef } from 'react'
import { Map, Marker, Popup, TileLayer, Pane, ZoomControl, LayerGroup, Circle, useLeaflet } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import Control from 'react-leaflet-control';
import SwitchLayer from './SwitchLayer';
import { useSelector, useDispatch } from 'react-redux';
import PointsOfInterest from './PointsOfInterest';

const useStyles = makeStyles({
    root: {
        minWidth: '100%',
        minHeight: 'calc( 100% - 64px)',
    },
  });

  const center: LatLngExpression = [52.505, -0.09];

export default function HomeMap() {
  const classes = useStyles({});
  const childRef = useRef(null);

  const mapAttributes = {
    lat: 52.5137,
    lng: 13.322,
    zoom: 8,
  }
  const position: LatLngExpression = [mapAttributes.lat, mapAttributes.lng]

  const markers: Array<LatLngExpression> = useSelector((state: any) => state.switchLayerStore.mapMarker);

    return (
      <>
        <Map center={position} zoom={mapAttributes.zoom} className={classes.root} zoomControl={false} onMoveEnd={() => childRef.current.callUpdate()}>
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
          <PointsOfInterest ref={childRef}/>
        </Map>
      </>
    )
}