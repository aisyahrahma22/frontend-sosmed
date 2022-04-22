import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {onUserLogin, onCheckUserLogin} from './../Redux/Actions/userAction'
import '../Supports/Stylesheets/Profile.css';

class EditProfile extends Component {
   
    render() {
        if(this.props.user.is_login) {
            return (
            <div className="home card card-home" style={{ minHeight: '65vh' }}>
                <div>
                    <form method="post">
                        <div className="post-top-part">
                            Edit Profile
                        </div>
                        <hr />
                        <div>
                            <img style={{ marginLeft: '34%' }} className="profile-img" src='https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="profile-img" />
                        </div>
                        <div style={{ marginLeft: '34%' }}>
                            <strong><Link to="/updateProfilePhoto" className="blue-text text-darken-2">Change Profile Photo</Link></strong>
                        </div>
                        <div style={{ marginTop: '1rem' }}>
                            <div className="row mt-2">
                                <div className="ep-labelDiv col">Name</div>
                                <input className="col ep-input" type="text" spellCheck="false" autoComplete="off" id="fullname" name="fullname" placeholder="Name" />
                            </div>
                            <div className="row  mt-3">
                                <div className="col ep-labelDiv">Username</div>
                                <input className="col ep-input" type="text" spellCheck="false" autoComplete="off" id="username" name="username" placeholder="Username" />
                            </div>
                            <div className="row  mt-3">
                                <div className="col ep-labelDiv">Email</div>
                                <input className="col ep-input" type="email" spellCheck="false" autoComplete="off" id="email" name="email" placeholder="Email"/>
                            </div>
                            <div className="row  mt-3">
                                <div className="col ep-labelDiv">Bio</div>
                                <input className="col ep-input" type="text" spellCheck="false" autoComplete="off" id="email" name="email" placeholder="Email"/>
                            </div>
                        </div>
                        <div className='d-flex justify-content-around mt-4'> 
                            <i className="ep-cancelBtn fas">Cancel</i>
                            <i className="fas ep-headerTitle">Edit Profile</i>
                            <i className="blue-text text-darken-2 fas ep-doneBtn">Done</i>
                        </div>
                    </form>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(EditProfile);