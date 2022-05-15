import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from '../Redux/Actions/userAction'
import Verified from './../Supports/Images/Verified2.png';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import LikedPost from './LikePost';
import Swal from 'sweetalert2';
// import '../Supports/Stylesheets/Coba.css';
import Peoples88 from '../Supports/Images/Peoples88.png';
import '../Supports/Stylesheets/Profile2.css';

class LikedPage extends Component {
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
        if(e.target.value.length <= 100) {
            this.setState({ username: e.target.value })
        }
    }

     onBioEditChange = (e) => {
        if(e.target.value.length <= 100) {
            this.setState({ bio: e.target.value })
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
            alert('Check Your Email!')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // onBtnUpdateImage = (id) => {
    //     var formData = new FormData()
    //     let token = localStorage.getItem('myTkn')
    //     var headers = {
    //         headers: {
    //             'Authorization': `${token}`,
    //             'Content-Type': 'multipart/form-data'
    //         }
    //     }
       
    //     formData.append('image', this.state.editImageFile)

    //     axios.put(API_URL + "/user/editprofileimage", formData, headers)
    //     .then((res) => {
    //         this.setState({ listPosts: res.data, selectedEditPostId: 0 })
    //     })
    //     .catch((err) =>{
    //         console.log(err)
    //     })
    // }


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
            console.log('ini item',item)
            if(item.id !== this.state.selectedEditPostId) {
                return (
                    <>
                     <div className='my-universe-background-home' key={id}>
                    <div className='container' style={{fontFamily: "Source Sans Pro"}} >
                    <div className='container-edit'>
                        <div className='profile'>
                            <div className='profile-image'>
                                <img
                                    src={API_URL + '/' + item.profileimage}
                                    id='profile-image' alt="profile-image"
                                />
                            </div>
                            <div className='profile-user-settings d-flex flex-column'>
                                <h1 className="profile-user-name">
                                {item.username}
                                <span>
                                {
                                    this.props.user.is_confirmed === 1?
                                    <>
                                    <span className='ml-2'>
                                    <img height='30px' width='30px' src={Verified} alt="verified" style={{marginTop: '-10px'}} />
                                    </span>
                                    </>
                                        :
                                    <span>
                                    
                                    </span>
                                }
                                </span>
                                </h1>
                                <span className="profile-real-name" style={{color: 'black', fontSize: '30px', fontWeight: 'light'}}>
                                {item.displayname}
                                </span>
                            </div>
                        
                            <div className='profile-bio' style={{paddingTop: '-10px'}} >
                                <p>
                                {/* <span className="profile-real-name" style={{color: 'black'}}>
                                {users.usersData.displayname}
                                </span> */}
                                <p style={{fontSize: '1.4rem', color: 'black'}}>{item.bio}</p>
                                </p>
                            <p  style={{color: 'grey', fontSize: '1.2rem', display: 'flex'}}>
                            <div style={{height: '20px', width: '20px', backgroundColor: 'grey', borderRadius: '50%'}}></div>
                            <span style={{marginTop: '-5px', marginLeft: '5px'}}>  {item.email}</span>
                            </p>
                            </div>
                        </div>
                    </div>
                    <div className='container-edit'>
                    <div className='row border-top-0 border-left-0 border-right-0' id='row-nav'>
                        <div className='col-3'></div>
                        <div className='col-3'>
                            <Link to='/profile'  style={{ textDecoration:"none", color: "black", cursor: 'pointer' }}>
                                <span  id='my-universe-nav-posts'>
                                Posts
                                </span>
                            </Link>
                        </div>
                        <div className='col-3'>
                            <Link to = '/likedpage' style={{ textDecoration:"none", color: "black", cursor: 'pointer' }}>
                                <span  id='my-universe-nav-posts'>
                                Liked
                                </span>
                            </Link>
                        </div>
                        <div className='col-3'></div>
                    </div>
                    </div>
                    <div className='container-edit'>
                        <div className='gallery mt-3'>
                            <div className='row'>
                            <LikedPost/>
                             {/* <div className='col-lg-4 col-md-6 col-12'>
                                <div className='d-flex'>
                                    <div className='mt-3'>
                                        <div className="gallery-item" tabindex="0">
                                            <img  src={API_URL + '/' + item.image} alt={`${item.image}`} className="gallery-image"/>
                                            <div className='gallery-item-info'>
                                                <ul>
                                                    <Link to={`/detailpost/${item.postId}`} style={{cursor: 'pointer'}}>
                                                    <li className="gallery-item-likes"><span className="visually-hidden"></span><i className="fas fa-heart" aria-hidden="true"></i>detail</li>
                                                    </Link>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                            </div>
                        </div>
                    </div>
                    </div>
                </div>
                    </>
                // <>
                //    <div className="i" key={id}>
                //         <div className="i-left">
                //             <div className="i-left-wrapper">
                //                  <p>
                //                 {
                //                     this.props.user.is_confirmed === 1?
                //                     <>
                //                     <span className="profile-stat-count" style={{fontFamily: "Source Sans Pro"}}>verified
                //                     </span>  
                //                     <span className='ml-2'>
                //                     <img height='20px' width='20px' src={Verified} alt="" />
                //                     </span>
                //                     </>
                //                         :
                //                     <span className="" style={{fontFamily: "Source Sans Pro"}}>
                //                         verify your account
                //                     </span>
                //                 }
                //                 </p>
                //                 <h2 className="i-intro" style={{fontFamily: "Source Sans Pro"}}>Hello, My name is</h2>
                //                 <h1 className="i-name" style={{fontFamily: "Source Sans Pro"}}>{item.displayname}</h1>
                //                 <p className="i-desc">
                //                     <h4 className="a-award-title mx-2" style={{fontFamily: "Source Sans Pro", fontSize: '16px'}}> {item.bio} -  {item.username}</h4>
                //                 </p>
                //                 <p className="i-desc" style={{fontFamily: "Source Sans Pro", marginLeft: '10px', marginTop: '-20px'}}>
                //                 contact me on {item.email}
                //                 </p>
                //                 <div>
                //                 {
                //                     this.props.user.is_confirmed === 1?
                //                     <>
                //                      <button style={{fontFamily: "Source Sans Pro"}} className="btn-edit profile-edit-btn" onClick={() => this.setState({ selectedEditPostId: item.id, username: item.username, displayname: item.displayname, bio: item.bio })}>Edit Profile</button>
                //                     </>
                //                         :
                //                     <span className="ml-3">
                //                       <input type="button" value="Resend Email Confirmation" onClick={() => this.onResendEmail()} className="btn rounded shadow-lg" />  
                //                     </span>
                //                 }
                //                 </div>
                //             </div>
                //         </div>
                //         <div className="i-right">
                //             <div className="i-bg"></div>
                //             <img src={`${API_URL + '/'}${item.profileimage}`} alt="" className="i-img" />
                //         </div>
                //         </div>
                //         <div className=''>
                //         <div className="pl">
                //             <div className='col-12 mb-3' style={{borderTop: '1px solid purple'}}></div>
                //             <div className='left'>
                //                 <span style={{fontFamily: "Source Sans Pro"}}>Favorite</span>
                //                 <h1 style={{fontFamily: "Source Sans Pro"}}>COLLECTION PAGE</h1>
                //                 </div>
                //             <div className='col-12 mt-3' style={{borderTop: '1px solid purple'}}></div>
                //             <div className="pl-texts">

                //                 {/* <h1 className="pl-title">Create & inspire with myUniverse</h1> */}
                //                 {/* <p className="pl-desc">
                //                 my Universe is a creative platform that your future has been waiting for.
                //                 Beautiful homes, stunning social media styles & a whole lot more awaits
                //                 inside.
                //                 </p> */}
                //             </div>
                //             <div className="pl-list">
                //             <LikedPost/>
                //             </div>
                //             </div>
                //         </div>
                // </>
                )
            }
            
            return (
                <>
                 <div className="container pt-5 pb-2">
                    <div className="modal_container">
                        <div className="m-5">
                        <div className="modal-content">
                            <div className="modal-header">
                            <h2 className='text-center' style={{fontFamily: "Source Sans Pro"}}>Setting your Account!</h2>
                            </div>
                            <div className="modal-body">
                            <div  className="text-xl-left">
                            {
                                 this.state.previewImage? <img src={this.state.previewImage} alt='Image Preview'  id='profile-img-edit' width='30%' /> : <img src={`${API_URL + '/'}${item.profileimage}`} alt='Image Preview'  id='profile-img-edit' width='30%' />
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
                            <div>
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
                            </div>
                            <div className="modal-footer" style={{marginTop: '-10px'}}>
                            <input style={{fontFamily: "Source Sans Pro"}} className="btn btn-primary w-50" type="button" value="Cancel" onClick={() => this.setState({ selectedEditPostId: 0 })} />
                            <input style={{fontFamily: "Source Sans Pro"}} className="btn btn-danger w-50 mx-2" type="button" value="Save" onClick={() => this.onBtnUpdatePostClick(item.id)} />
                            </div>
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
            <div className=''>
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

export default connect(mapStateToProps, mapDispatchToProps)(LikedPage);