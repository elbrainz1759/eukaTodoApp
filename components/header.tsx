import React, { useState } from "react";
import Head from "next/head";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import {
  Grid,
  AppBar,
  Toolbar,
  List,
  SwipeableDrawer,
  IconButton,
} from "@material-ui/core";
import useScrollTrigger from "@material-ui/core/useScrollTrigger";

import MenuIcon from "@material-ui/icons/Menu";
import Link from "next/link";
import Image from "next/image";
import ImageLoader from "./../imageLoader";
import eukaLogo from "../images/eukaPayLogo.jpg";

function ElevationScroll(props: any) {
  const { children } = props;

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

const useStyles = makeStyles((theme) => ({
  logo: {
    color: theme.palette.secondary.main,
    width: "max-content",
    fontSize: "1.5rem",
  },
  link: {
    fontSize: "1.25em",
    color: "black",
  },
}));

const Header = () => {
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down("sm"));


  return (
    <>
      <Head>
        <title>EukaPay Todo App</title>
        <meta name="description" content="Todo App for EukaPay" />
        <link rel="icon" href="/eukaLogo.ico" />
      </Head>
      <ElevationScroll>
        <AppBar>
          <Toolbar
            disableGutters
            style={{
              maxWidth: "1280px",
              backgroundColor:"#20418d",
              margin: "0 auto",
              width: "100%",
              padding: matches ? "0 16px" : "24px",
            }}
          >
            <Link href={`/`}>
              <a>
                <Image
                  loader={ImageLoader}
                  unoptimized
                  src={eukaLogo}
                  alt="Euka Logo"
                  width="50"
                  height="50"
                />
              </a>
            </Link>
            <Grid container justifyContent="flex-end" spacing={2}>
        Todo App Home
      </Grid>
          </Toolbar>
        </AppBar>
      </ElevationScroll>

      <div style={{minHeight:"120px"}} />
    </>
  );
};
export default Header;
