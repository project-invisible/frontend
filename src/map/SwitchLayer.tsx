import React,  { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Checkbox, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { getSelectedLayerData } from './SwitchLayerReducer.ts';
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
  const [uniChecked, setUniChecked] = useState<boolean>(false);
  const dispatch = useDispatch();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUniChecked(event.target.checked);
    dispatch(getSelectedLayerData(event.target.checked));
  };

  const markers: Array<LatLngExpression> = useSelector(state => state.switchLayerStore.mapMarker);

  return (<Paper className={classes.root}>
      <div>
          <div className={classes.layerContainer}>
            <Checkbox
                  checked={uniChecked}
                  onChange={handleChange}
                  className={classes.layerCheck}
                  value="primary"
                  inputProps={{ 'aria-label': 'primary checkbox' }}
              />
              <Typography className={classes.layerCheck}>
                Higher education institutions
              </Typography>
          </div>
      </div>
    </Paper>);
}