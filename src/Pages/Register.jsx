import React from 'react';
import { Navigate } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';

// Redux
import {connect} from 'react-redux';
import {onCheckUserLogin} from './../Redux/Actions/userAction';

// SweetAlert
import Swal from 'sweetalert2';
import '../Supports/Stylesheets/Register.css'
import Peoples01 from '../Supports/Images/Peoples01.png';


class Register extends React.Component{

    state = {
        is_disabled: false,
        isLogedIn: false,
        visible: {
            type: "password",
            title: "Show"
        },
        visibleConf: {
            type: "password",
            title: "Show"
        }
    }

    handleVisible = () => {
        if (this.state.visible.type == "password") {
            this.setState({
                visible: {
                    type: "text",
                    title: "Hide"
                }
            })
        } else {
            this.setState({
                visible: {
                    type: "password",
                    title: "Show"
                }
            })
        }
    }

    handleVisibleConf = () => {
        if (this.state. visibleConf.type == "password") {
            this.setState({
                visibleConf: {
                    type: "text",
                    title: "Hide"
                }
            })
        } else {
            this.setState({
                visibleConf: {
                    type: "password",
                    title: "Show"
                }
            })
        }
    }

    componentDidMount(){
        this.props.onCheckUserLogin()
        this.onCheckIsLogedIn()
    }

    onCheckIsLogedIn = () => {
        let token = localStorage.getItem('myTkn')

        if(token){
            this.setState({ isLogedIn: true })
        }
    }

    onSubmit = () => {
        try {
            this.setState({ is_disabled: true })

            let username = this.username.value 
            let email = this.email.value 
            let password = this.password.value 
            let passwordConf = this.passwordConf.value 

            // Validation
            if(username=='' || email =='' ||password == '' || passwordConf == '') throw { message: 'Fill All Data!' }
            if(!/\S+@\S+\.\S+/.test(email)) throw { message: 'Email address is invalid' }
            if(!username.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,}")) throw { message: 'Username should be contain uppercase, number, and symbol' }
            if(!password.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*])")) throw { message: 'Password should be contain uppercase, number, and symbol' }
            if(password.length < 8) throw { message: 'Password weak, please add more characters' }
            if(password !== passwordConf) throw { message: 'Password and Confirmation Password doesnt match!' }
            
            Axios.post(`${API_URL}/user/register`, {username, email, password})
            .then((res) => {
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Okay!',
                    timer: 1500
                })
                this.username.value = ''
                this.email.value = ''
                this.password.value = ''
                this.passwordConf.value = ''

                this.setState({ is_disabled: false })
            })
            .catch((err) => {
                Swal.fire({
                    title: 'Error!',
                    text: err.response.data.message,
                    icon: 'error',
                    confirmButtonText: 'Okay!',
                    timer: 1500
                })

                this.setState({ is_disabled: false })
            })
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: error.message,
                icon: 'error',
                confirmButtonText: 'Okay!',
                timer: 1500
            })

            this.setState({ is_disabled: false })
        }
    }

    render(){
        if(this.state.isLogedIn){
            return(
                <Navigate to='/' />
            )
        }

        return(
        <div className="row my-universe-background-reg" id='register'>
            <div className='col-none col-md-6 col-lg-6'>
                <div className="ml-5 pl-5 mt-3">
                    <div className="d-none d-lg-block d-md-block ml-5 pl-5">
                        <img src={Peoples01} alt="" width="100%"/>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-6 col-lg-6 mt-5'>
                 <div className='d-flex flex-column flex-wrap h-100'>
                    <h3><span className="font-weight-bold">Create</span><span className="font-weight-light">Account</span></h3>
                    <h5 className="font-weight-normal my-universe-font-size-14 my-universe-grey">Share your best memory with us!</h5>
                    <div className='my-universe-form-log mt-5'>
                        <form  className="appointment-form" id="appointment-form">
                            <div className="form-group  my-universe-form-reg">
                                <div className="input-group d-flex flex-column">
                                    <div>
                                        <input 
                                        ref={(e) => this.email = e} type="email"  placeholder="Email" 
                                        className='form-control rounded-0 border-top-0 border-left-0 border-right-0'
                                        required />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group my-universe-form-reg mt-2">
                                <div className="input-group d-flex flex-column">
                                    <div>
                                        <input 
                                        ref={(e) => this.username = e} type="text" placeholder="Username" 
                                        className='form-control rounded-0 border-top-0 border-left-0 border-right-0'
                                        required />
                                    </div>
                                </div>
                            </div>
                            <div className="form-group my-universe-form-reg mt-2">
                                <div className="input-group d-flex flex-column">
                                    <div className="d-flex my-universe-input-log">
                                        <input type={this.state.visible.type} ref={(e) => this.password = e} placeholder="Password" className="form-control rounded-0 border-0" />
                                        <span className='input-group-text rounded-0 border-0' onClick={this.handleVisible} style={{cursor: 'pointer', background: 'none', backgroundColor: 'white'}}>{this.state.visible.title}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="form-group my-universe-form-reg mt-2">
                                <div className="input-group d-flex flex-column">
                                    <div className="d-flex my-universe-input-log">
                                        <input type={this.state.visibleConf.type} ref={(e) => this.passwordConf = e} placeholder="Confirmation Password" className="form-control rounded-0 border-0" />
                                        <span className='input-group-text rounded-0 border-0' onClick={this.handleVisibleConf} style={{cursor: 'pointer', background: 'none', backgroundColor: 'white'}}>{this.state.visibleConf.title}</span>
                                    </div>
                                </div>
                            </div>
                            <div className='mb-4 pb-1'>
                                <button type="submit" id="my-universe-btn-reg" disabled={this.state.is_disabled} onClick={() => this.onSubmit()} className="btn w-100 my-universe-bg-secondary my-universe-light">
                                    {
                                        this.state.is_disabled?
                                            'Loading'
                                        :
                                            'Register'
                                    }
                                </button>
                            </div>
                        </form>
                    </div>
                </div>     
            </div>
     </div>
        )
    }
}

const mapDispatchToProps = {
 onCheckUserLogin
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)