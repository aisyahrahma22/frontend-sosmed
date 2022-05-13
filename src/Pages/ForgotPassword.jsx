import { API_URL } from '../Supports/Helpers/index';
import '../Supports/Stylesheets/Forgot.css';
import Axios from "axios";
import { useEffect, useState } from "react";

function ForgotPassword() {
  //State for input values
  let [inputValues, setInputValues] = useState({ email: "" });

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

  //Function to save validate info
  const validateInfo = (values) => {
    let errors = {};

    if (!values.email) {
      errors.email = "Please insert your email";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Email is invalid";
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
        setSubmitLoading(false);

        if (res.data.errMessage) {
          setResMessage({ ...resMessage, error: res.data.errMessage });
        } else {
          setIsSubmitted(true);

          setResMessage({ success: res.data.message });

          //Reset form input (controlled form)
          // setInputValues({ email: "" });
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

  return (
    <div className="forgot-password">
      <div className="container container-forgot-password d-flex flex-column align-items-center">
        <h1 className="mb-5 fw-bold">Forgot Password</h1>
        <p className="info">
          Please enter your registered email address. You will receice a link to
          create a new password via email.
        </p>

        <form 
        onSubmit={submitHandler} noValidate
        >
          <div className="mb-3 d-flex flex-column">
            <label htmlFor="form-email" className="form-label">
              Email
            </label>
            <input
              id="form-email"
              type="email"
              className={`form-control ${errors.email ? `is-invalid` : null}`}
              placeholder="Email"
              name="email"
              value={inputValues.email}
              onChange={inputHandler}
              required
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}
          </div>

          <div className="mb-4 container-fluid p-0"></div>
          <input
            type="submit"
            value="Send"
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
        <div className="mb-3 text-center"></div>
      </div>
    </div>
  );
}

export default ForgotPassword;