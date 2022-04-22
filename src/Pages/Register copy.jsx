import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { onUserRegister } from '../Redux/Actions';
import '../Supports/Stylesheets/Register.css'
import Peoples01 from '../Supports/Images/Peoples01.png';

class Register extends Component {
    state={
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

    onBtnRegisterClick = () => {
        var username = this.refs.username.value;
        var email = this.refs.email.value;
        var password = this.refs.password.value;
        var passwordConf = this.refs.passwordConf.value;

        

        this.props.onUserRegister({ username, email, password, passwordConf });
    }

    renderError = () => {
        if(this.props.error.length > 0) {
            return <p className="alert alert-danger">{this.props.error}</p>;
        }
    }

    // renderButton = () => {
    //     if(this.props.loading) {
    //         return <i className="fa fa-spinner fa-spin" style={{ fontSize: '54px' }}/>
    //     }
    //     return <input type="button" name="submit" id="submit" className="submit" defaultValue="Register" onClick={this.onBtnRegisterClick} />
    // }

    render() {
        if(this.props.username === '') {
            return (
                <div className="row my-universe-background-reg">
                     <div className='col-none col-md-6 col-lg-6 mt-5 mb-5 pt-5'>
                        <div className="d-flex justify-content-end ml-5">
                            <div className="d-none d-lg-block d-md-block">
                            <img src={Peoples01} alt="" width="400px" height="400px"/>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6 col-lg-6 mt-5 pt-5'>
                        <div className='d-flex flex-column flex-wrap h-100'>
                                <h3><span className="font-weight-bold">Create</span><span className="font-weight-light">Account</span></h3>
                                <h5 className="font-weight-normal my-universe-font-size-14 my-universe-grey">Share your best memory with us!</h5>
                            <div className='my-universe-form-log mt-5'>
                            <form  className="appointment-form" id="appointment-form">
                                <div className="form-group  my-universe-form-reg">
                                    <div className="input-group d-flex flex-column">
                                       <div className="">
                                       <input 
                                        ref="email" type="email" name="email" id="email" placeholder="Email" 
                                        className='form-control rounded-0 border-top-0 border-left-0 border-right-0'
                                        required />
                                       </div>
                                        <div className='my-universe-validation-alert'>
                                          
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group  my-universe-form-reg">
                                    <div className="input-group d-flex flex-column">
                                       <div className="">
                                       <input 
                                        ref="username" type="text" name="name" id="name" placeholder="Username" 
                                        className='form-control rounded-0 border-top-0 border-left-0 border-right-0'
                                        required />
                                       </div>
                                        <div className='my-universe-validation-alert'>
                                          
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group my-universe-form-reg">
                                    <div className="input-group d-flex flex-column">
                                       <div className="d-flex my-universe-input-log">
                                            <input type={this.state.visible.type} ref="password" name="password" id="password" placeholder="Password" className="form-control rounded-0 border-0" />
                                            <span className='input-group-text rounded-0 border-0' onClick={this.handleVisible} style={{cursor: 'pointer', background: 'none', backgroundColor: 'white'}}>{this.state.visible.title}</span>
                                       </div>
                                        <div className="my-universe-validation-alert">
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="form-group my-universe-form-reg">
                                    <div className="input-group d-flex flex-column">
                                       <div className="d-flex my-universe-input-log">
                                            <input type={this.state.visibleConf.type} ref="passwordConf" name="passwordConf" placeholder="Confirmation Password" className="form-control rounded-0 border-0" />
                                            <span className='input-group-text rounded-0 border-0' onClick={this.handleVisibleConf} style={{cursor: 'pointer', background: 'none', backgroundColor: 'white'}}>{this.state.visibleConf.title}</span>
                                       </div>
                                        <div className="my-universe-validation-alert">
                                        
                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <input type="button" name="submit" id="submit  my-universe-btn-reg" className="submit btn w-100 my-universe-bg-secondary my-universe-light" defaultValue="Register" onClick={this.onBtnRegisterClick} />
                                </div>
                            </form>
                            <div>
                            {this.renderError()}
                            </div>
                        </div>
                        </div>     
                    </div>
                </div>
            )
        }
        
        return <Navigate to='/' />
    }
}

const mapStateToProps = (state) => {
    return { username: state.auth.username, loading: state.auth.loading, error: state.auth.error };
}

export default connect(mapStateToProps, { onUserRegister })(Register);
