import React, { useRef, useState } from "react";
import { Map, TileLayer, ZoomControl } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import SearchBar from "./SearchBar";
import Control from "react-leaflet-control";
import SwitchLayer from "./SwitchLayer";
import PointsOfInterest from "./PointsOfInterest";
import CultureEntries from "./CultureEntries";
import { useSelector, useDispatch } from "react-redux";
import { toggleEntryModal } from "../entries/EntryDetailsReducer";
import EntryModal from "./../entries/EntryModal";

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
  const [xCoord, setXCoord] = useState<number>(0);
  const [yCoord, setYCoord] = useState<number>(0);

  const childRef = useRef(null);
  const entriesRef = useRef(null);
  const dispatch = useDispatch();

  const mapAttributes = {
    lat: 52.5137,
    lng: 13.322,
    zoom: 8
  };
  const position: LatLngExpression = [mapAttributes.lat, mapAttributes.lng];

  const poiChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.poiChecked
  );
  const entryChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.entryChecked
  );

  const openCultureModal = event => {
    if (entryChecked) {
      setXCoord(event.latlng.lat);
      setYCoord(event.latlng.lng);
      dispatch(toggleEntryModal(true));
      console.log("open modal");
    }
  };

  return (
    <>
      <Map
        center={position}
        zoom={mapAttributes.zoom}
        className={classes.root}
        zoomControl={false}
        onClick={(event) => openCultureModal(event)}
        onMoveEnd={() => {
          childRef.current ? childRef.current.callUpdate() : null;
          entriesRef.current ? entriesRef.current.callUpdate() : null;
        }}
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
        {poiChecked && <PointsOfInterest ref={childRef} />}
        {entryChecked && (
          <CultureEntries ref={entriesRef} xCoord={xCoord} yCoord={yCoord} />
        )}
      </Map>
    </>
  );
}
