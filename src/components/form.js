import React from 'react';
import './formstyle.css';


class Form extends React.Component{
    onsubmit = (e)=>{
        e.preventDefault();
        this.props.weather(e.target.elements.city.value,e.target.elements.country.value);
    };

    error(){
        return (
          <div className = "alert alert-danger mx-5" role = "alert">
              Please Enter City and Country
          </div>  
        );
    }
    render(){
        return (
            <div className = "container h-100">
                <div>{this.props.error?this.error():null}</div>
                <form onSubmit = {this.onsubmit}>
                <div className = "row">
                    <div clasName = "col-md-3 offset-md-2">
                        <input type = "text" className ="form-control " name = "city" 
                        autoComplete  = "off"
                        placeholder ="City"
                        />
                    </div>
                    <div clasName = "col-md-3">
                        <input type = "text" className = "form-control " name = "country" 
                        autoComplete = "off"
                        placeholder = "Country"
                        />
                    </div>
                    <div clasName = "col-md-3 mt-md-0 mt-2 text-md-left">
                        <button className = "btn btn-warning">Get Weather</button>
                    </div>
                </div>
                </form>
            </div>
        );
    }
};

export default Form;