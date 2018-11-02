import React, { Component } from 'react';
import MathJax from 'react-mathjax';
import logo from './logo.svg';
import './App.css';
import { contentdb } from './contentdb.js';


function getRandom(min, max) { // Snippet von developer.mozilla.org
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min +1)) + min; 
}


class MathJaxWert extends Component {
  constructor(props) {
    super(props);
    this.state = {hideWert: false};
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  toggleVisible(e) {
    this.setState({hideWert: !this.hideWert ? true : false});
  }

  render() {

    const style = this.state.hideWert ? {display: 'none'} : {};

    return (
      <td style={style}>
        <MathJax.Provider>
          <MathJax.Node formula={this.props.inhalt} />
        </MathJax.Provider>
      </td>
    );
  }
}


class TextWert extends Component {
  constructor(props) {
    super(props);
    this.state = {hideWert: false};
    this.toggleVisible = this.toggleVisible.bind(this);
  }

  toggleVisible(e) {
    this.setState({hideWert: !this.hideWert ? true : false});
  }

  render() {
    return (
      <td>{this.props.inhalt}</td>
    );
  }
}


class Titel extends Component {
  render() {
    return (
      <th>{this.props.name}</th>
    );
  }
}

class Abfragetabelle extends Component {
  constructor(props) {
    super(props);
    this.state = {
                   showGroesse: false,
                   showFZ: false,
                   showEinheit: false
    };
  }

  render() {
    return (
      <table style={{width: "100%"}}>
        <thead>
          <tr><Titel name="Größe" /><Titel name="Formelzeichen" /><Titel name="Einheit / Wert" /></tr>
        </thead>
        <tbody>
          <tr>
            <TextWert inhalt={this.props.data[0]} showMe={this.state.showGroesse} />
            <MathJaxWert inhalt={this.props.data[1]} showMe={this.state.showFZ} />
            <MathJaxWert inhalt={this.props.data[2]} showMe={this.state.showEinheit} />
          </tr>
        </tbody>
      </table>
    );
  }
}


class TopicInput extends Component {
  render() {
    return (
      <form id="themenbereich">
	<fieldset>
		<legend>Themenbereiche auswählen</legend>
		<Checkbox name="basicSI" description="SI-Basiseinheiten" handleChange={this.props.handleChange} />
                <Checkbox name="optics" description="Optik" handleChange={this.props.handleChange} />
	</fieldset>
      </form>
    );
  }
}


class Checkbox extends Component {
  render() {
    return (
      <div className="Checkbox">
        <input type="checkbox" id={this.props.name} name="branch" value={this.props.name} onChange={this.props.handleChange} />
        <label htmlFor={this.props.name}>{this.props.description}</label>
      </div>
    );
  }
}


class RefreshButton extends Component {
  render() {
    return (
      <button className="RefreshButton" onClick={this.props.handleClick}>neue Inhalte laden</button>
    );
  }
}


class App extends Component {
  constructor() {
    super();
    this.state = {currentData: [], topics: []};
    this.refreshData = this.refreshData.bind(this);
    this.chooseTopics = this.chooseTopics.bind(this);
  }

  refreshData() {
    console.log("refreshData invoked");
    var randIndex = getRandom(0, contentdb.length-1);
    this.setState({currentData: (contentdb[randIndex])});
  }

  chooseTopics() {
    console.log("Chosen topics changed");
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Abfragetabelle data={this.state.currentData}/>
        <RefreshButton handleClick={this.refreshData} />
        <TopicInput handleChange={this.chooseTopics} />
      </div>
    );
  }
}

export default App;
