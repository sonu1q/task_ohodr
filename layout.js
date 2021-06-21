import React from "react";
import Sidebar from "../sidebar/sidebar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Layout extends React.Component {
  render() {
    return (
      <>
        <ToastContainer />
        <div className="layout-container">
          <Sidebar page={this.props.page} />
          <div className="page-container">{this.props.children}</div>
        </div>
      </>
    );
  }
}

export default Layout;
