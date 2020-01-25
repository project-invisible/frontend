import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState
} from "react";
import {
  Marker,
  Popup,
  LayerGroup,
  useLeaflet
} from "react-leaflet";
import { LatLngExpression, Icon } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import {
  toggleSearchLoading,
  getAllEntries
} from "./SearchReducer";
import { CultureEntry } from "./../types/CultureEntry";
import { getEntryDetails, toggleEntryDetailView } from "./../entries/EntryDetailsReducer";
import MarkerClusterGroup from 'react-leaflet-markercluster';

const useStyles = makeStyles({});

const CultureEntries = forwardRef((props, ref) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { map } = useLeaflet();

  const [filteredMarkers, setFilteredMarkers] = useState<Array<CultureEntry>>(
    []
  );
  const [initialLoad, setInitialLoad] = useState<boolean>(false);

  const showDetails: boolean = useSelector(
    (state: any) => state.entryDetailsStore.showEntryDetails
  );

  const detail: CultureEntry = useSelector(
    (state: any) => state.entryDetailsStore.detailEntry
  );

  const finishedEntrySearchLoading: boolean = useSelector(
    (state: any) => state.searchStore.finishedEntrySearchLoading
  );

  const searchResults: Array<CultureEntry> = useSelector(
    (state: any) => state.searchStore.searchEntryResults
  );
  const entryChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.entryChecked
  );
  const allEntries: Array<CultureEntry> = useSelector(
    (state: any) => state.searchStore.allEntries
  );
  const finishedEntryLoading: number = useSelector(
    (state: any) => state.searchStore.finishedEntryLoading
  );

  useEffect(() => {
    dispatch(getAllEntries());
    updateMarkers();
  }, []);

  useEffect(() => {
    if (entryChecked) {
      dispatch(getAllEntries());
      updateMarkers();
    }
  }, [entryChecked]);

  useEffect(() => {
    if (finishedEntryLoading && initialLoad === false) {
      updateMarkers();
      setInitialLoad(true);
    } else if (searchResults && searchResults.length > 0 && finishedEntrySearchLoading) {
      updateMarkers();
      dispatch(toggleSearchLoading(false));
    }
  });

  const updateMarkers = () => {
    const entries = (searchResults && searchResults.length > 0) ? searchResults : allEntries;
    const tempMarkers = entries.filter(entry => {
      const coordinates: LatLngExpression = [entry.coords.y, entry.coords.x];
      return map.getBounds().contains(coordinates);
    });
    setFilteredMarkers(tempMarkers);
  };

  useImperativeHandle(ref, () => ({
    callUpdate() {
      updateMarkers();
    }
  }));

  const markerIcon = new Icon({
    iconUrl: require("../images/community_icon.svg"),
    shadowUrl: require("../images/marker-shadow.svg"),
    iconSize: [38, 95],
    shadowSize: [18, 47], // size of the shadow
    shadowAnchor: [18, 47], // the same for the shadow
    popupAnchor:  [0, -15]
  });


  return (
    <>
      <LayerGroup>
      <MarkerClusterGroup showCoverageOnHover={false}>
        {filteredMarkers && map.getZoom() > 5 ? (
          filteredMarkers.map((entry, index) => {
            const coordinates: LatLngExpression = [entry.coords.y, entry.coords.x];
            return (
              <Marker
              icon={markerIcon}
                key={`entry-${index}`}
                position={coordinates}
                onClick={() =>
                  showDetails
                    ? dispatch(getEntryDetails(!(entry.id === detail.id), entry.id))
                    : dispatch(getEntryDetails(true, entry.id))
                }
              >
                <Popup>{entry.name}</Popup>
              </Marker>
            );
          })
        ) : (
          <div />
        )}
        </MarkerClusterGroup>
      </LayerGroup>
    </>
  );
});

export default CultureEntries;
