import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from './../Redux/Actions/userAction'
import Verified from './../Supports/Images/Verified2.png';
import axios from 'axios';
import '../Supports/Stylesheets/Profile.css';
import Setting from './../Supports/Images/Setting.png';
import { API_URL } from '../Supports/Helpers/index';
import ProfilePosts from './ProfilePosts';
import Swal from 'sweetalert2';
import default1 from '../Supports/Images/default.jpg';

class Profile extends Component {
    state = { 
        profileimage: '',
        username: '',
        previewImage: null,
        displayname: '',
        bio: '',
        error: '',
        saveProfileSuccess: false,
        loading: false,
        listPosts: [], 
        addImageFileName: 'Select Image...', 
        addImageFile: undefined, 
        captionAdd: '',
        selectedEditPostId: 0,
        editImageFileName: 'Select Image...',
        editImageFile: undefined,
        captionEdit: '',
    }

    componentDidMount(){
        let token = localStorage.getItem('myTkn')
        this.props.onCheckUserVerify(token)
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/user/allusers`, headers)
        .then((res) => {
            this.setState({ listPosts: res.data })
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }


    onEditImageFileChange = (e) => {
        if(e.target.files[0]) {
            this.setState({ editImageFileName: e.target.files[0].name, editImageFile: e.target.files[0]})
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                if(reader.readyState === 2){
                    this.setState({previewImage: reader.result})
                }
            }
        }
        else {
            this.setState({ editImageFileName: 'Select Image...', editImageFile: undefined })
        }
    }

    onUsernameEditChange = (e) => {
        if(e.target.value.length <= 100) {
            this.setState({ username: e.target.value })
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Username can not more than 100 characters',
                icon: 'error',
                confirmButtonText: 'Okay!'
            })
        }
    }

     onBioEditChange = (e) => {
        if(e.target.value.length <= 100) {
            this.setState({ bio: e.target.value })
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Bio can not more than 100 characters',
                icon: 'error',
                confirmButtonText: 'Okay!'
            })
        }
    }

    onDisplayNameEditChange = (e) => {
        if(e.target.value.length <= 100) {
            this.setState({ displayname: e.target.value })
        }
    }

    onResendEmail = () => {
        let token = localStorage.getItem('myTkn')

        axios.post('http://localhost:5000/user/resend', {}, {headers: {
            'Authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            Swal.fire({
                title: 'Success!',
                text: 'Check Your Email',
                icon: 'success',
                confirmButtonText: 'Okay!'
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    onBtnUpdatePostClick = (id) => {
        var formData = new FormData()
        let token = localStorage.getItem('myTkn')
        var headers = {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }

        var data = {
            bio: this.state.bio,
            username: this.state.username,
            displayname: this.state.displayname
        }

        formData.append('image', this.state.editImageFile)
        formData.append('data', JSON.stringify(data))
        
        if(!data.username.match("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{4,}")) throw { message: Swal.fire({
            title: 'Error!',
            text: 'Username should be contain uppercase, number, and symbol',
            icon: 'error',
            confirmButtonText: 'Okay!'
        }) }
        axios.patch(API_URL + "/user/editprofiledata", formData, headers)
        .then((res) => {
            this.setState({ listPosts: res.data, selectedEditPostId: 0})
            Swal.fire({
                title: 'Success!',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'Okay!'
            })
            window.location.reload(false)
        })
        .catch((err) =>{
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'Okay!'
            })
        })
    }

    renderListPosts = () => {
        return this.state.listPosts.map((item, id) => {
            if(item.id !== this.state.selectedEditPostId) {
                return (
                <>
               <div className='container-new' style={{fontFamily: "Source Sans Pro"}}>
                   <div className='photo'>
                       <div>
                           {
                               item.profileimage ?
                               <img
                               src={API_URL + '/' + item.profileimage}
                               id='profile-image-pro' alt="profile-image"
                               />
                               :
                               <img
                               src={default1}
                               id='profile-image-pro' alt="profile-image"
                               />
                           }
                      
                       </div>

                   </div>
                   <div className='name mt-5'>
                   {item.username}
                    {
                        this.props.user.is_confirmed === 1?
                        <>
                        <span className='ml-2'>
                        <img height='20px' width='20px' src={Verified} alt="verified" style={{marginTop: '-10px'}} />
                        </span>
                        </>
                            :
                        <span>
                        
                        </span>
                    }
                   </div>
                   <div className='label d-flex flex-column'>
                        <div style={{fontSize: '30px'}}>
                        {item.displayname}
                        </div>
                        <div className='description mb-2' style={{fontSize: '18px'}}>
                        {item.bio}
                      
                        </div>
                        <div className='d-flex'>
                            <div className='mt-1' style={{height: '15px', width: '15px', backgroundColor: 'grey', borderRadius: '50%'}}></div>
                            <span style={{marginTop: '0px', marginLeft: '5px'}}>  {item.email}</span>
                        </div>
                    </div>
                    <div className='description'>
                        {
                            this.props.user.is_confirmed === 1?
                            <>
                            <span className=''>
                            <input style={{fontFamily: "Source Sans Pro"}} type="button" value="Edit Profile"  className="btn btn-outline-dark"  onClick={() => this.setState({ selectedEditPostId: item.id, username: item.username, displayname: item.displayname, bio: item.bio })} />     
                            </span>
                            </>
                                :
                            <span>
                                <input  className="btn btn-outline-dark" type="button" value="Resend Email Confirmation" onClick={() => this.onResendEmail()} />     
                            </span>
                        }
                    </div>
               </div>
               <div className='container'>
                   <div className='link-grid'>
                       <div className='tab-link'>
                           <Link to='/profile' style={{ textDecoration:"none", color: "black", cursor: 'pointer' }}>
                           <span>
                           Posts
                           </span>
                           </Link>
                       </div>
                       <div className='tab-link mx-5'>
                          <Link to='/likedpage' style={{ textDecoration:"none", color: "black", cursor: 'pointer' }}>
                           <span>
                           Liked
                           </span>
                           </Link>
                       </div>
                   </div>
               </div>
               <div className='container ml-5'>
               <ProfilePosts/>
               </div>
                </>
                )
            }
            
            return (
                <div className='container-fluid'>
                <div className='pt-3'>     
                    <div className='container'>
                        <div className='row' style={{paddingBottom: '42px'}}>
                            <div className="col-6 mt-5">
                                <div className="d-none d-md-block mt-3">
                                    <img src={Setting}  alt="" width="100%" />
                                </div>
                            </div>
                            <div className="col-6" style={{fontFamily: "Source Sans Pro"}}>
                                <div className='pt-4 mt-5' style={{width: '400px'}}>
                                     <div  className="text-xl-left">
                                        {
                                            this.state.previewImage? 
                                            <img src={this.state.previewImage} alt='Image Preview' className='userImgSet' /> 
                                            : 
                                            item.profileimage?
                                            <img src={`${API_URL + '/'}${item.profileimage}`} alt='Image Preview' className='userImgSet' />
                                            :
                                            <img  src={default1} alt='Image Preview' className='userImgSet' />
                                        }
                                        <input id="editImagePost" className='mx-3' type="file" label={this.state.editImageFileName} onChange={this.onEditImageFileChange} />
                                    </div>
                                    <div>
                                            <label htmlFor="editUserFullname" className="text-xl-left" style={{fontFamily: "Source Sans Pro"}}>
                                            Fullname
                                            </label>
                                            <input
                                            value={this.state.displayname} onChange={this.onDisplayNameEditChange}
                                            name="editUserFullname"
                                            type="text"
                                            id="editUserFullname"
                                            placeholder="Fullname"
                                            className="form-control"
                                            />
                                        </div>
                                        <div>
                                            <label htmlFor="editUserUsername" className="text-xl-left" style={{fontFamily: "Source Sans Pro"}}>
                                            Username
                                            </label>
                                            <input
                                            value={this.state.username} onChange={this.onUsernameEditChange}
                                            name="editUserUsername"
                                            type="text"
                                            id="editUserUsername"
                                            placeholder="Username"
                                            className="form-control"
                                            />
                                        </div>
                                        <div className='mb-4'>
                                            <label htmlFor="editUserBio" className="text-xl-left" style={{fontFamily: "Source Sans Pro"}}>
                                            Bio
                                            </label>
                                            <textarea
                                            value={this.state.bio} onChange={this.onBioEditChange}
                                            name="editUserBio"
                                            id="Bio"
                                            type="text"
                                            placeholder="Bio"
                                            className="form-control"
                                            />
                                        </div>
                                        <div className="d-flex" style={{marginTop: '-10px'}}>
                                        <input style={{fontFamily: "Source Sans Pro"}} className="btn btn-outline-dark w-50" type="button" value="Cancel" onClick={() => this.setState({ selectedEditPostId: 0 })} />
                                        <input style={{fontFamily: "Source Sans Pro"}} className="btn btn-outline-primary w-50 mx-2" type="button" value="Save" onClick={() => this.onBtnUpdatePostClick(item.id)} />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
            )
        })
    }

    render() {
        if(this.props.user.is_login) {
            return(
            <div className='pt-3'>
                {this.renderListPosts()}
            </div>
            )
        
        }
        
        return <Navigate to='/landing' />
    }
}


const mapDispatchToProps = {
    onUserLogin, onCheckUserLogin, onCheckUserVerify
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);