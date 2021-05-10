import React, { Component } from "react";
import axios from "axios";
import moment from "moment";

class uploadFiles extends Component {
  state = {
    currentPage: 0,
    rowsPerPage: 10,
    fileToUse: {},
    attachmentsDate: [],
    startDate: moment(Date.now()),
    endDate: moment(Date.now()).subtract(29, "days"),
  };

  componentDidMount() {
    this.fetchAllAttachments();
  }

  fetchAllAttachments = () => {
    const postObject = {
      type: "getAllAttachments",
      payload: {
        START_DATE: this.state.startDate,
        END_DATE: this.state.endDate,
      },
    };
    axios.post("/api/getDetails", postObject).then((result) => {
      const attachmentsDate = result.data;
      this.setState({ attachmentsDate });
    });
  };

  submitFile = (e) => {
    const fileToUse = this.state.fileToUse;
    let image = new FormData();
    image.append("image", fileToUse);
    const config = {
      headers: {
        "content-type": "multipart/form-data",
      },
    };
    image.append("modifiedByName", "Aravind");
    image.append("modifiedByEmail", "AravindGone@lithia.com");
    image.append("attachmentName", "attachment");
    axios
      .post("/api/insertFile", image, config)
      .then((response) => {
        console.log("Response", response);
      })
      .catch((error) => {
        console.log("Error", error.message);
      });
  };

  render() {
    return <div>Upload Files</div>;
  }
}

export default uploadFiles;
