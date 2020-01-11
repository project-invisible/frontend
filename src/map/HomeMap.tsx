import React, { useRef } from "react";
import {
  Map,
  TileLayer,
  ZoomControl} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";
import Control from "react-leaflet-control";
import SwitchLayer from "./SwitchLayer";
import PointsOfInterest from "./PointsOfInterest";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "calc( 100% - 64px)"
  },
  result: {
    overflowY: "scroll",
    height: "calc(100vh - 20vh)"
  }
});

export default function HomeMap() {
  const classes = useStyles({});

  const childRef = useRef(null);

  const mapAttributes = {
    lat: 52.5137,
    lng: 13.322,
    zoom: 8
  };
  const position: LatLngExpression = [mapAttributes.lat, mapAttributes.lng];

  return (
    <>
      <Map
        center={position}
        zoom={mapAttributes.zoom}
        className={classes.root}
        zoomControl={false}
        onMoveEnd={() => childRef.current ? childRef.current.callUpdate() : null}
      >
        <ZoomControl position="bottomright" />
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Control position="topleft">
          <SearchBar />
        </Control>
        <Control position="topleft">
          <SwitchLayer />
        </Control>
        <PointsOfInterest ref={childRef} />
      </Map>
    </>
  );
}
