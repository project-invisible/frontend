import React,  { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Checkbox, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getSelectedLayerData, setPoi, setEntry } from './SwitchLayerReducer';
import { useSelector } from 'react-redux';
import { LatLngExpression } from 'leaflet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          height: '100%',
          width: '300px',
      },
      layerCheck: {
        display: 'inline-block',
      },
      layerContainer: {
        display: 'flex',
        alignItems: 'center',
      }
  }),
);

export default function SwitchLayer() {
  const classes = useStyles({});
  const dispatch = useDispatch();

  const poiChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.poiChecked
  );
  const entryChecked: boolean = useSelector(
    (state: any) => state.switchLayerStore.entryChecked
  );

  const onPoiChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPoi(event.target.checked));
  };
  const onEntryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEntry(event.target.checked));
  };


  return (<Paper className={classes.root}>
      <div>
          <div className={classes.layerContainer}>
            <Checkbox
                  checked={poiChecked}
                  onChange={onPoiChange}
                  className={classes.layerCheck}
                  value="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <Typography className={classes.layerCheck}>
                Higher education institutions
              </Typography>
          </div>
          <div className={classes.layerContainer}>
            <Checkbox
                  checked={entryChecked}
                  onChange={onEntryChange}
                  className={classes.layerCheck}
                  value="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <Typography className={classes.layerCheck}>
                Gender diverse cultures
              </Typography>
          </div>
      </div>
    </Paper>);
}