import React, { Component, useEffect } from 'react'
import { Map, Marker, Popup, TileLayer, Pane, ZoomControl, LayerGroup, Circle, useLeaflet } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { makeStyles } from '@material-ui/core/styles';
import SearchBar from './SearchBar';
import Control from 'react-leaflet-control';
import SwitchLayer from './SwitchLayer';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPOIs } from './SearchReducer';
import { SearchResult } from '../types/SearchResult';
import { PointOfInterest } from './../types/PointOfInterest';

const useStyles = makeStyles({
  });

  const center: LatLngExpression = [52.505, -0.09];

export default function PointsOfInterest() {
  const classes = useStyles({});
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPOIs());
  }, []);

  const { map } = useLeaflet();
  const allPOIs: Array<PointOfInterest> = useSelector((state: any) => state.searchStore.allPois);

    return (
      <>
          <LayerGroup>
            {
              allPOIs ?
              allPOIs.filter( poi => {
                const coordinates: LatLngExpression = [
                    poi.coordinates.y,
                    poi.coordinates.x,
                ];
                return map.getBounds().contains(coordinates);
              }).map( (poi, index) => {
                const coordinates: LatLngExpression = [
                  poi.coordinates.y,
                  poi.coordinates.x
                ];
                return (
                  <Marker key={index} position={coordinates}>
                    <Popup>
                      {poi.name}
                    </Popup>
                  </Marker>
                )
              })
              : <div/>
            }
          </LayerGroup>
      </>
    )
}