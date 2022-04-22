import React, { useState } from "react";
import Axios from "axios";
import { API_URL } from "../Supports/Helpers";
import { Link, useNavigate } from "react-router-dom";
import '../Supports/Stylesheets/Login.css';
import Peoples88 from '../Supports/Images/Peoples88.png';

const Login  = () => {
    const [registerForm, setRegisterForm] = useState({
        emailOrUsername: "",
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
    
        //Email
        if (!registerForm["emailOrUsername"]) {
          formIsValid = false;
          errorInput["emailOrUsername"] = "Email Or Username required";
        }
    
        //password
        if (!registerForm["password"]) {
          formIsValid = false;
          errorInput["password"] = "Password required";
        }
    
        setRegisterForm({
          ...registerForm,
          errors: errorInput,
        });
        return formIsValid;
      };
    
      const navigate = useNavigate();
    
      const registerHandler = async () => { 
        try {
          if (handleValidation()) {
            let errorInput = {};
            let formIsValid = true;
    
            let resPassword = await Axios.get(API_URL + `/users?password=${registerForm.password}`)
            console.log('ini res password', resPassword)
            let resEmail = await Axios.get(API_URL + `/users?email=${registerForm.emailOrUsername}`)
            console.log('ini res email', resEmail)
            let resUsername = await Axios.get(API_URL + `/users?username=${registerForm.emailOrUsername}`)
            console.log('ini res username', resUsername)
    
            if(resEmail.data.length !== 0 || resUsername.data.length !== 0){
                if(resPassword.data.length !== 0){
                  setSubmitLoading(true);
                  setSubmitLoading(false);
                  navigate('/');
                }else{
                  console.log('Password wrong')
                  formIsValid = false;
                  errorInput["password"] = "Password wrong"; 
                }
            }else{
              console.log('Email or Username wrong')
              formIsValid = false;
              errorInput["emailOrUsername"] = "Email or Username wrong";
            }
    
            setRegisterForm({
              ...registerForm,
              errors: errorInput,
            });
            return formIsValid;
          
          }
            
        } catch (error) {
            console.log(error)
        }
    }
    return(
            <div className='row my-universe-background-log'>
              <div className='col-none col-md-6 col-lg-6 mt-5 mb-5 pt-5 pb-4'>
                  <div className="d-flex justify-content-end ml-5">
                    <div className="d-none d-lg-block d-md-block">
                    <img src={Peoples88} alt="" width="400px" height="400px" id="my-universe-img-log"/>
                    </div>
                  </div>
              </div>
              <div className="col-12 col-md-6 col-lg-6">
                <div style={{height: '150px'}}>
                  
                </div>
                <div className='ml-5'>
                    <div className='d-flex flex-column flex-wrap h-100'>
                        <div className="">
                          <h3><span className="font-weight-bold my-universe-font-size-30">Welcome</span><span className="my-universe-font-size-30 font-weight-light ml-1">Friends!</span></h3>
                          <h5 className="font-weight-normal my-universe-font-size-14 my-universe-grey">Explore the world and make many memories!</h5>
                        </div>
                        <div className='my-universe-form-log'>
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
                                       <div className="">
                                       <input 
                                        name="emailOrUsername"
                                        type="text" 
                                        onChange={inputHandler}
                                        value={registerForm.emailOrUsername}
                                        placeholder="Email or Username" 
                                        className={`form-control rounded-0 border-top-0 border-left-0 border-right-0 ${
                                            registerForm.errors["emailOrUsername"] ? `input-invalid` : null
                                          }`}
                                        required />
                                       </div>
                                         <div className='my-universe-validation-alert'>
                                            {registerForm.errors["emailOrUsername"]}
                                         </div>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="input-group d-flex flex-column">
                                       <div className="d-flex my-universe-input-log">
                                       <input
                                        onChange={inputHandler}
                                        type={passwordVisible.password ? `text` : `password`}
                                        value={registerForm.password}
                                        name="password"
                                        className={`form-control rounded-0 border-0 ${
                                            registerForm.errors["password"] ? `input-invalid` : null
                                          }`}
                                        placeholder="Password" 
                                        required />
                                        {!passwordVisible.password ? (
                                        <svg
                                            className="bi bi-eye eye-icon"
                                            style={{borderBottom: '1px solid  #CED4DA', backgroundColor: 'white' }}
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
                                            className="bi bi-eye-slash eye-icon"
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
                                        <div className="my-universe-validation-alert">
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
                                <div className="">
                                    <input 
                                    onClick={registerHandler}
                                    disabled={submitLoading} 
                                    type="button" value="Log In" id="my-universe-btn-log" className=" btn w-100 my-universe-bg-secondary my-universe-light " />
                                </div>
                            </form>
                        </div>
                        </div>
                  </div>
            </div>
        </div>
    )
    
}

export default Login