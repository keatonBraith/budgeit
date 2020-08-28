import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Transaction = (props) => {
    return ( 
        <div>
            <Link to={`/budget/${props.match.params.monthId}`}>Back to Budget</Link>
        </div>
     );
}
 
const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Transaction);