import RegistrationForm from "./mycomponents/form/registerForm";
import Timeline from "./mycomponents/timeline/timeline"
import Recording from "./mycomponents/recording/recording"
// import IndexRecording from "./mycomponents/recording/index_recorder"
//  import RecTest from "./mycomponents/recording/rec_test"

import React, { Component } from 'react'

import { BrowserRouter, Route, Routes } from 'react-router-dom'

class  App extends Component{
  render(){
    return (
     <BrowserRouter>
      <Routes>
        <Route path="/" element={<RegistrationForm/>}/>
        <Route path="/timeline" element={<Timeline/>}/>
        <Route path="/recording" element={<Recording/>}/>
      </Routes>
      </BrowserRouter> 

    );} 
}

export default App;









