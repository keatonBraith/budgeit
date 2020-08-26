import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [months, setMonths] = useState([]);
  const [monthInput, setMonth] = useState("");

  const handleMonthInput = (event) => {
    const { value } = event.target;
    setMonth(value);
  };

  useEffect(() => {
    props.user.user_id === +props.match.params.userId
      ? axios
          .get(`/api/months/${props.match.params.userId}`)
          .then((res) => {
            setMonths(res.data);
          })
          .catch((err) => {
            console.log(err);
          })
      : setMonths([]);
  }, [props.user.user_id, props.match.params.userId]);

  const addMonth = () => {
    axios
      .post(`/api/month/${props.match.params.userId}`, { name: monthInput })
      .then((res) => {
        setMonths(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteMonth = (id) => {
    console.log("this is delete", id)
    axios
      .delete(`/api/month/${id}/${props.user.user_id}`)
      .then((res) => {
        setMonths(res.data);
      })
      .catch((err) => console.log(err));
  };

  // console.log(props.user.user_id, props.match.params.userId);

  return (
    <section>
      <h1>Welcome! Select a Budget Month to Work On</h1>
      <div>
        <div>
          <input
            name="budget"
            placeholder="Add a budget"
            value={monthInput}
            onChange={handleMonthInput}
          />
          <button onClick={addMonth}>Add Budget</button>
        </div>
        {months.map((month, index) => {
          return (
            <div key={index}>
              <h3><Link to={`/budget/${month.month_id}`}>{month.name}</Link></h3>
              <button onClick={() => deleteMonth(month.month_id)}>X</button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps)(Dashboard);
