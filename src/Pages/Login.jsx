import React from 'react';
import { Navigate, Link } from 'react-router-dom';

// Redux
import {connect} from 'react-redux';
import {onUserLogin, onCheckUserLogin} from './../Redux/Actions/userAction'
import '../Supports/Stylesheets/Login.css';
import Peoples88 from '../Supports/Images/Peoples88.png';

class Login extends React.Component{

    state = {
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
    }

    onSubmit = () => {
        let data = {
            account: this.account.value,
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
        <>
            <div className='container-fluid my-universe-background-log'>
                <div className='pt-3'>
                    <div className='container pb-1'>
                        <div className='row mt-4 pt-5'>
                            <div className='col-lg-6 col-md-6 col-none'>
                                <div  className="ml-5 pl-5" style={{paddingBottom: '11px'}}>
                                    <img src={Peoples88} alt="" width="100%"/>
                                </div>
                            </div>
                            <div className='col-lg-6 col-md-6 col-12'  style={{fontFamily: "Source Sans Pro"}}>
                                <div className='d-flex flex-column flex-wrap mt-5 pt-5'>
                                    <h3><span className="font-weight-bold"  style={{fontSize: '30'}}>Welcome</span><span  style={{fontSize: '30'}} className="font-weight-light ml-1">Friends!</span></h3>
                                    <h5 className="font-weight-normal"  style={{fontSize: '14', color: 'grey'}}>Explore the world and make many memories!</h5>
                                    <div className='my-universe-form-log mt-3'>
                                        <form  className="appointment-form" id="appointment-form">
                                            <div className="form-group">
                                                <div className="input-group d-flex flex-column">
                                                    <div>
                                                        <input 
                                                        ref={(e) => this.account = e} name="account" type="text" placeholder="Email or Username" 
                                                        className='form-control rounded-0 border-top-0 border-left-0 border-right-0'
                                                        required />
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <div className="input-group d-flex flex-column">
                                                    <div className="d-flex my-universe-input-log">
                                                        <input type={this.state.visible.type} ref={(e) => this.password = e} placeholder="Password" className="form-control rounded-0 border-0" />
                                                        <span className='input-group-text rounded-0 border-0' onClick={this.handleVisible} style={{cursor: 'pointer', background: 'none', backgroundColor: 'white'}}>{this.state.visible.title}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='mb-2 d-flex justify-content-center'>
                                                <Link  style={{fontFamily: "Source Sans Pro",  textDecoration: 'none'}} className="text-decoration-none" to ="/forgotpassword"> <span  style={{cursor: 'pointer', color: 'purple'}}>Forgot Password?</span></Link>
                                            </div>
                                            <div>
                                                <button type="submit" id="my-universe-btn-log" disabled={this.props.user.loading} onClick={() => this.onSubmit()} className="btn w-100">
                                                    {
                                                        this.props.user.loading?
                                                            'Loading'
                                                        :
                                                            'Login'
                                                    }
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>  
                            </div>
                        </div>
                    </div> 
                </div>      
            </div>
        </>
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