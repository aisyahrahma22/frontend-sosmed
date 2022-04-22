import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {onUserLogin, onCheckUserLogin } from './../Redux/Actions/userAction'
import ManagePosts from './ManagePosts';


class Profile extends Component {
   
    render() {
        if(this.props.user.is_login) {
            return (
                <div className="profile card-home home">
                <div className="profile-info row">
                    <div className="col s4 left">
                        <img className="profile-img" src='https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="profile-img" />
                    </div>
                    <div className="col s8 profile-data">
                        <div className={"profile-flex"} >
                            <span className="username profile-flex-item">{this.props.username}</span>
                        </div>
                        <span className="text-center">Bio</span>
                    </div>
                </div>
                <span className="full-name"><strong>Full name</strong></span><br /><br />
                        <div>
                            <Link to="/editprofile" >< div className="btn black" style={{ width: '48%', marginLeft: '2%', borderRadius: '0.3rem' }}><strong className="white-text">Edit Profile</strong></div></Link>
                           < div className="btn black" style={{ width: '48%', marginLeft: '2%', borderRadius: '0.3rem' }}><strong className="white-text">Show My Posts</strong></div> 
                        </div>
                <hr className="hr-profile" />
                <div className="row center">
                    {/* <ManagePosts/> */}
                </div>
                <hr className="hr-profile" />

            </div>
            )
        }
        
        return <Navigate to='/landing' />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);