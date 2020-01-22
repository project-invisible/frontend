import React, {
  Component,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState
} from "react";
import {
  Map,
  Marker,
  Popup,
  TileLayer,
  Pane,
  ZoomControl,
  LayerGroup,
  Circle,
  useLeaflet
} from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { getAllPOIs, toggleSearchLoading } from "./SearchReducer";
import detailsStore, { getDetails } from "./DetailsReducer";
import { PointOfInterest } from "../types/PointOfInterest";

const useStyles = makeStyles({});

const PointsOfInterest = forwardRef((props, ref) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { map } = useLeaflet();

  const [filteredMarkers, setFilteredMarkers] = useState<
    Array<PointOfInterest>
  >([]);
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const showDetails: boolean = useSelector(
    (state: any) => state.detailsStore.showDetails
  );

  const detail: PointOfInterest = useSelector(
    (state: any) => state.detailsStore.detailPOI
  );

  const finishedSearchLoading: boolean = useSelector(
    (state: any) => state.searchStore.finishedSearchLoading
  );

  const searchResults: Array<PointOfInterest> = useSelector(
    (state: any) => state.searchStore.searchResults
  );

  const poiChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.poiChecked
  );
  const entryChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.entryChecked
  );
  const allPOIs: Array<PointOfInterest> = useSelector(
    (state: any) => state.searchStore.allPois
  );
  const finishedFirstLoading: number = useSelector(
    (state: any) => state.searchStore.finishedFirstLoading
  );

  useEffect(() => {
    dispatch(getAllPOIs());
    updateMarkers();
  }, []);

  useEffect(() => {
    if(poiChecked) {
      dispatch(getAllPOIs());
      updateMarkers();
    }
  }, [poiChecked]);

  useEffect(() => {
    if (finishedFirstLoading === 1 && initialLoad === false) {
      updateMarkers();
      setInitialLoad(true);
    } else if (searchResults.length > 0 && finishedSearchLoading) {
      updateMarkers();
      dispatch(toggleSearchLoading(false));
    }
  });

  const updateMarkers = () => {
    const pois = searchResults.length > 0 ? searchResults : allPOIs;
    const tempMarkers = pois.filter(poi => {
      const coordinates: LatLngExpression = [
        poi.coordinates.y,
        poi.coordinates.x
      ];
      return map.getBounds().contains(coordinates);
    });
    setFilteredMarkers(tempMarkers);
  };

  useImperativeHandle(ref, () => ({
    callUpdate() {
      updateMarkers();
    }
  }));

  return (
    <>
      <LayerGroup>
        {filteredMarkers && map.getZoom() > 5 ? (
          filteredMarkers.map((poi, index) => {
            const coordinates: LatLngExpression = [
              poi.coordinates.y,
              poi.coordinates.x
            ];
            return (
              <Marker
                key={index}
                position={coordinates}
                onClick={() =>
                  showDetails
                    ? dispatch(getDetails(!(poi.id === detail.id), poi.id))
                    : dispatch(getDetails(true, poi.id))
                }
              >
                <Popup>{poi.name}</Popup>
              </Marker>
            );
          })
        ) : (
          <div />
        )}
      </LayerGroup>
    </>
  );
});

export default PointsOfInterest;
