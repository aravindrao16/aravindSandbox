import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import FontIcon from "./Icons/FontIcon";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import LithiaLogo from "./lithia.png";
import BackgroundImage from "./background.png";
import { faUser, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { FontAwesomeIcon } from "@fontawesome/react-fontawesome";
import Avatar from "@material-ui/core/Avatar";
import { resetHome } from "../../redux/actions/index.js";

const drawerWidth = 430;

const styles = (theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    height: "56px",
    backgroundColor: "#FFFFFF",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.ytransitions.easing.sharp,
      duration: theme.tarnsition.duartion.leavingScreen,
    }),
  },
  appBarShift: {
    height: "56px",
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.ytransitions.easing.sharp,
      duration: theme.tarnsition.duartion.leavingScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    backgroundColor: "#008394",
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    zIndex: 2,
    width: drawerWidth,
    backgroundColor: "#515250",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.ytransitions.easing.sharp,
      duration: theme.tarnsition.duartion.leavingScreen,
    }),
    overflowX: "hidden",
    animationDelay: "2s",
  },
  drawerClose: {
    backgroundColor: "#515250",
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.ytransitions.easing.sharp,
      duration: theme.tarnsition.duartion.leavingScreen,
    }),
    overflowX: "hidden",
    width: "60px",
    [theme.breakpoints.up("sm")]: {
      width: "60px",
    },
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
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    height: theme.spacing.unit * 7,
  },
  drawerToolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: "0 8px",
    height: theme.spacing.unit * 7,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    background: `url(${BackgroundImage})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundAttachment: "fixed",
    width: "90vw",
    height: "100vh",
  },
  title: {
    display: "flex",
    fontWeight: 400,
    color: "#51525D",
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
  listItemText: {
    display: "flex",
    color: "#FFFFFF",
    fontWeight: 400,
    fontSize: "16px",
    paddingLeft: "0.25rem",
  },
});

let upperDrawerSection = [];

let adminDrawerSection = [
  { label: "Home", kind: "home", to: "/" },
  { label: "Home", kind: "publish", to: "/uploadFileAndView" },
];

class MiniDrawer extends React.Component {
  state = {
    open: false,
    value: 0,
    anchorEl: null,
    selectedIndex: 0,
    paths: ["/", "/uploadFileAndView"],
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  componentDidMount() {
    this.state.paths.forEach((item, index) => {
      if (this.props.location.pathname.includes("/uploadFileAndView")) {
        this.setState({ selectedIndex: 1 });
      } else {
        this.setState({ selectedIndex: 0 });
      }
    });
  }

  promptForCredentials = () => {
    if (this.props.user.name === "") {
      if (this.props.location.pathname !== "/credentials") {
        this.props.history.push("/credentials");
      }
    }
  };

  handleListItemClick = (event, index) => {
    if (index === 0) {
      this.props.resetHome(true);
    }
    this.setState({ selectedIndex: index });
  };

  render() {
    const { classes, theme } = this.props;
    const { anchorEl } = this.state;

    upperDrawerSection = adminDrawerSection;

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          color="#51525D"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: this.state.open,
          })}
        >
          <Toolbar disableGutters={!this.state.open}>
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
              {!this.state.open ? (
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
                        style={{ color: "#51525D" }}
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
                      style={{ color: "#51525D" }}
                    />
                  </Avatar>
                  <div
                    style={{
                      paddingLeft: "0.5rem",
                      paddingTop: "0.25rem",
                      fontWeight: 900,
                      color: "#51525D",
                      fontSize: "16px",
                      alignItems: "center",
                    }}
                  >
                    Hello! Aravind Gone
                  </div>
                </div>
              </div>
            </div>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={classNames(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open,
          })}
          classes={{
            paper: classNames({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open,
            }),
          }}
          onMouseOver={this.handleDrawerOpen}
          onMouseOut={this.handleDrawerClose}
          open={this.state.open}
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
              <img
                style={{
                  width: "40px",
                  height: "40px",
                  paddingLeft: "0.25rem",
                }}
                src={LithiaLogo}
              />
              <div className={classes.drawerTitle}>Lithia Motors</div>
            </div>
          </div>
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
                    this.state.selectedIndex === index
                      ? classes.selectDrawerIcon
                      : classes.drawerIcon
                  }
                  onClick={(event) => this.handleListItemClick(event, index)}
                  selected={this.state.selectedIndex === index}
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
                    <FontIcon
                      style={{
                        color: `rgba(255,255,255,${
                          item.selected ? "1" : "0.5"
                        })`,
                      }}
                      kind={item.kind}
                    />
                  </ListItemIcon>
                  <div className={classes.listItemText}>{item.label}</div>
                </ListItem>
              );
            })}
          </List>
          <Divider />
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

MiniDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, { resetHome })(
  withRouter(withStyles(styles, { withTheme: true }))(MiniDrawer)
);
