import React, { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUser, logoutUser } from "../redux/reducer";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

const Nav = (props) => {
  useEffect(() => {
    props.getUser();
  }, []);

  const logout = () => {
    axios
      .delete("/auth/logout")
      .then((res) => {
        props.logoutUser();
        props.history.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="nav-main">
      <nav>
        <img src="logo1.png"/>
        <ul>
          <li>
            <Link to={`/dash/${props.userReducer.user.user_id}`}>Home</Link>
          </li>
          <button onClick={logout}>
            <Link to="/">Logout</Link>
          </button>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { logoutUser, getUser })(withRouter(Nav));
