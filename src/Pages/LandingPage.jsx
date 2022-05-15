import React from 'react';
import { Navigate, Link } from 'react-router-dom';

// Redux
import {connect} from 'react-redux';
import {onCheckUserLogin} from './../Redux/Actions/userAction';

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

        <>
            <div className='container-fluid my-universe-background' style={{fontFamily: "Source Sans Pro"}}>
                <div className='pt-3'>
                    <div className='container' style={{paddingBottom: '25px'}}>
                        <div className='row mt-5 pt-5'>
                            <div className='col-12 col-md-6'>
                                <div  className='ml-5 d-md-none d-lg-block d-none'>
                                    <h1 style={{fontSize: '20px', color: 'purple'}} className="font-weight-bold">NEW PLATFORM</h1>
                                    <h1 style={{fontSize: '70px'}} className="font-weight-bold">Your Next Level</h1>
                                    <h1 style={{fontSize: '70px'}} className="font-weight-bold">Social Life</h1>
                                    <h1 style={{fontSize: '20px'}} className="font-weight-light mt-2">Your new Social Media Platform with stuff</h1>
                                    <h1 style={{fontSize: '20px'}} className="font-weight-light">that acttually matters!</h1>
                                </div>
                                <div className='ml-5 d-md-block d-lg-none d-block'>
                                    <h1 style={{fontSize: '18px', color: 'purple'}} className="font-weight-bold">NEW PLATFORM</h1>
                                    <h1 style={{fontSize: '30px'}} className="font-weight-bold">Your Next Level</h1>
                                    <h1 style={{fontSize: '30px'}} className="font-weight-bold">Social Life</h1>
                                    <h1 style={{fontSize: '20px'}} className="font-weight-light mt-2">Your new Social Media Platform</h1>
                                    <h1 style={{fontSize: '20px'}} className="font-weight-light">with stuff that acttually matters!</h1>
                                </div>
                                <div className='ml-5'>
                                    <Link to="/register">
                                        <button style={{fontSize: '12px'}} value="Register" className="btn my-universe-btn font-weight-bold my-universe-input">GET STARTED</button>
                                    </Link>
                                </div>
                            </div>
                            <div className='col-12 col-md-6'>
                                <div className="d-none d-md-block">
                                    <img src={Peoples66} alt="" width="100%" />
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </>
        // <div className='row my-universe-background' id='landingpage'>
        //     <div className='col-12 col-md-6 align-self-center'>
        //         <div className='ml-5 d-md-none d-lg-block d-none'>
                    // <h1 style={{fontSize: '20px', color: 'purple'}} className="font-weight-bold">NEW PLATFORM</h1>
                    // <h1 style={{fontSize: '70px'}} className="font-weight-bold">Your Next Level</h1>
                    // <h1 style={{fontSize: '70px'}} className="font-weight-bold">Social Life</h1>
                    // <h1 style={{fontSize: '25px'}} className="font-weight-light mt-2">Your new Social Media Platform with stuff</h1>
                    // <h1 style={{fontSize: '25px'}} className="font-weight-light">that acttually matters!</h1>
        //         </div>
        //         <div className='ml-5 d-md-block d-lg-none d-block'>
        //             <h1 style={{fontSize: '18px', color: 'purple'}} className="font-weight-bold">NEW PLATFORM</h1>
        //             <h1 style={{fontSize: '30px'}} className="font-weight-bold">Your Next Level</h1>
        //             <h1 style={{fontSize: '30px'}} className="font-weight-bold">Social Life</h1>
        //             <h1 style={{fontSize: '20px'}} className="font-weight-light mt-2">Your new Social Media Platform</h1>
        //             <h1 style={{fontSize: '20px'}} className="font-weight-light">with stuff that acttually matters!</h1>
        //         </div>
                // <div className='ml-5'>
                //     <Link to="/register">
                //         <button style={{fontSize: '12px'}} value="Register" className="btn my-universe-btn font-weight-bold my-universe-input">GET STARTED</button>
                //     </Link>
                // </div>
        //     </div>
        //     <div className='col-12 col-md-6'>
                // <div className="d-none d-md-block">
                //     <img src={Peoples66} alt="" width="100%" />
                // </div>
        //     </div>
        // </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage)