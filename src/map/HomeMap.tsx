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
import { CardContent, Card, CardActionArea } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    minWidth: "100%",
    minHeight: "calc( 100% - 64px)"
  },
  result: {
    overflowY: "scroll",
    height: "calc(100vh - 20vh)"
  },
  genderPopup: {
    left: "50%",
    top: "90%"
  }
});

export default function HomeMap() {
  const classes = useStyles({});
  const [xCoord, setXCoord] = useState<number>(0);
  const [yCoord, setYCoord] = useState<number>(0);
  const [genderPopup, setGenderPopup] = useState<boolean>(false);
  const history = useHistory();
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
  const token: string = useSelector((state: any) => state.registerStore.token);

  const openCultureModal = () => {
    if (token && token !== "") {
      dispatch(toggleEntryModal(true));
    } else {
      history.push("/login");
    }
  };

  const openCultureCard = event => {
    if (entryChecked) {
      setXCoord(event.latlng.lat);
      setYCoord(event.latlng.lng);
      setGenderPopup(true);
    }
  };

  return (
    <>
      <Map
        center={position}
        zoom={mapAttributes.zoom}
        className={classes.root}
        zoomControl={false}
        onClick={event => openCultureCard(event)}
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
        {genderPopup && (
          <Control position="topright">
            <Card>
              <CardActionArea onClick={() => openCultureModal()}>
                <CardContent>
                  {token && token !== ""
                    ? `Add entry to Gender Diverse Cultures`
                    : `Login to add entry to Gender Diverse Cultures`}
                </CardContent>
              </CardActionArea>
            </Card>
          </Control>
        )}
        {poiChecked && <PointsOfInterest ref={childRef} />}
        {entryChecked && (
          <CultureEntries ref={entriesRef} xCoord={xCoord} yCoord={yCoord} />
        )}
      </Map>
    </>
  );
}
