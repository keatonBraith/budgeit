import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { getUser, logoutUser } from "../redux/reducer";
import { connect } from "react-redux";


const Nav = (props) => {
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
    <div>
      <nav>
        <div>Logo</div>
  <h3>{
      `email: ${props.user.email}
      id: ${props.user.user_id}`
      }</h3>
        <ul>
          <li>
            <Link to="/dash">Home</Link>
          </li>
          <button onClick={logout}><Link to='/'>Logout</Link></button>
        </ul>
      </nav>
    </div>
  );
};

const mapStateToProps = state => state;

export default connect(mapStateToProps, { logoutUser, getUser })(Nav);
