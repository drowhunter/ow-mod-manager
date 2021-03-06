import React from 'react';
import { LinearProgress, makeStyles } from '@material-ui/core';

import { useAppState } from '../hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    height: theme.spacing(1),
    marginTop: -theme.spacing(1),
    position: 'relative',
    top: theme.spacing(1),
    zIndex: 1,
  },
}));

const LoadingBar: React.FunctionComponent = () => {
  const { loadingCount } = useAppState();
  const styles = useStyles();

  return loadingCount > 0 ? (
    <LinearProgress color="primary" className={styles.root} />
  ) : null;
};

export default LoadingBar;
