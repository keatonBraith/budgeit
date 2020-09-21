import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { getMonths } from "../redux/monthReducer";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [months, setMonths] = useState([]);
  const [monthInput, setMonth] = useState("");

  const handleMonthInput = (event) => {
    const { value } = event.target;
    setMonth(value);
  };

  const handleClearInput = (event) => {
    setMonth("");
  };

  const onClick = () => {
    addMonth();
    handleClearInput();
  };

  useEffect(() => {
    axios
      .get(`/api/months/${props.match.params.userId}`)
      .then((res) => {
        setMonths(res.data);
        props.getMonths(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

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
    console.log("this is delete", id);
    axios
      .delete(`/api/month/${id}/${props.userReducer.user.user_id}`)
      .then((res) => {
        setMonths(res.data);
        props.getMonths();
      })
      .catch((err) => console.log(err));
  };

  // console.log(props.user.user_id, props.match.params.userId);

  return (
    <section className="main-dash">
      <h1>Welcome! Select a Budget Month to Work On</h1>
      <div className="budge-container">
        <div className="add-budge">
          <input
            name="budget"
            placeholder="Type budget name here"
            value={monthInput}
            onChange={handleMonthInput}
          />
          <button onClick={onClick}>Add Budget</button>
        </div>
        <div className="budgets">
          {months.map((month, index) => {
            return (
              <div className="individual-budge" key={index}>
                <h3 className="fa fa-line-chart"></h3>
                  <Link className="budge-name" to={`/budget/${month.month_id}`}>
                    <br />
                    {month.name}
                  </Link>
                
                <button
                  className="fa fa-times"
                  onClick={() => deleteMonth(month.month_id)}
                ></button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, { getMonths })(Dashboard);
