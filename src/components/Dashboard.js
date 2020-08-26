import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from 'react-redux';

const Dashboard = (props) => {
  const [months, setMonths] = useState([]);

  useEffect(() => {
    props.user.user_id === +props.match.params.userId
    ? axios
      .get(`/api/months/${props.match.params.userId}`)
      .then((res) => {
        setMonths(res.data)
      })
      .catch((err) => {
        console.log(err);
      })
      : setMonths([]);
  }, [props.user.user_id, props.match.params.userId]);

  console.log(props.user.user_id, props.match.params.userId);

  return (
      <section>
          <h1>Welcome! Select a Budget Month to Work On</h1>
          <div>
            {months.map((month, index) => {
              return (
                <div key={index}>
                  <h3>{month.name}</h3>
                </div>
              )
            })}
          </div>
      </section>
  )
};

const mapStateToProps = state => state;

export default connect(mapStateToProps)(Dashboard);
