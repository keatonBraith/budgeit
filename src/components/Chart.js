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
            "#80ffaa",
            "#80d4ff",
            "#cc99ff",
            "#b3ffff",
            "#ffff99",
          ],
          hoverBackgroundColor: [
            "#4dff88",
            "#4dc3ff",
            "#b366ff",
            "#80ffff",
            "#ffff66",
          ],
          data: [65, 59, 80, 81, 56],
        },
      ],
    };
  }

  componentDidMount() {
    console.log(this.props.chartInfo);
    let tempLabels = this.props.chartInfo.map((data) => data.name);
    let tempData = this.props.chartInfo.map((data) => data.sum);
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
          style="height: 200px; width: 200px;"
          options={{
            title: {
              display: true,
              text: "Budget Breakdown",
              fontSize: 30,
              fontFamily: 'Zilla Slab',
            },
            legend: {
              display: true,
              position: "top",
              fontFamily: 'Zilla Slab',
              labels: {
                boxWidth: 10,
              },
            },
            responsive: true,
            maintainAspectRatio: false,
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
