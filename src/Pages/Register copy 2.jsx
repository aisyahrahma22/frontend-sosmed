import React, { useState } from "react";
import Axios from "axios";
import { API_URL } from "../Supports/Helpers/index.js";
import { Link,  useNavigate } from "react-router-dom";
import '../Supports/Stylesheets/Register.css'
import Peoples01 from '../Supports/Images/Peoples01.png';
import { onUserRegister } from '../Redux/Actions';
import { useDispatch } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
    const [registerForm, setRegisterForm] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
        message: "",
        success: "",
        errors: "",
      });
    
      let [submitLoading, setSubmitLoading] = useState(false);
    
      //State for password visibility
      let [passwordVisible, setPasswordVisible] = useState({
        password: false,
        confirmPassword: false,
      });
    
      const inputHandler = (event) => {
        const value = event.target.value;
        const name = event.target.name;
    
        setRegisterForm({
          ...registerForm,
          [name]: value,
        });
      };
    
      const handleValidation = () => {
        let errorInput = {};
        let formIsValid = true;
    
        //Name
        if (registerForm["username"]) {
          if (!registerForm["username"].match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,}")) {
            formIsValid = false;
            errorInput["username"] =
              "Username should be contain uppercase, number, and symbol";
          }
        }else{
          formIsValid = false;
          errorInput["username"] = "Username required";
        }
    
        //Email
        if (registerForm["email"]) {
          let lastAtPos = registerForm["email"].lastIndexOf("@");
          let lastDotPos = registerForm["email"].lastIndexOf(".");
    
          if (
            !(
              lastAtPos < lastDotPos &&
              lastAtPos > 0 &&
              registerForm["email"].indexOf("@@") == -1 &&
              lastDotPos > 2 &&
              registerForm["email"].length - lastDotPos > 2
            )
          ) {
            formIsValid = false;
            errorInput["email"] = "Email is not valid";
          }
        }else{
          formIsValid = false;
          errorInput["email"] = "Email required";
        }
    
        //password
        if (registerForm["password"]) {
          if (!registerForm["password"].match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])")) {
            formIsValid = false;
            errorInput["password"] =
              "Password should be contain uppercase, number, and symbol";
          }
          if(registerForm["password"].length < 8 ){
            formIsValid = false;
          errorInput["password"] =
            "Password is weak, please add more characters";
          }
        }else{
          formIsValid = false;
          errorInput["password"] = "Password required";
        }
    
        //confirmation password
        if (registerForm["confirmPassword"]) {
          if (registerForm["password"] !== registerForm["confirmPassword"]) {
            formIsValid = false;
            errorInput["confirmPassword"] =
              "The password and confirmation password do not match";
          }
    
          if(registerForm["confirmPassword"].length < 8){
            formIsValid = false;
            errorInput["confirmPassword"] =
              "Password is weak, please add more characters";
          }
        }else{
          formIsValid = false;
          errorInput["confirmPassword"] = "Cannot be empty";
        }
    
        setRegisterForm({
          ...registerForm,
          errors: errorInput,
        });
        return formIsValid;
      };
    
      const navigate = useNavigate();
    
      const registerHandler = () => {
        if (handleValidation()) {
          setSubmitLoading(true);
          dispatch(onUserRegister({
            email: registerForm.email,
            username: registerForm.username,
            password: registerForm.password,
          }));
          // setSubmitLoading(false);
          // navigate('/waitingverification');
          // setRegisterForm({
          //     ...registerForm,
          //   email: "",
          //   username: "",
          //   password: "",
          //   confirmPassword: "",
          // });
          // Axios.post(`${API_URL}/user/register`, {
          //   email: registerForm.email,
          //   username: registerForm.username,
          //   password: registerForm.password,
          // })
          //   .then((res) => {
          //     setSubmitLoading(false);
          //     navigate('/waitingverification');
    
          //     setRegisterForm({
          //       ...registerForm,
          //       message: res.data.message,
          //       success: res.data.success,
          //       email: "",
          //       username: "",
          //       password: "",
          //       confirmPassword: "",
          //     });
          //   })
          //   .catch((err) => {
          //       if(err.data.status === 'error') {
          //           dispatch({ type: AUTH_SYSTEM_ERROR, payload: err.data.message })
          //       }
          //   });
        }
      };

    //  const renderError = () => {
    //     if(props.error.length > 0) {
    //         return <p className="alert alert-danger">{props.error}</p>;
    //     }
    // }
  
    return(
            <div className='row my-universe-background-reg'>
            <div className='col-none col-md-6 col-lg-6 align-self-center mt-5' style={{marginBottom: '18px'}}>
                <div className="d-flex justify-content-end ml-5" style={{marginBottom: '7px'}}>
                  <div className="d-none d-lg-block d-md-block">
                  <img src={Peoples01} alt="" width="400px" height="400px"/>
                  </div>
              </div>
            </div>
            <div className="col-12 col-md-6 col-lg-6 mt-5 pt-5">
                <div className="d-flex flex-column">
                  <div className="pt-1">
                    <h3><span className="font-weight-bold">Create</span><span className="font-weight-light">Account</span></h3>
                    <h5 className="font-weight-normal my-universe-font-size-14 my-universe-grey">Share your best memory with us!</h5>
                  </div>
                </div>
                <div className='d-flex flex-wrap'>
                        <div className='my-universe-form-reg-01'>
                            <form>
                            {registerForm.success === true ? (
                            <div className="alert alert-success text-center" role="alert">
                            {registerForm.message}
                            </div>
                            ) : null}
                            {registerForm.success === false ? (
                            <div className="alert alert-danger text-center" role="alert">
                            {registerForm.message}
                            </div>
                            ) : null}
                                <div className="form-group mt-4">
                                    <div className="input-group d-flex flex-column">
                                       <div className="my-universe-input-reg-02">
                                       <input 
                                        name="email"
                                        type="email" 
                                        onChange={inputHandler}
                                        value={registerForm.email}
                                        className={`form-control rounded-0 border-top-0 border-left-0 border-right-0 ${
                                            registerForm.errors["email"] ? `input-invalid` : null
                                          }`}
                                          placeholder="Email"
                                        required />
                                       </div>
                                         <div className='my-universe-validation-alert-reg'  style={{marginTop: '-10px', marginBottom: '5px'}}>
                                         {registerForm.errors["email"]}
                                         </div>
                                    </div>
                                </div>
                                <div className="form-group my-universe-form-reg">
                                    <div className="input-group d-flex flex-column">
                                       <div className="my-universe-input-reg-02">
                                       <input 
                                        name="username"
                                        onChange={inputHandler}
                                        type="text"
                                        className={`form-control rounded-0 border-top-0 border-left-0 border-right-0 ${
                                            registerForm.errors["username"] ? `input-invalid` : null
                                          }`}
                                        placeholder="Username"
                                        id="inputUsername"
                                        value={registerForm.username}
                                        required />
                                       </div>
                                         <div className='my-universe-validation-alert-reg' style={{marginTop: '-10px', marginBottom: '5px'}}>
                                         {registerForm.errors["username"]}
                                         </div>
                                    </div>
                                </div>
                                <div className="form-group my-universe-form-reg">
                                    <div className="input-group d-flex flex-column">
                                       <div className="d-flex">
                                       <input
                                        onChange={inputHandler}
                                        type={passwordVisible.password ? `text` : `password`}
                                        value={registerForm.password}
                                        name="password"
                                        className={`form-control rounded-0 border-top-0 border-left-0 border-right-0 ${
                                            registerForm.errors["password"] ? `input-invalid` : null
                                          }`}
                                        placeholder="Password" 
                                        required />
                                        {!passwordVisible.password ? (
                                        <svg
                                            className="bi bi-eye eye-icon my-universe-eye"
                                            style={{borderBottom: '1px solid  #CED4DA', background: 'white'}}
                                            onClick={() =>
                                            setPasswordVisible({
                                                ...passwordVisible,
                                                password: true,
                                            })
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                        ) : (
                                        <svg
                                            className="bi bi-eye-slash eye-icon my-universe-eye"
                                            style={{borderBottom: '1px solid  #CED4DA', background: 'white'}}
                                            onClick={() =>
                                            setPasswordVisible({
                                                ...passwordVisible,
                                                password: false,
                                            })
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                        )}
                                       </div>
                                        <div className="my-universe-validation-alert-reg" style={{marginBottom: '5px', background: 'white'}}>
                                        {registerForm.errors["password"] ? (
                                        <div>
                                        {registerForm.errors["password"]}
                                        </div>
                                         ) : (
                                        <div className="validation-alert text-muted">
                                        
                                        </div>
                                         )}
                                        </div>
                                    </div>    
                                </div>
                                <div className="form-group my-universe-form-reg">
                                    <div className="input-group d-flex flex-column">
                                       <div className="d-flex">
                                       <input
                                        onChange={inputHandler}
                                        name="confirmPassword"
                                        type={passwordVisible.confirmPassword ? `text` : `password`}
                                        className={`form-control rounded-0 border-top-0 border-left-0 border-right-0 ${
                                            registerForm.errors["confirmPassword"]
                                              ? `input-invalid`
                                              : null
                                        }`}
                                        placeholder=" Confirm Password"
                                        id="inputConfirmPassword"
                                        value={registerForm.confirmPassword}
                                        required />
                                        {!passwordVisible.confirmPassword ? (
                                        <svg
                                            className="bi bi-eye eye-icon my-universe-eye"
                                            style={{borderBottom: '1px solid  #CED4DA', background: 'white'}}
                                            onClick={() =>
                                                setPasswordVisible({
                                                  ...passwordVisible,
                                                  confirmPassword: true,
                                                })
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                                        </svg>
                                        ) : (
                                        <svg
                                            className="bi bi-eye-slash eye-icon my-universe-eye"
                                            style={{borderBottom: '1px solid  #CED4DA', background: 'white'}}
                                            onClick={() =>
                                                setPasswordVisible({
                                                  ...passwordVisible,
                                                  confirmPassword: false,
                                                })
                                            }
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="20"
                                            height="20"
                                            fill="currentColor"
                                            viewBox="0 0 16 16"
                                        >
                                            <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                                            <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                                            <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                                        </svg>
                                        )}
                                       </div>
                                        <div className="my-universe-validation-alert-reg" style={{marginBottom: '5px'}}>
                                        {registerForm.errors["confirmPassword"]}
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <input 
                                    disabled={submitLoading} 
                                    onClick={registerHandler}
                                    type="button" value="Register" id="my-universe-btn-reg" className=" btn w-100 my-universe-bg-secondary my-universe-light " />
                                </div>
                            </form>
                            <div className="mb-3 d-flex justify-content-center">
                              <p className="my-universe-form-input-register">
                                Already have an account?{" "}
                                <Link to="/login" className="text-end">
                                  Login here
                                </Link>
                              </p>
                            </div>
                            {/* <div>
                            {renderError}
                            </div> */}
                        </div>
                        </div>
            </div>
        </div>
    )
    
}

export default Register