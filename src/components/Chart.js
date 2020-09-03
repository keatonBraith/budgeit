import React, { Component } from "react";
import "../scss/style.css";
import { Pie } from "react-chartjs-2";
import { connect } from "react-redux";

class Chart extends Component {
  constructor() {
    super();
    this.state = {
      labels: ["Pig", "Chicken", "Cow", "Fish", "Goat"],
      datasets: [
        {
          label: "Count",
          backgroundColor: [
            "#B21F00",
            "#C9DE00",
            "#2FDE00",
            "#00A6B4",
            "#6800B4",
          ],
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
          ],
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
  }

  componentDidMount() {
    console.log(this.props.chartInfo);
    let tempLabels = this.props.chartInfo.map((data) => data.title);
    let tempData = this.props.chartInfo.map((data) => data.value);
    this.setState({
      labels: tempLabels,
      datasets: [{ ...this.state.datasets[0], data: tempData }],
    });
    console.log(this.state);
  }

  render() {
    return (
      <div className="pie-chart">
        <Pie
          data={this.state}
          options={{
            title: {
              display: true,
              text: "Budget Breakdown",
              fontSize: 20,
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                boxWidth: 10,
              },
            },
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps, {})(Chart);
