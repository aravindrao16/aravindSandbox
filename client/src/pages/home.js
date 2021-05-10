import React, { Component } from "react";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import axios from "axios";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import CircularProgress from "@material-ui/core/CircularProgress";
//import "../stylesSheets/style.css";

const styles = (theme) => ({
  root: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //border: "1px solid red",
    margin: "1rem",
    width: "95vw",
    height: "95vh",
  },
  container: {
    height: "90vh",
    width: "50%",
    margin: "0.25rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    //border: "1px solid green",
  },
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeData: [],
      loading: true,
    };
  }

  componentDidMount() {
    axios
      .get("/api/getEmployees")
      .then((result) => {
        console.log("Result", result.data);
        const employeeDataObj = result.data.data;
        const employeeData = [];
        employeeData.push(employeeDataObj);
        this.setState({ employeeData, loading: false });
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  }

  render() {
    const { classes } = this.props;
    const { employeeData, loading } = this.state;
    console.log("Employee Dat", employeeData);
    if (loading) {
      return (
        <div className={"loaderStyles"}>
          <CircularProgress />{" "}
        </div>
      );
    }
    const recordsToUse =
      employeeData.length > 0
        ? employeeData.map((row, index) => {
            return (
              <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                <TableCell
                  key={row.id}
                  align={"left"}
                  className={"tableBodyCell"}
                >
                  {row.id}
                </TableCell>
                <TableCell
                  key={row.employee_name}
                  align={"left"}
                  className={"tableBodyCell"}
                >
                  {row.employee_name}
                </TableCell>
                <TableCell
                  key={row.employee_salary}
                  align={"left"}
                  className={"tableBodyCell"}
                >
                  {row.employee_salary}
                </TableCell>
                <TableCell
                  key={row.employee_age}
                  align={"left"}
                  className={"tableBodyCell"}
                >
                  {row.employee_age}
                </TableCell>
              </TableRow>
            );
          })
        : null;
    return (
      <div className={classes.root}>
        <Paper className="root">
          <TableContainer className="container">
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell
                    key={"id"}
                    align={"left"}
                    className={"tableHeaderCell"}
                  >
                    {"Employee Id"}
                  </TableCell>
                  <TableCell
                    key={"employee_name"}
                    align={"left"}
                    className={"tableHeaderCell"}
                  >
                    {"Employee Name"}
                  </TableCell>
                  <TableCell
                    key={"employee_salary"}
                    align={"left"}
                    className={"tableHeaderCell"}
                  >
                    {"Employee Salary"}
                  </TableCell>
                  <TableCell
                    key={"employee_age"}
                    align={"left"}
                    className={"tableHeaderCell"}
                  >
                    {"Employee Age"}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>{recordsToUse}</TableBody>
            </Table>
          </TableContainer>
          {/* <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={businessMetrics.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={this.handleChangePage}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          /> */}
        </Paper>
        {/* <div className={classes.container}>Home</div>
        <div className={classes.container}>Container</div> */}
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mstp, {})(withStyles(styles, { withTheme: true })(Home));
