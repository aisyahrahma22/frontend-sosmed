import { API_URL } from '../Supports/Helpers/index';
import '../Supports/Stylesheets/Forgot.css';
import { Navigate } from 'react-router-dom';
import Axios from "axios";
import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import Forgot2 from '../Supports/Images/Forgot2.png';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from './../Redux/Actions/userAction'

const ForgotPassword = ({user}) => {
 
  let [inputValues, setInputValues] = useState({ email: "" }); 
  let [errors, setErrors] = useState({});
  let [isSubmitting, setIsSubmitting] = useState(false);
  let [isSubmitted, setIsSubmitted] = useState(false);
  let [submitLoading, setSubmitLoading] = useState(false);
  let [resMessage, setResMessage] = useState({ success: "", error: "" });
  
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputValues({ ...inputValues, [name]: value });
    if (resMessage.error) {
      setResMessage({ ...resMessage, error: "" });
    }
  };

  const validateInfo = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Please insert your email";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
    }

    return errors;
  };

 
  const submitHandler = (e) => {
    e.preventDefault();
    setErrors(validateInfo(inputValues)); 
    setIsSubmitting(true);
  };

  useEffect(() => {
    onCheckUserLogin();
    if (Object.keys(errors).length === 0 && isSubmitting) {
      setSubmitLoading(true);
      let token = localStorage.getItem('myTkn')
      const headers = {
          headers: { 
              'Authorization': token,
              'Accept': 'application/json',
              'Content-Type': 'application/json'
          }
      }

       var data = {
        email: inputValues.email
        }
     
      Axios.post(`${API_URL}/user/resendpassword`, data, headers)
      .then((res) => {
        console.log('ini res', res)
        setSubmitLoading(false);

        if (res.data.errMessage) {
          setResMessage({ ...resMessage, error: res.data.errMessage });
        } else {
          setIsSubmitted(true);
          setResMessage({ success: res.data.message });
          setInputValues({ email: "" });
        }
      }).catch((err) => {
        console.log('ini err', err)
          setResMessage({
            ...resMessage,
            error: 'Account Not Found',
          });
      })

    }
  }, [errors]);

  useEffect(() => {
    onCheckUserLogin();
  }, []);

  if(localStorage.getItem('myTkn')){
    return <Navigate to='/' />
  }
  return (
      <>
      <div className='container-fluid my-universe-background-for'>
        <div className='pt-3'>    
            <div className='container'>
              <div className='row' style={{paddingBottom: '12px'}}>
                <div className='col-lg-6 col-md-6 col-none'>
                  <img src={Forgot2} alt="" width="100%"/>
                </div>
                <div className='col-lg-6 col-md-6 col-12' style={{fontFamily: "Source Sans Pro"}}>
                    <div className="d-flex flex-column align-items-center pt-5 mt-5">
                      <h1 className="mb-3 mt-4 fw-bold">Forgot Password</h1>
                      <p className="info">
                        Please enter your registered email address.
                      </p>
                      <p className="info" style={{marginTop: '-30px'}}>
                        You will receice a link to
                        create a new password via email.
                      </p>
                      <form 
                        onSubmit={submitHandler} noValidate
                        >
                          <div className="mb-3 d-flex flex-column">
                            <input
                              id="form-email"
                              type="email"
                              className={`form-control ${errors.email ? `is-invalid` : null}`}
                              placeholder="Enter Your Email"
                              name="email"
                              value={inputValues.email}
                              onChange={inputHandler}
                              required
                            />
                            {errors.email && <div className="text-danger" style={{fontFamily: "Source Sans Pro"}}>{errors.email}</div>}
                          </div>
                          <div className="mb-4 container-fluid p-0"></div>
                            <input
                              type="submit"
                              value="Send"
                              className="btn btn-primary btn-send py-2 container-fluid mb-3"
                              id='my-universe-btn-pass'
                            />
                        </form>
                        {submitLoading && (
                          <div
                            className="alert alert-secondary mt-1 d-flex flex-column justify-content-center pt-3 pb-1"
                            role="alert"  
                          >
                            <div className="spinner-border mt-1 mb-3" role="status">
                              <span className="visually-hidden">Loading...</span>
                            </div>
                            
                          </div>
                        )}
                        {resMessage.success && (
                          <div className="alert alert-success mt-1" role="alert">
                            {resMessage.success}
                          </div>
                        )}
                        {resMessage.error ? (
                          <div className="alert alert-danger mt-1" role="alert">
                            {resMessage.error}
                          </div>
                        ) : null}
                        <div className="mb-3 text-center"></div>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
      </>
  );
}

const mapDispatchToProps = {
  onUserLogin, onCheckUserLogin, onCheckUserVerify
}

const mapStateToProps = (state) => {
  return{
      user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps) (ForgotPassword)