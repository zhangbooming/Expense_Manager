import React from "react";
import Chart from "react-google-charts";

const options = {
  width: 375,
  height: 375,
  redFrom: 90,
  redTo: 100,
  yellowFrom: 75,
  yellowTo: 90,
  minorTicks: 5
};

class BudgetGauge extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      budget: props.mybudget,
      monthsum: props.mymonthsum
    }
  }

  getData(){
    var mymonthsum = this.props.mymonthsum;
    var mybudget = this.props.mybudget;
    var ratio = (mymonthsum/mybudget)*100;
    return [['Label', 'Value'],["", ratio]];
  }

  render() {
    return (
      <div style={{}}>
        <Chart
          chartType="Gauge"
          width="375px"
          height="375px"
          data={this.getData()}
          options={options}
        />
      </div>
    );
  }
}

export default BudgetGauge;
