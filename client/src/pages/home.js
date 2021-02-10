import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

const shoppingCart = [
  {
    itemName: "XL T-Shirt",
    itemcode: "TX001",
    itemPrice: 20,
  },
  {
    itemName: "XL T-Shirt",
    itemcode: "TX002",
    itemPrice: 10,
  },
  {
    itemName: "XL T-Shirt",
    itemcode: "EX001",
    itemPrice: 7.5,
  },
];
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      whichState: "FL",
      tax: 0,
      shoppingCart: [
        {
          itemName: "",
          itemcode: "",
          itemPrice: 0,
        },
      ],
    };
  }

  componentDidMount() {
    this.fetchTaxesRates(this.state.whichState);
    this.fetchExceptions();
  }

  fetchTaxesRates = (whichState) => {
    const postObj = {
      type: "taxRates",
      payload: {
        whichState: whichState,
      },
    };
    axios
      .post("/api/getTaxes", postObj)
      .then((response) => {
        console.log("Response", response);
        const tax = response.data;
        this.setState({ tax });
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  fetchExceptions = () => {
    const postObj = {
      type: "taxExceptions",
      payload: {
        whichState: this.state.whichState,
      },
    };
    axios
      .post("/api/getTaxes", postObj)
      .then((response) => {
        console.log("Response", response);
        const exceptions = response.data;
        this.calculateTaxesAndTotalTaxes(exceptions);
      })
      .catch((err) => {
        console.log("Error", err.message);
      });
  };

  calculateTaxesAndTotalTaxes = (exceptions) => {
    const exceptionsArray = exceptions;
    let totalTax = 0;
    shoppingCart.forEach((item) => {
      if (!exceptionsArray.includes(item.itemcode)) {
        totalTax = totalTax + item.itemPrice / this.state.tax;
      }
    });
    this.setState(totalTax);
  };

  render() {
    return (
      <div>
        {`ID: ${this.props.user.id}, Name: ${this.props.user.name}, Email: ${this.props.user.email}`}
      </div>
    );
  }
}

const mstp = (state) => {
  return {
    user: state.user,
  };
};

export default connect(mstp, {})(Home);
