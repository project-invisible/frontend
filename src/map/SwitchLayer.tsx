import React,  { useState, useEffect, useRef } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Checkbox } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getSelectedLayerData } from './SwitchLayerReducer.ts';
import { useSelector } from 'react-redux';
import { LatLngExpression } from 'leaflet';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
      root: {
          height: '100px',
          width: '300px',
      }
  }),
);

export default function SwitchLayer() {
  const classes = useStyles({});
  const [test1Checked, setTest1Checked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTest1Checked(event.target.checked);
    dispatch(getSelectedLayerData(event.target.checked));
  };

  const markers: Array<LatLngExpression> = useSelector(state => state.switchLayerStore.mapMarker);
  
  useEffect(() => {
    console.log({markers});
  });
  

  return (<Paper className={classes.root}>
      <div>
          <div>
          <Checkbox
                checked={test1Checked}
                onChange={handleChange}
                value="primary"
                inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </div>
      </div>
    </Paper>);
}