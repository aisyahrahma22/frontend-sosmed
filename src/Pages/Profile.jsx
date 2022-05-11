import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from './../Redux/Actions/userAction'
import ManagePosts from './ManagePosts';
import Verified from './../Supports/Images/Verified.png';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import ProfilePosts from './ProfilePosts';
import Swal from 'sweetalert2';
import '../Supports/Stylesheets/Coba.css';
import ProfilePost from '../Components/CardProfilePost';



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
            console.log(res)
            console.log('ini res.data get',res.data)
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
        // console.log(e.target.value)
        if(e.target.value.length <= 100) {
            this.setState({ username: e.target.value })
        }
    }

     onBioEditChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value.length <= 100) {
            this.setState({ bio: e.target.value })
        }
    }

    onDisplayNameEditChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value.length <= 100) {
            this.setState({ displayname: e.target.value })
        }
    }

    onBtnUpdateImage = (id) => {
        var formData = new FormData()
        let token = localStorage.getItem('myTkn')
        var headers = {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }
       
        formData.append('image', this.state.editImageFile)

        axios.put(API_URL + "/user/editprofileimage", formData, headers)
        .then((res) => {
            this.setState({ listPosts: res.data, selectedEditPostId: 0 })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    onResendEmail = () => {
        let token = localStorage.getItem('myTkn')

        axios.post('http://localhost:5000/user/resend', {}, {headers: {
            'Authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            alert('Check Your Email!')
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
            console.log(res)
            this.setState({ listPosts: res.data, selectedEditPostId: 0})
            Swal.fire({
                title: 'Success!',
                text: res.data.message,
                icon: 'success',
                confirmButtonText: 'Okay!'
            })
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
            console.log('ini item',item)
            if(item.id !== this.state.selectedEditPostId) {
                return (
                <>
                    <div className='container-edit' key={id}>
                        <div className='profile'>
                            <div className='profile-image'>
                            <img src={`${API_URL + '/'}${item.profileimage}`} id='profile-image' alt="profile-image"/>
                            </div>
                            <div className='profile-user-settings'>
                                <h1 className="profile-user-name">{item.username}</h1>
                                {
                                    this.props.user.is_confirmed === 1?
                                    <>
                                     <button className="btn-edit profile-edit-btn" onClick={() => this.setState({ selectedEditPostId: item.id, username: item.username, displayname: item.displayname, bio: item.bio })}>Edit Profile</button>
                                    </>
                                        :
                                    <span className="ml-3">
                                       <button className="btn-edit profile-edit-btn">Edit Profile</button>   
                                    </span>
                                }
                            </div>
                            <div className='profile-stats'>
                            {
                            this.props.user.is_confirmed === 1?
                            <>
                             <span class="profile-stat-count"> account verified
                            </span>  
                            <span className='ml-2'>
                            <img height='20px' width='20px' src={Verified} alt="" />
                            </span>
                            </>
                                :
                            <span className="">
                                <input type="button" value="Resend Email Confirmation" onClick={() => this.onResendEmail()} className="btn rounded shadow-lg" />     
                            </span>
                            }
                            </div>
                            <div className='profile-bio'>
                            <p><span className="profile-real-name mx-2">{item.displayname}</span>"{item.bio}"</p>
                            <p><span className="profile-real-name mx-2">Email:</span>{item.email}</p>
                            </div>
                        </div>
                    </div>
                    <div className='container-edit' style={{borderTop: '1px solid grey'}}>
                       <ProfilePosts/>
                       {/* <ProfilePost/> */}

                    </div>
                </>
                )
            }
            
            return (
                <>
                 <div className="container">
                    <div className="row justify-content-center align-items-center" style={{height: '80vh'}}>
                        <div className="col-6 text-center px-5 py-5 rounded"  style={{border: '1px solid plum'}}>
                            <h1>Setting your Account!</h1>
                           <div className='d-flex mt-5'>
                           <div className='col-4'>
                           {
                                 this.state.previewImage? <img src={this.state.previewImage} alt='Image Preview'  id='profile-img-edit' width='30%' /> : 'Image Preview'
                            }
                            </div>
                            <div className='col-4'>
                            <input id="editImagePost" type="file" label={this.state.editImageFileName} onChange={this.onEditImageFileChange} multiple />
                            </div>
                           </div>
                           <div className='d-flex mt-4'>
                               <div className='col-4'>
                               <h5>username:</h5>
                               </div>
                               <div className='col-3'>
                               <input type='text' value={this.state.username} onChange={this.onUsernameEditChange}/>
                               </div>
                           </div>
                           <div className='d-flex mt-2'>
                                <div className='col-4'>
                               <h5 className=''>displayname:</h5>
                               </div>
                               <div className='col-4'>
                               <input type='text'value={this.state.displayname} onChange={this.onDisplayNameEditChange}/>
                               </div>
                           </div>
                           <div className='d-flex mt-2'>
                                <div className='col-4'>
                               <h5>bio:</h5>
                               </div>
                               <div className='col-4'>
                               <textarea value={this.state.bio} onChange={this.onBioEditChange}></textarea>
                               </div>
                           </div>
                           <div className='d-flex mt-3'>
                            <input className="btn btn-primary w-50" type="button" value="Cancel" onClick={() => this.setState({ selectedEditPostId: 0 })} />
                            <input className="btn btn-danger w-50 mx-2" type="button" value="Save" onClick={() => this.onBtnUpdatePostClick(item.id)} />
                        </div>
                        </div>
                    </div>
                </div>
                </>
            )
        })
    }

    render() {
        if(this.props.user.is_login) {
            return(
            <div className='container'>
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