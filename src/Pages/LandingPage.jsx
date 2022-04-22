import React from 'react';
import { Navigate, Link } from 'react-router-dom';

// Redux
import {connect} from 'react-redux';
import {onUserRegister, onCheckUserLogin} from './../Redux/Actions/userAction';

// SweetAlert
import '../Supports/Stylesheets/LandingPage.css'
import Peoples66 from '../Supports/Images/Peoples66.png';


class LandingPage extends React.Component{

    state = {
        is_disabled: false,
        isLogedIn: false,
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

    render(){
        if(this.state.isLogedIn){
            return(
                <Navigate to='/' />
            )
        }

        return(
        <div className='row my-universe-background' id='landingpage'>
          <div className='col-12 col-md-6 align-self-center'>
                <div className='ml-5 d-md-none d-lg-block d-none'>
                        <h1 className="font-weight-bold my-universe-font-size-20 my-universe-font">NEW PLATFORM</h1>
                        <h1 className="font-weight-bold my-universe-font-size-70">Your Next Level</h1>
                        <h1 className="font-weight-bold my-universe-font-size-70">Social Life</h1>
                        <h1 className="font-weight-light mt-2 my-universe-font-size-25">Your new Social Media Platform with stuff</h1>
                        <h1 className="font-weight-light my-universe-font-size-25">that acttually matters!</h1>
                </div>
                <div className='ml-5 d-md-block d-lg-none d-block'>
                        <h1 className="font-weight-bold my-universe-font-size-18 my-universe-font">NEW PLATFORM</h1>
                        <h1 className="font-weight-bold my-universe-font-size-30">Your Next Level</h1>
                        <h1 className="font-weight-bold my-universe-font-size-30">Social Life</h1>
                        <h1 className="font-weight-light mt-2 my-universe-font-size-20">Your new Social Media Platform</h1>
                        <h1 className="font-weight-light my-universe-font-size-20">with stuff that acttually matters!</h1>
                </div>
                <div className='ml-5'>
                        <Link to="/register">
                            <button value="Register" className="btn my-universe-btn font-weight-bold my-universe-input my-universe-font-size-12">GET STARTED</button>
                        </Link>
                </div>
          </div>
          <div className='col-12 col-md-6'>
                <div className="d-none d-md-block">
                    <img src={Peoples66} alt="" width="100%" />
                </div>
          </div>
        </div>

        )
    }
}

const mapDispatchToProps = {
    onUserRegister, onCheckUserLogin
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)