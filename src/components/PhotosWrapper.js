import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import Pagination from "@material-ui/lab/Pagination";
import { DialogContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  },
  photosContainer: {
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px 0 50px"
  },
  cardRoot: {
    margin: "10px",
    minHeight: 140
  },
  imgContainer: {
    borderRadius: "10px",
    lineHeight: "0",
    width: "300px"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function PhotosWrapper({ photos, getPhotos }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchPhotos = (pageNo = 1) => {
    getPhotos(pageNo);
    if (!open) handleClickOpen();
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => fetchPhotos()}>
        Get Photos
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Photos
            </Typography>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <div className={classes.photosContainer}>
            {photos.isFetching ? (
              <CircularProgress />
            ) : photos.data.length > 0 ? (
              photos.data.map(item => {
                if (item.url_m)
                  return <PhotoWrapper key={item.id} imgSrc={item.url_m} />;

                return null;
              })
            ) : (
              <Typography>No Photos at this location!</Typography>
            )}
          </div>
        </DialogContent>
        {photos.totalPages && (
          <div className="paginationContainer">
            <Pagination
              count={photos.totalPages}
              page={photos.pageNo}
              onChange={(e, pageNo) => fetchPhotos(pageNo)}
            />
          </div>
        )}
      </Dialog>
    </div>
  );
}

function PhotoWrapper({ imgSrc }) {
  const classes = useStyles();

  return (
    <Card className={classes.cardRoot}>
      <div className={classes.imgContainer}>
        <img src={imgSrc} className={classes.img} />
      </div>
    </Card>
  );
}
