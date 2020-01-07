import React, { Component, useEffect, forwardRef, useImperativeHandle, useState } from 'react'
import { Map, Marker, Popup, TileLayer, Pane, ZoomControl, LayerGroup, Circle, useLeaflet } from 'react-leaflet'
import { LatLngExpression } from 'leaflet'
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { getAllPOIs } from './SearchReducer';
import { PointOfInterest } from '../types/PointOfInterest';

const useStyles = makeStyles({
  });

const PointsOfInterest = forwardRef((props, ref) => {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const [filteredMarkers, setFilteredMarkers] = useState<Array<PointOfInterest>>([]);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  useEffect(() => {
    dispatch(getAllPOIs());
    updateMarkers();
  }, []);

  const finishedFirstLoading: number = useSelector((state: any) => state.searchStore.finishedFirstLoading);
  useEffect(() => {
    if(finishedFirstLoading === 1 && initialLoad === false) {
      updateMarkers();
      setInitialLoad(true);
    }
  });

  const { map } = useLeaflet();
  const allPOIs: Array<PointOfInterest> = useSelector((state: any) => state.searchStore.allPois);
  
  const updateMarkers = () => {
    const tempMarkers = allPOIs.filter( poi => {
      const coordinates: LatLngExpression = [
        poi.coordinates.y,
        poi.coordinates.x,
      ];
      return map.getBounds().contains(coordinates);
    });
    setFilteredMarkers(tempMarkers);
  }

  useImperativeHandle(ref, () => ({
      callUpdate(){
        updateMarkers();
      }
  }));

    return (
      <>
          <LayerGroup>
            {
              allPOIs && map.getZoom() > 4 ?
              filteredMarkers.map( (poi, index) => {
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
});

export default PointsOfInterest;