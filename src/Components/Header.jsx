import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import '../Supports/Stylesheets/Navbar.css';
import { CreatePost } from './CreatePost';
// Redux
import {connect} from 'react-redux';
import {onUserLogin, onCheckUserLogin, onUserLogout, onCheckUserVerify } from './../Redux/Actions/userAction'

class Header extends React.Component{

        constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.state = {
          isOpen: false
        };
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onBtnLogOutClick = () => {
        this.props.onUserLogout()
    }



    render(){
        if(this.props.user.is_login){
            return(
                <div className='container-fluid' style={{position: 'fixed', zIndex: '2', width: '100%', background: 'white'}}>
                    <div className='row'>
                        <div className='col-12 col-md-6'>
                        <div className='d-flex mx-5'>
                        <Link to="/" style={{ textDecoration: "none", color: 'black' }}>
                                <h3 className='ml-5 px-3 my-universe-font-size-40 pb-3' id='my-universe-navbar-logo' >
                                myUniverse
                                </h3>
                            </Link>
                        </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className='d-flex justify-content-center mt-4'>
                                <div className='mx-3'>
                                    <Link to="/">
                                        <span class="material-icons" style={{cursor: 'pointer', color: 'rgb(91, 1, 132)'}}>
                                            home
                                        </span>  
                                    </Link>
                                </div>
                                <div className='mx-3' style={{cursor: 'pointer'}}>
                                    {
                                        this.props.user.is_confirmed === 1?
                                    <>
                                        <CreatePost
                                            modalOpen={this.state.modalOpen}
                                            handleModal={this.handleModalLogin}
                                        />
                                    </>
                                            :
                                        <span className="ml-3">
                                            <span className="material-icons"  style={{cursor: 'pointer', color: 'rgb(91, 1, 132)'}}>
                                            add_a_photo
                                            </span>
                                        </span>
                                    }
                                </div>
                                <div className='mx-3'>
                                    <Link to="/profile">
                                        <span class="material-icons" style={{cursor: 'pointer', color: 'rgb(91, 1, 132)'}}>
                                            account_circle
                                        </span>
                                    </Link>
                                </div>
                                <div className='mx-3'>
                                    <span class="material-icons" style={{cursor: 'pointer', color:'rgb(91, 1, 132)'}} onClick={this.onBtnLogOutClick}>
                                        logout
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

        return(
        <div id= 'navbar' className='row'>
            <div className='col-12 col-md-6 col-lg-6 align-self-center'>
                <div className=''>
                    <Link to="/" style={{ textDecoration: "none" }}>
                        <h3 className='ml-5 px-3 my-universe-font-size-40' id='my-universe-navbar-logo'>
                            myUniverse
                        </h3>
                    </Link>
                </div>
            </div>
            <div className='col-12 col-md-6 col-lg-6 '>
                 <div className='d-flex flex-wrap justify-content-center align-items-center h-100'>
                     <span className="ml-3">
                         <Link to="/login">
                             <button value="Login" className="btn my-universe-btn-nav-01">LOG IN</button>
                         </Link>
                     </span>
                     <span className="ml-3">
                         <Link to="/register">
                             <button value="Register" className="btn my-universe-btn-nav-02">REGISTER</button>
                         </Link>
                     </span>
                 </div>
             </div>
         </div>
        )
    }
}

const mapDispatchToProps = {
    onUserLogin, onCheckUserLogin, onUserLogout, onCheckUserVerify
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Header)