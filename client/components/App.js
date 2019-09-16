import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Add from './Add';
import Update from './Update';
import Delete from './Delete';
import { Tab, Tabs } from 'react-bootstrap';
import YearTabsRouter from './tabs/yearTabsRouter';
import MonthTabs from './tabs/monthTabs';
import BudgetGauge from './BudgetGauge';
export default class App extends React.Component {
constructor() {
    super();
  this.state = {selectedMonth:'All', selectedYear: 2016, data: [], activeTab:2016,
  budget:1000, monthsum: 0, display_name: 'none'};
    this.getData = this.getData.bind(this);
    this.updateInputValue = this.updateInputValue.bind(this);
  }
componentWillReceiveProps(nextProps) {
    if(nextProps.history.location.search){
    var search = nextProps.history.location.search;
    search = search.substring(1);
    var searchObj = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    this.setState({activeTab: parseInt(searchObj.year)});
    this.setState({selectedYear: searchObj.year});
    this.setState({selectedMonth: searchObj.month});
this.getData(this, searchObj.year, searchObj.month);
  }else{
      this.getData(this, 2016, 'All');
    }
  }
componentDidMount(){
    this.getData(this, 2016, 'All');
  }
handleSelect(selectedTab) {
     this.setState({
       activeTab: selectedTab,
       selectedYear: selectedTab
     });
  }
getData(ev, year, month){
    axios.get('/getAll?month='+month+'&year='+year)
      .then(function(response) {
        ev.setState({data: response.data});
        ev.setState({selectedYear: parseInt(year)});
        ev.setState({selectedMonth: month});
        var sum = 0;
        response.data.map((exp)=>{
          sum += exp.amount;
        });
        ev.setState({monthsum: sum});
      });
}
updateInputValue(env) {
    this.setState({
      budget: env.target.value
    });
    // console.log('budget', this.state.budget)
  }
render() {
    return (
        <div style={{background: '#ffffff'}}>
        <Tabs activeKey={this.state.activeTab} onSelect={this.handleSelect}>
          <Tab eventKey={2016} title={<YearTabsRouter year='2016' />}><MonthTabs year='2016' monthlyActiveTab={this.state.selectedMonth}/></Tab>
          <Tab eventKey={2017} title={<YearTabsRouter year='2017' />}><MonthTabs year='2017' monthlyActiveTab={this.state.selectedMonth}/></Tab>
          <Tab eventKey={2018} title={<YearTabsRouter year='2018'/>}><MonthTabs year='2018' monthlyActiveTab={this.state.selectedMonth}/></Tab>
          <Tab eventKey={2019} title={<YearTabsRouter year='2019'/>}><MonthTabs year='2019' monthlyActiveTab={this.state.selectedMonth}/></Tab>
          <Tab eventKey={2020} title={<YearTabsRouter year='2020'/>}><MonthTabs year='2020' monthlyActiveTab={this.state.selectedMonth}/></Tab>
        </Tabs>


        <center>
    <BudgetGauge mybudget={this.state.budget} mymonthsum={this.state.monthsum}/>
    </center>
    <div class="labels">
        <label>Spent<br/> ${this.state.monthsum} </label>        <label> Budget<br/>        <input type='number' placeholder='$1000' onChange={this.updateInputValue} />
</label>
</div>
<div><center>
<Add selectedMonth={this.state.selectedMonth} selectedYear={this.state.selectedYear} /></center>
</div>

        <table style={{background: '#ffffff'}}>
          <thead>
            <tr><th className='desc-col'>Desc</th><th className='button-col money'>$</th><th className='button-col'>Month</th><th className='button-col'></th><th className='button-col'></th></tr>
          </thead>
          <tbody>
            {
              this.state.data.map((exp) => {
        return  <tr><td className='desc-col'>{exp.description}</td><td className='button-col money'>{exp.amount}</td><td className='button-col'>{exp.month} {exp.year}</td><td className='button-col update-col'><Update expense={exp}/></td><td className='button-col'><Delete expense={exp} /></td></tr>
              })
            }
          </tbody>
        </table>
      </div>
    );
  }
}
