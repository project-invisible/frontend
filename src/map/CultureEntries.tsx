import React, {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState
} from "react";
import { Marker, Popup, LayerGroup, useLeaflet } from "react-leaflet";
import { LatLngExpression } from "leaflet";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from "react-redux";
import { toggleSearchLoading, getAllEntries, toggleEntrySearchLoading } from "./SearchReducer";
import { CultureEntry } from "./../types/CultureEntry";
import {
  getEntryDetails,
  toggleEntryDetailView
} from "./../entries/EntryDetailsReducer";
import { closeDetailView } from "./DetailsReducer";
import EntryModal from "./../entries/EntryModal";

const useStyles = makeStyles({});

export interface CultureEntriesProps {
  xCoord: number;
  yCoord: number;
}

const CultureEntries = forwardRef((props: CultureEntriesProps, ref) => {
  const classes = useStyles({});
  const dispatch = useDispatch();
  const { map } = useLeaflet();
  const { xCoord, yCoord } = props;

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
    } else if (
      searchResults &&
      searchResults.length > 0 &&
      finishedEntrySearchLoading
    ) {
      updateMarkers();
      dispatch(toggleEntrySearchLoading(false));
    }
  });

  const updateMarkers = () => {
    const entries =
      searchResults && searchResults.length > 0 ? searchResults : allEntries;
    const tempMarkers = entries.filter(entry => {
      const coordinates: LatLngExpression = [entry.coords.y, entry.coords.x];
      return map.getBounds().contains(coordinates);
    });
    setFilteredMarkers(tempMarkers);
  };

  const openEntryDetailView = (entryId: number) => {
    dispatch(getEntryDetails(true, entryId));
    dispatch(closeDetailView(false));
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
          filteredMarkers.map((entry, index) => {
            const coordinates: LatLngExpression = [
              entry.coords.y,
              entry.coords.x
            ];
            return (
              <Marker
                key={`entry-${index}`}
                position={coordinates}
                onClick={() =>
                  showDetails
                    ? dispatch(
                        getEntryDetails(!(entry.id === detail.id), entry.id)
                      )
                    : openEntryDetailView(entry.id)
                }
              >
                <Popup>{entry.name}</Popup>
              </Marker>
            );
          })
        ) : (
          <div />
        )}
      </LayerGroup>
      <EntryModal culturyEntry={detail} xCoord={xCoord} yCoord={yCoord} />
    </>
  );
});

export default CultureEntries;
