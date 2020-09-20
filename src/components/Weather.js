import React, { Component } from "react";
import axios from "axios";

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: "",
      city: "",
    };
    this.getWeather = this.getWeather.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ city: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.getWeather();
  }
  getWeather() {
    axios
      .get(
        "https://api.openweathermap.org/data/2.5/weather?q=" +
          this.state.city +
          "&appid=13a4d4c844498f2d44578d2f68ebbb76&units=metric"
      )
      .then((response) => {
        this.setState({
          weather:
            "Weather in " +
            this.state.city +
            ": " +
            Math.floor(response.data.main.temp) +
            " °С",
        });
      });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
            placeholder="City"
          />
          <br></br>
          <input className="but" type="submit" value="Get" />
        </form>
        <p>{this.state.weather}</p>
      </div>
    );
  }
}
