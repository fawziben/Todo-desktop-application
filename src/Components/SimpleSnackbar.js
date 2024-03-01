import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Alert } from '@mui/material';
import { green } from '@mui/material/colors';

export default function SimpleSnackbar(props) {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <React.Fragment>
      <Button color="secondary" size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Button type = {props.type} onClick={handleClick}>{props.value}</Button>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
        message={props.message}
        action={action}
      >
        <Alert
          onClose={handleClose}
          severity= {props.state == true ? "error" : "success"}
          variant="filled"
          sx={{ width: '100%' }}
        >
            {props.message}
        </Alert>
      </Snackbar>
    </div>
  );
}