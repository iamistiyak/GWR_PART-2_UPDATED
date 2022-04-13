import "./registerForm.css";
import { useState, React } from "react";
import axios from 'axios'
import { Component } from "react"

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
    validation_status:true
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
  // initialValues = { firstname: "", lastname: "", email: "", phoneNo: "" };
  // [formValues, setFormValues] = useState(initialValues);
    // [formErrors, setFormErrors] = useState({});
  // [isSubmit, setIsSubmit] = useState(false);

  // handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormValues({ ...formValues, [name]: value });
  // };

  handleSubmit = (e) => {
    e.preventDefault();
    // setFormErrors(validate(formValues));
    // setIsSubmit(true);
    
    // if (isSubmit){
    //   this.setState({formValues: initialValues })
    // }


  //   if(!this.state.name || !this.state.image || !this.state.birthDate){
  //     alert("Name  or URL or Birth-date is empty")
  // }
  // else{
  //   let userData = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, phone: this.state.phone, video_link: this.state.video_link, brushing_status: this.state.brushing_status, gargaling_status: this.state.gargaling_status}
  //   this.addUser(userData)
  //   alert("Register Successfully")
  // }
  let userData = {first_name: this.state.first_name, last_name: this.state.last_name, email: this.state.email, phone: this.state.phone, video_link: this.state.video_link, brushing_status: this.state.brushing_status, gargaling_status: this.state.gargaling_status}
  this.addUser(userData)
  alert("Register Successfully")
  };

 

  validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    if (!values.first_name) {
      errors.first_name = "Firstname is required!";
    }
    if (!values.last_name) {
      errors.last_name = "Lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phone) {
      errors.phone = "PhoneNo is required";
    } else if (!phoneRegex.test(values.phoneNo)) {
      errors.phoneNo = "This is not a valid phone no format!";
    } 
    return errors;
  };

  render(){
    return (
      <div className=" main">
        <div className="logo">
          <img
            src={require("./gwr_logo.png")}
            alt="img"
            className="img-responsive"
            width={"120px"}
            height={"120px"}
          />
        </div>
        <div className="container">
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
                  {/* <p>{formErrors.firstname}</p> */}
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
                  {/* <p>{formErrors.lastname}</p> */}
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
                 {/* <p>{formErrors.email}</p> */}
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
                    {/* <p>{formErrors.phoneNo}</p> */}
                  </div>
             </div>
             
            </div>
            <button className="">Register me</button>
          </form>
        </div>
      </div>
    );
  }
  
  }
  
export default RegistrationForm;
