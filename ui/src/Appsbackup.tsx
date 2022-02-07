import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { Card, CardActionArea, CardMedia, CardContent, Typography, Grid, Box } from "@material-ui/core";
import { makeStyles, createStyles } from "@material-ui/styles";
import custodyImage from "./images/custody.jpg";
import registryImage from "./images/registry.png";
import issuanceImage from "./images/issuance.jpg";
import distributionImage from "./images/network.jpg";
import listingImage from "./images/listing.jpg";
import tradingImage from "./images/trading.jpg";
import Header from "./components/Header/Header";
import { useParty } from "@daml/react";
import { partymap } from "./config";


export default function Apps({ history } : RouteComponentProps) {
  const classes = useStyles();
  const party = useParty();


  return (
    <>
      <Header app="Portal" />
      <Grid container direction="column" className={classes.bg}>
        {/* <OperatorView/> */}
      </Grid>
    </>
  );
}

const useStyles = makeStyles((theme : any) => createStyles({
  root: {
    minWidth: 350,
    maxWidth: 350,
    marginTop: 150,
    backgroundColor: "#275ba1",
    borderRadius: "20px",
    margin:"0 auto",
    //backgroundColor: theme.palette.primary.main, //"#00565f",
    zIndex: 5,
    width:"960px"
  },
  bg: {
    //backgroundColor: "#d1d0d1",
    backgroundColor: "white",
    margin:"0 auto",
    width:"1700px",
    marginTop: "100px"
  },
  media: {
    height: 200,
    //backgroundColor: "#d1d0d1",
    backgroundColor: "white",
    
  },
  cardText: {
    color: "#DFEEEA",
  },
  video: {
    position: 'absolute',
    top: '90%',
    left: '50%',
    width: '100%',
    height: '100%',
    minHeight: '100%',
    WebkitTransform: 'translate(-50%, -50%)',
    MozTransform: 'translate(-50%, -50%)',
    MsTransform: 'translate(-50%, -50%)',
    transform: 'translate(-50%, -50%)',
    display: 'inline-block',
    zIndex: 0,
    //backgroundColor: "#DFEEEA",
    backgroundColor: "white",
    // objectFit: "fill"
  }
}));
