import '../Supports/Stylesheets/Forgot.css';
import {  Navigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import Axios from "axios";
import { useEffect, useState } from "react";
import Forgot1 from './../Supports/Images/Forgot1.png';
import Forgot3 from '../Supports/Images/Forgot3.png';
import React from 'react';

function ResetPassword() {
  let params = useParams();
  console.log('ini params', params)
  const [data, setData] = useState([]);
  console.log('ini data', data)
  console.log('ini params.token',params.token)
  //State for input values
  let [inputValues, setInputValues] = useState({ password: "" });

  //State for handling validation error
  let [errors, setErrors] = useState({});

  //State to indicate wether form is submitting or not
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [submitLoading, setSubmitLoading] = useState(false);

  //State to handling success/error message from backend
  let [resMessage, setResMessage] = useState({ success: "", error: "" });

  //Function for onChange in input form
  const inputHandler = (e) => {
    //Save input value to state
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });

    //Reset alert from backend
    if (resMessage.error) {
      setResMessage({ ...resMessage, error: "" });
    }
  };

  const [inVisible, setInVisible] = React.useState({
    type: "password",
    title: "Show"
  });

  const handleVisible = () => {
    if (inVisible.type == "password") {
        setInVisible({
            type: "text",
            title: "Hide"
        })
    } else {
        setInVisible({
            type: "password",
            title: "Show"
        })
    }
  }

  //Function to save validate info
  const validateInfo = (values) => {
    let errors = {};

    if (!values.password) {
      errors.password = "Please insert your password";
    } else if (!values.password.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}")) {
      errors.password =  "Password must contain at least 8 characters, and a mix of symbols, numbers and uppercase & lowercase letters";
    }

    return errors;
  };

  

  //Function when submitting form
  const submitHandler = (e) => {
    e.preventDefault();

    setErrors(validateInfo(inputValues)); //trigger state to display validation alert
    setIsSubmitting(true);
  };

  //Function
  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setSubmitLoading(true);
        console.log('ini params.token',params.token)
       var data = {
        password: inputValues.password
        }
      
        Axios.patch('http://localhost:5000/user/resetpassword', data, {headers: {
          'Authorization': params.token,
          'Accept' : 'application/json',
          'Content-Type': 'application/json'
      }})
      .then((res) => {
        setSubmitLoading(false);
        if (res.data.errMessage) {
          setResMessage({ ...resMessage, error: res.data.errMessage });
        } else {
          setIsSubmitted(true);
          // setData(res.data.result3);
          // console.log('res.data.result3 reset', res.data.result3)
          setResMessage({ success: res.data.message });
        }
      
      }).catch((err) => {
        console.log(err)
        setResMessage({
          ...resMessage,
          error: "Server error, please try again later",
        });
      })

    }
  }, [errors]);

    useEffect(() => {
      Axios.get('http://localhost:5000/user/gettoken', {headers: {
        'Authorization': params.token,
        'Accept' : 'application/json',
        'Content-Type': 'application/json'
    }})
    .then((res) => {
      setData(res.data.result3[0])
      console.log('token', res.data.result3[0])
    }).catch((err) => {
      console.log(err)

    })
    }, []);

    // return(
    //   <div>
    //     {
    //       params.token !== data.token ?
    //       <span>salah</span>
    //       :
    //       <span>benar</span>
    //     }
    //   </div>
    // )

  if(params.token !== data.token ){
    return(
      <div className='container-fluid my-universe-background-home' id="my-universe-background-con">
      <div className='pt-3'>     
           <div className='container'>
              <div className='row' style={{paddingBottom: '13px'}}>
                  <div className="col-6">
                      <div className="d-none d-md-block">
                          <img src={Forgot1} alt="" width="100%" />
                      </div>
                  </div>
                  <div className="col-6" style={{fontFamily: "Source Sans Pro"}}>
                      <div className='text-center mt-5'>
                      <h3 style={{paddingTop: '100px', fontSize: '40px'}}></h3>
                               <h3 style={{fontSize: '40px'}}  className='pb-3' id='my-universe-navbar-logo' >
                                  myUniverse
                              </h3>
                          <p style={{fontSize: '20px'}}>
                              Can't reach your token because it's already expired
                          </p>
                          <p style={{fontSize: '20px'}}>
                          Please send new email or
                          </p>
                          <b>
                          <Link to="/login" style={{cursor: 'pointer', textDecoration: 'none', color: 'purple'}}>
                          <u>
                              Click here to Login
                          </u>
                          </Link>
                          </b>
                          <br></br>
                          <i style={{color:'purple'}}>
                            
                          </i>
                      </div>
                  </div>
              </div>
          </div> 
      </div>
  </div>
  )
  }else{
    return (
      <>
      <div className='container-fluid my-universe-background-for'>
        <div className='pt-3'>
          <div className='container' style={{paddingBottom: '13px'}}>
              <div className='row'>
                <div className='col-lg-6 col-md-6 col-none'>
                  <img src={Forgot3} alt="" width="100%"/>
                </div>  
                <div className='col-lg-6 col-md-6 col-12' style={{fontFamily: "Source Sans Pro"}}>
                    <div className="d-flex flex-column pt-5" style={{marginTop: '100px'}}>
                      <h1 className="mb-4 ml-3 fw-bold">Reset Password</h1>
                      <form 
                      onSubmit={submitHandler} noValidate
                      >
                        <div className="mb-3 d-flex flex-column" style={{fontFamily: "Source Sans Pro"}}>
                          <label htmlFor="form-password" className="form-label ml-5 pl-4" style={{fontSize: '20px'}}>
                          New Password
                          </label>
                          <div className='d-flex rounded' style={{border: '1px solid grey', width: '300px'}}>
                          <input
                            id="form-password"
                            type={inVisible.type} 
                            className={`form-control ${errors.password ? `is-invalid` : null}`}
                            placeholder="Password"
                            name="password"
                            value={inputValues.password}
                            style={{rounded: '0', border: '0', background: 'white'}}
                            onChange={inputHandler}
                            required
                          />
                            <span style={{rounded: '0', cursor: 'pointer', border: '0', background: 'white', color: 'purple'}} className='input-group-text' onClick={handleVisible}>{inVisible.title}</span>
                          </div>
                          {errors.password && <div className="text-danger"  style={{fontFamily: "Source Sans Pro", fontSize: '14px'}}>{errors.password}</div>}
                        </div>
                        <div className="mb-4 container-fluid p-0"></div>
                        <input
                          type="submit"
                          value="Send"
                          style={{fontFamily: "Source Sans Pro"}}
                          id='my-universe-btn-pass'
                          className="btn btn-primary btn-send py-2 container-fluid mb-3"
                        />
                      </form>
                      {submitLoading && (
                        <div
                          className="alert alert-secondary mt-3 d-flex justify-content-center pt-3 pb-1"
                          role="alert"
                        >
                          <div className="spinner-border me-1" role="status">
                            <span className="visually-hidden">Loading...</span>
                          </div>
                          <p>Submitting...</p>
                        </div>
                      )}
                      {resMessage.success && (
                        <div className="alert alert-success mt-3" role="alert">
                          {resMessage.success}
                        </div>
                      )}
                      {resMessage.error ? (
                        <div className="alert alert-danger mt-3" role="alert">
                          {resMessage.error}
                        </div>
                      ) : null}
                      <div className="mb-3">
                        <Link to='/login' style={{cursor: 'pointer', textDecoration: 'none', color: 'purple'}}>
                          click here to continue
                        </Link>
                      </div>
                    </div>
                </div>          
              </div>
          </div> 
        </div>
      </div>
      </>
    );
  }

  
}

export default ResetPassword;