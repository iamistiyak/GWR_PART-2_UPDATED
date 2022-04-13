import "./registerForm.css";
import { useState, useEffect, React } from "react";


function RegistrationForm() {
  const initialValues = { firstname: "", lastname: "", email: "", phoneNo: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  // useEffect(() => {
  //   console.log(formErrors);
  //   if (Object.keys(formErrors).length === 0 && isSubmit) {
  //     console.log(formValues);
  //   }
  // }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const phoneRegex = /^(?:(?:\+|0{0,2})91(\s*|[\-])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;

    if (!values.firstname) {
      errors.firstname = "Firstname is required!";
    }
    if (!values.lastname) {
      errors.lastname = "Lastname is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.phoneNo) {
      errors.phoneNo = "PhoneNo is required";
    } else if (!phoneRegex.test(values.phoneNo)) {
      errors.phoneNo = "This is not a valid phone no format!";
    } 
    return errors;
  };

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
        {Object.keys(formErrors).length === 0 && isSubmit ? (
          <div className="ui message success">Signed in successfully</div>
        ) : (
          <div />
        )}
        <form onSubmit={handleSubmit}>
          <h1>Register for Brushing Teeth Event - Part 2</h1>
          <div className="ui form insideformofparent">
            <div className="parentName">
              <div className="field name firstname">
                <label>First Name</label>
                <input
                  type="text"
                  name="firstname"
                  placeholder="First name"
                  value={formValues.firstname}
                  onChange={handleChange}
                />
                <p>{formErrors.firstname}</p>
              </div>
        
              <div className="field name lastname">
                <label>Last Name</label>
                <input
                  type="text"
                  name="lastname"
                  placeholder="Last name"
                  value={formValues.lastname}
                  onChange={handleChange}
                />
                <p>{formErrors.lastname}</p>
              </div>
            </div>

            <div className="field email">
              <label>Email</label>
              <input
                type="text"
                name="email"
                placeholder="Enter your email address here"
                value={formValues.email}
                onChange={handleChange}
              />
               <p>{formErrors.email}</p>
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
                      value={formValues.phoneNo}
                      onChange={handleChange}
                    />
                  </div>
                  <p>{formErrors.phoneNo}</p>
                </div>
           </div>
           
          </div>
          <button className="">Register me</button>
        </form>
      </div>
    </div>
  );
}

export default RegistrationForm;
