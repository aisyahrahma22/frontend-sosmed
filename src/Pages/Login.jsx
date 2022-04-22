import React from 'react';
import { Navigate } from 'react-router-dom';

// Redux
import {connect} from 'react-redux';
import {onUserLogin, onCheckUserLogin} from './../Redux/Actions/userAction'
import '../Supports/Stylesheets/Login.css';
import Peoples88 from '../Supports/Images/Peoples88.png';

class Login extends React.Component{

    state = {
        isLogedIn: false,
        visible: {
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

    componentDidMount(){
        this.props.onCheckUserLogin()
        // this.onCheckIsLogedIn()
    }

    onCheckIsLogedIn = () => {
        let token = localStorage.getItem('myTkn')

        if(token){
            this.setState({ isLogedIn: true })
        }
    }

    onSubmit = () => {
        let data = {
            email: this.email.value,
            password: this.password.value
        }

        this.props.onUserLogin(data)
    }

    render(){
        if(this.props.user.is_login){
            return(
                <Navigate to='/' />
            )
        }

        return(
            <div  id='login' className='row my-universe-background-log'>
            <div className='col-12 col-md-6 col-lg-6'>
                <div className="ml-5 pl-5">
                    <div className="d-none d-lg-block d-md-block ml-5 pl-5">
                    <img src={Peoples88} alt=""  width="100%" id="my-universe-img-log"/>
                    </div>
                </div>
            </div>
            <div className='col-12 col-md-6 col-lg-6 mt-5 '>
                <div className='d-flex flex-column flex-wrap h-100 mt-3'>
                    <h3><span className="font-weight-bold my-universe-font-size-30">Welcome</span><span className="my-universe-font-size-30 font-weight-light ml-1">Friends!</span></h3>
                    <h5 className="font-weight-normal my-universe-font-size-14 my-universe-grey">Explore the world and make many memories!</h5>
                    <div className='my-universe-form-log mt-5'>
                    <form  className="appointment-form" id="appointment-form">
                        <div className="form-group">
                            <div className="input-group d-flex flex-column">
                               <div className="">
                               <input 
                                ref={(e) => this.email = e} type="text" placeholder="Email" 
                                className='form-control rounded-0 border-top-0 border-left-0 border-right-0'
                                required />
                               </div>
                                <div className='my-universe-validation-alert'>
                                  
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="input-group d-flex flex-column">
                               <div className="d-flex my-universe-input-log">
                                    <input type={this.state.visible.type} ref={(e) => this.password = e} placeholder="Password" className="form-control rounded-0 border-0" />
                                    <span className='input-group-text rounded-0 border-0' onClick={this.handleVisible} style={{cursor: 'pointer', background: 'none', backgroundColor: 'white'}}>{this.state.visible.title}</span>
                               </div>
                                <div className="my-universe-validation-alert">
                               
                                </div>
                            </div>
                        </div>
                        <div className="">
                            <input 
                            type="button" name="submit" disabled={this.props.user.loading} className="submit btn w-100 my-universe-bg-secondary my-universe-light" value="Login" 
                            onClick={() => this.onSubmit()}
                            id="my-universe-btn-log"/>
                        </div>
                    </form>
                    <div>
                        <h6>
                            {
                                this.props.user.error?
                                    this.props.user.message
                                :
                                    null
                            }
                        </h6>
                    </div>
                </div>
                </div>     
             </div>
         </div>
        )
    }
}

const mapDispatchToProps = {
    onUserLogin, onCheckUserLogin
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login)