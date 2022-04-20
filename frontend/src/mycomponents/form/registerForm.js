import {React} from "react";
import axios from 'axios'
import { Component } from "react"
import "./registerForm.css";
// import Timeline from "../timeline/timeline"

const ai = axios.create({
  baseURL:'http://0.0.0.0:8000/'

})

class RegistrationForm extends Component {

  state = {
    first_name: "",
    last_name:"",
    email:"",
    phone:"",
    video_link:"",
    brushing_status:false,
    gargaling_status:false,
    validation_status:true,
    
    errors:{}
  } 

  handleChangeFirstName = e => {
    this.setState({ first_name: e.target.value})
  }
  handleChangeLastName = e => {
    this.setState({ last_name: e.target.value})
  }
  handleChangeEmail = e => {
    this.setState({ email: e.target.value})
  }
  handleChangePhone = e => {
    this.setState({ phone: e.target.value})
  }

  addUser = (data)=>{
    ai.post('user/', data)
    .then((res)=>{
        this.setState({first_name: '', last_name: "", email: '',phone: "",video_link: "",brushing_status: false,gargaling_status: false,validation_status: true,})
    })
  }

  formValidation = ()=>{
    const {first_name, last_name, email, phone} = this.state;
    let isValid = true;
    const errors={};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*|[-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    if(!first_name.trim()){
      errors.firstNameLength = "First name is required!";
      isValid = false;
    }
    if (!last_name.trim()) {
      errors.lastNameLength = "Lastname is required!";
      isValid = false;
    }
    if (!email.trim()) {
      errors.emailLength = "Email is required!";
      isValid = false;
    }else if (!regex.test(email.trim())) {
      errors.emailLength = "This is not a valid email format!";
      isValid = false;
    }
   if (!phone.trim()) {
      errors.phoneFormat = "PhoneNo is required";
      isValid = false;
    } 
    else if (!phoneRegex.test(phone.trim())) {
      errors.phoneFormat = "Phone number is not a valid!";
      isValid = false;
    } 
    this.setState({errors});
    return isValid;
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const isvalid = this.formValidation();
    
    //--------------------------------Insert data in data base-----------------------------------
    if(isvalid){
      let userData = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, phone: this.state.phone, video_link: this.state.video_link, brushing_status: this.state.brushing_status, gargaling_status: this.state.gargaling_status}
      this.addUser(userData)
      alert("Register Successfully")  
      window.location = '/timeline';
    }
};

  render(){
    const {errors} = this.state;
    return (
      <div className=" main">
        <div className="registerLogo">
          <img
            src={require("../image/gwr_logo.png")}
            alt="img"
            className="img-responsive"
            width={"120px"}
            height={"120px"}
          />
        </div>
        <div className="registerContainer">
          <form onSubmit={this.handleSubmit}>
            <h1>Register for Brushing Teeth Event - Part 2</h1>
            <div className="ui form insideformofparent">
              <div className="parentName">
                <div className="field name firstname">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstname"
                    placeholder="First name"
                    value={this.state.first_name} 
                    onChange={this.handleChangeFirstName}
                  />
                  <p className="errorMessage1">{errors.firstNameLength}</p>
                </div>
          
                <div className="field name lastname">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastname"
                    placeholder="Last name"
                    value={this.state.last_name} 
                    onChange={this.handleChangeLastName}
                  />
                  <p className="errorMessage1">{errors.lastNameLength}</p>
                </div>
              </div>
  
              <div className="field email">
                <label>Email</label>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email address here"
                  value={this.state.email}                  
                   onChange={this.handleChangeEmail}
                />
                 <p className="errorMessage1">{errors.emailLength}</p>
              </div>
  
             <div className="parentPhone">
                <div className="dropdown">
                <label className="phoneLabel">Phone number</label>
                <select name="countryCode" id="countryCode">
                  <option value="+91">+91</option>
                  <option value="+93">+93</option>
                  <option value="+975">+975</option>
                  <option value="+1">+1</option>
                </select>
                </div>
                <div className="field phone">
                    <div>
                      <input
                        type="tel"
                        name="phoneNo"
                        placeholder="Enter your phone number here"
                        value={this.state.phone } 
                        onChange={this.handleChangePhone}
                      />
                    </div>
                    <p className="errorMessage1">{errors.phoneFormat}</p>
                  </div>
             </div>
             
            </div>
            <button className="registerButton">Register</button>
          </form>
        </div>
      </div>
    );
  }
  }
  
export default RegistrationForm;
