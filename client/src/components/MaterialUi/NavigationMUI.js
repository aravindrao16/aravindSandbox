import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import Box from "@material-ui/core/Box";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FontIcon from "./Icons/FontIcon";
import { Link } from "react-router-dom";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
//import Link from "@material-ui/core/Link";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import NotificationsIcon from "@material-ui/icons/Notifications";
import { mainListItems, secondaryListItems } from "./listItems";
import {
  faUser,
  faInfoCircle,
  faHome,
  faFileUpload,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
import Avatar from "@material-ui/core/Avatar";
import { resetHome } from "../../redux/actions/index.js";
import LithiaLogo from "./lithia.png";
//import Chart from "./Chart";
//import Deposits from "./Deposits";
//import Orders from "./Orders";

// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar,
  },
  appBar: {
    background: "#515250",
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    background: "#515250",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: "none",
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: "#515250",
    overflowX: "hidden",
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9),
    },
    background: "#515250",
    overflowX: "hidden",
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    overflow: "auto",
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
  },
  fixedHeight: {
    height: 240,
  },
  selectDrawerIcon: {
    borderLeft: "4px",
    borderColor: "#FFFFFF",
    borderLeftStyle: "solid",
    background: "rgba(0,0,0,0.3) !important",
    height: "50px",
  },
  drawerIcon: {
    marginLeft: "4px",
    height: "50px",
  },
  listItemText: {
    display: "flex",
    color: "#FFFFFF",
    fontWeight: 400,
    fontSize: "16px",
    paddingLeft: "0.25rem",
  },
  title: {
    display: "flex",
    fontWeight: 400,
    color: "#FFFFFF",
    fontSize: "16px",
    alignItems: "center",
    paddingLeft: "1rem",
  },
  drawerTitle: {
    fontSize: "16px",
    color: "#FFFFFF",
    display: "flex",
    fontWeight: 400,
    alignItems: "center",
    paddingLeft: "1rem",
  },
}));

const upperDrawerSection = [
  { label: "Home", kind: faHome, to: "/" },
  { label: "Upload", kind: faFileUpload, to: "/uploadFileAndView" },
];

export default function Dashboard(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [paths, setPaths] = React.useState(["/", "/uploadFileAndView"]);
  const [selectedIndex, setSelectionIndex] = React.useState(0);

  // useEffect(() => {
  //   paths.forEach((item, index) => {
  //     if (props.location.pathname.includes("/uploadFileAndView")) {
  //       setSelectionIndex({ selectedIndex: 1 });
  //     } else {
  //       setSelectionIndex({ selectedIndex: 0 });
  //     }
  //   });
  // });

  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleListItemClick = (event, index) => {
    // if (index === 0) {
    //   props.resetHome(true);
    // }
    setSelectionIndex({ selectedIndex: index });
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="absolute"
        className={clsx(classes.appBar, open && classes.appBarShift)}
      >
        <Toolbar className={classes.toolbar}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "left",
              width: "100%",
              height: "65px",
            }}
          >
            {!open ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "34%",
                  height: "60px",
                  alignItems: "center",
                }}
              >
                <div className={classes.title}>Lithia Motors</div>
              </div>
            ) : (
              <div
                styles={{
                  display: "flex",
                  flexDirection: "row",
                  width: "20%",
                  height: "60px",
                  alignItems: "center",
                }}
              />
            )}
            <div
              style={{
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "flex-end",
                paddingRight: "1.5rem",
                paddingLeft: "1rem",
                height: "56px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  borderLeft: "1px solid #ccc",
                }}
              >
                <div
                  style={{
                    paddingRight: "0.75rem",
                    paddingTop: "0.25rem",
                    paddingLeft: "1rem",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <a href="mailto:aravindgone@lithia.com">
                    <FontAwesomeIcon
                      size="lg"
                      icon={faInfoCircle}
                      style={{ color: "#FFFFFF" }}
                    />
                  </a>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  borderLeft: "1px solid #ccc",
                  paddingLeft: "1rem",
                  alignItems: "center",
                }}
              >
                <Avatar>
                  <FontAwesomeIcon
                    size="lg"
                    icon={faUser}
                    style={{ color: "#FFFFFF" }}
                  />
                </Avatar>
                <div
                  style={{
                    paddingLeft: "0.5rem",
                    paddingTop: "0.25rem",
                    fontWeight: 900,
                    color: "#FFFFFF",
                    fontSize: "16px",
                    alignItems: "center",
                  }}
                >
                  Hello! Aravind Gone
                </div>
              </div>
            </div>
          </div>
          {/* <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            //onMouseOver={(e) => handleDrawerOpen}
            //={(e) => handleDrawerClose}
            className={clsx(
              classes.menuButton,
              open && classes.menuButtonHidden
            )}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            noWrap
            className={classes.title}
          >
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
        onMouseOver={handleDrawerOpen}
        onMouseOut={handleDrawerClose}
      >
        <div className={classes.drawerToolbar}>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              width: "34%",
              height: "60px",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* <img
              style={{
                width: "40px",
                height: "40px",
                paddingLeft: "0.25rem",
              }}
              src={LithiaLogo}
            /> */}
            <div className={classes.drawerTitle}>Lithia Motors</div>
          </div>
        </div>
        {/* <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div> */}
        <Divider />
        <List>
          {upperDrawerSection.map((item, index) => {
            return (
              <ListItem
                key={item.label}
                button
                component={Link}
                to={item.to}
                className={
                  selectedIndex === index
                    ? classes.selectDrawerIcon
                    : classes.drawerIcon
                }
                onClick={(event) => handleListItemClick(event, index)}
                selected={selectedIndex === index}
              >
                <ListItemIcon
                  style={{
                    onMouseOver: {
                      boderLeft: "4px",
                      borderLeftStyle: "solid",
                      background: "rgba(0,0,0,0.3) !important",
                    },
                  }}
                >
                  <FontAwesomeIcon
                    size="lg"
                    icon={item.kind}
                    style={{ color: "#FFFFFF" }}
                  />
                  {/* <FontIcon
                    style={{
                      color: `rgba(255,255,255,${item.selected ? "1" : "0.5"})`,
                    }}
                    kind={item.kind}
                  /> */}
                </ListItemIcon>
                <div className={classes.listItemText}>{item.label}</div>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        {/* <List>{secondaryListItems}</List> */}
      </Drawer>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {props.children}
        {/* <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Chart 
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                <Chart />
              </Paper>
            </Grid>
            {/* Recent Deposits
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <Deposits />
              </Paper>
            </Grid>
            {/* Recent Orders
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <Orders />
              </Paper>
            </Grid>
          </Grid>
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container> */}
      </main>
    </div>
  );
}
