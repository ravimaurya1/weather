import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './components/weather';
import 'weather-icons/css/weather-icons.css';
import Form from './components/form';

const API_key = "81998a525ba3e4ac77882e725c7459b7";

class App extends React.Component{

  calCelsius(temp){
    let celsius = Math.floor(temp-273.15);
    return celsius;
  }

  weatherIcon = {
    ThunderStorm: "wi-thunderstorm",
    Drizzle: "wi-sleet",
    Rain : "wi-storm-shower",
    Snow: "wi-snow",
    Atmosphere: "wi-fog",
    Clear: "wi-day-sunny",
    Clouds: "wi-day-fog"
  };
  
  set_WeatherIcon(rangeId){
    if(rangeId>=200 && rangeId<=232)
    {
      this.setState({icon:this.weatherIcon.ThunderStorm});
    }
    else if(rangeId >=300 && rangeId <=321){
      this.setState({icon:this.weatherIcon.Drizzle});
    }
    else if(rangeId >=600 && rangeId <=622){
      this.setState({icon:this.weatherIcon.Snow});
    }
    else if(rangeId >= 500 && rangeId<=531){
      this.setState({icon:this.weatherIcon.Rain})
    }
    else if(rangeId >= 701 && rangeId <=781){
      this.setState({icon:this.weatherIcon.Atmosphere});
    }
    else if(rangeId === 800){
      this.setState({icon: this.weatherIcon.Clear});
    }
    else if(rangeId >=801 && rangeId <=804){
      this.setState({icon : this.weatherIcon.Clouds})
    }
    else{
      this.setState({icon: this.weatherIcon.Clouds})
    }
  }
  getweather = async(city,country) =>{
    if(city && country)
    {
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`);

    const response = await api_call.json();
    console.log(response);

    this.set_WeatherIcon(response.weather[0].id);

    this.setState({
      city:response.name,
      country:response.sys.country,
      celsius:this.calCelsius(response.main.temp),
      temp_max: this.calCelsius(response.main.temp_max),
      temp_min: this.calCelsius(response.main.temp_min),
      description: response.weather[0].description,
      error:false
    });
  }else{
    this.setState({error:true});
  }
  }


  constructor(props)
  {
    super(props);
    this.state = {
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      celsius:undefined,
      temp_max:undefined,
      temp_min:undefined,
      description:"",
      error:false
    };
  }

  renderweather(){
    return(
      <Weather
         city = {this.state.city} 
         country = {this.state.country}
         temp_celsius = {this.state.celsius}
         temp_max = {this.state.temp_max}
         temp_min = {this.state.temp_min}
         description = {this.state.description}
         icon = {this.state.icon}
         error = {this.props.error}
         />
    );
  }
  render(){
    return (
      <div className = "App">
        <Form weather = {this.getweather} error = {this.state.error}/>
        {this.state.celsius?this.renderweather():null}
      </div>
    );
  }
 
}

export default App;
