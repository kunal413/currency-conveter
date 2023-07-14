import React from "react";
import { Link } from "react-router-dom";
import Currency from "./Currency";
import DownloadExcel from './DownloadExcel'
import FatchData from "./FatchData";

export default () => (
  <div className="vw-300 vh-300 primary-color d-flex align-items-center justify-content-center" style={{ backgroundColor: '#f5f5f5' }}>
    <div className="jumbotron jumbotron-fluid bg-transparent">
      <div className="container secondary-color">
        <h1 className="display-4">Revolutionize Your Currency Exchange Experience with Our Cutting-Edge App!</h1>
        <p className="lead">
         Currency converter & Exchange Money
        </p>
          
        <hr className="my-4" />
        <br />
         <Currency></Currency>
         <br />

        {/* <Link
          to="/"
          className="btn btn-lg custom-button"
          role="button"
        >
          GO For Currency Converter
        </Link> */}
        <DownloadExcel></DownloadExcel>
        <FatchData/>
      </div>
      
    </div>
  </div>
);
 