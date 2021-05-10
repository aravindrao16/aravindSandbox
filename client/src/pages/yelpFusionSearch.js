import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import "../stylesSheets/style.css";

// const useStyles = makeStyles({
//   root: {
//     width: '100%',
//   },
//   container: {
//     maxHeight: 440,
//   },
// });

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      typeOfSearch: "ice cream shops",
      location: "Alpharetta",
      businessMetrics: [],
      businessIds: [],
      businessesReviewByName: [],
      rowsPerPage: 10,
      page: 0,
      loading: true,
    };
  }

  componentDidMount() {
    this.getBusinessMetrics();
  }

  getBusinessMetrics = () => {
    const postObj = {
      type: "businessSearch",
      payload: {
        typeOfSearch: this.state.typeOfSearch,
        location: this.state.location,
      },
    };
    axios
      .post("/api/getBusinessMetrics", postObj)
      .then(async (response) => {
        console.log("Response", response.data);
        const businessMetrics = response.data.businesses;
        this.getBusinessDetails(businessMetrics);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  handleChangePage = (event, newPage) => {
    this.setState({ page: newPage });
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({ page: 0, rowsPerPage: +event.target.value });
  };

  getBusinessDetails = (businessMetrics) => {
    let businessIds = [];
    businessMetrics.forEach((bus) => {
      businessIds.push(bus.id);
    });
    console.log("Business Id's", businessIds.length);
    let businessesReviewByName = [];
    if (businessIds.length > 0) {
      console.log("Business case id", businessIds);
      const postObj = {
        type: "review",
        payload: {
          businessId: businessIds,
        },
      };
      axios
        .post("/api/getBusinessMetrics", postObj)
        .then((response) => {
          console.log("Review Response", response.data);
          businessesReviewByName = response.data;
          this.setState({
            businessMetrics,
            businessIds,
            businessesReviewByName,
            loading: false,
          });
          console.log("Business Reviw Name", businessesReviewByName);
        })
        .catch((err) => {
          console.log("Error", err.message);
        });
    }
  };

  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const {
      businessMetrics,
      rowsPerPage,
      page,
      businessesReviewByName,
      loading,
    } = this.state;
    if (loading) {
      return (
        <div className={"loaderStyles"}>
          <CircularProgress />{" "}
        </div>
      );
    }
    const recordsToUse =
      businessMetrics.length > 0
        ? businessMetrics
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  <TableCell
                    key={row.alias}
                    align={"left"}
                    className={"tableBodyCell"}
                  >
                    {row.name}
                  </TableCell>
                  <TableCell
                    key={row.location.address1}
                    align={"left"}
                    className={"tableBodyCell"}
                  >
                    {`${row.location.address1},${row.location.address2}, ${row.location.city}`}
                  </TableCell>
                  <TableCell
                    key={row.review_count}
                    align={"left"}
                    className={"tableBodyCell"}
                  >
                    {this.state.businessesReviewByName.length > 0
                      ? this.state.businessesReviewByName[index]
                      : "N/A"}
                  </TableCell>
                  <TableCell
                    key={row.rating}
                    align={"left"}
                    className={"tableBodyCell"}
                  >
                    {row.rating}
                  </TableCell>
                </TableRow>
              );
            })
        : null;
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          margin: "1px",
          width: "100%",
        }}
      >
        <div className="inputSection">
          <TextField
            required
            id="search_type"
            label="Search Type"
            name="typeOfSearch"
            value={this.state.typeOfSearch}
            onChange={this.handleChange}
            className="textBox"
          />
          <TextField
            required
            id="location"
            label="Location(City)"
            name="location"
            value={this.state.location}
            onChange={this.handleChange}
            className="textBox"
          />
        </div>
        <Paper className="root">
          <TableContainer className="container">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    key={"Business Name"}
                    align={"left"}
                    className={"tableHeaderCell"}
                  >
                    {"Business Name"}
                  </TableCell>
                  <TableCell
                    key={"Business Address"}
                    align={"left"}
                    className={"tableHeaderCell"}
                  >
                    {"Business Address"}
                  </TableCell>
                  <TableCell
                    key={"Reviewed By"}
                    align={"left"}
                    className={"tableHeaderCell"}
                  >
                    {"Reviewed Provided By"}
                  </TableCell>
                  <TableCell
                    key={"Rating"}
                    align={"left"}
                    className={"tableHeaderCell"}
                  >
                    {"Rating"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{recordsToUse}</TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={businessMetrics.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mstp, {})(Search);
