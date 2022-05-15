import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from './../Redux/Actions/userAction'
import '../Supports/Stylesheets/DetailProfile.css';
import Verified from './../Supports/Images/Verified2.png';
import moment from 'moment';
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";

const DetailProfile = ({user}) => {

    let params = useParams();
    const [post, setPost] = useState([]);
   
    const [users, setUsers] = useState({
        usersData: {},
      });
      

    const [message, setMessage] = useState('')

    const fetchPosts = () => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        const userId = params.id;
        Axios.get(`${API_URL}/user/profileusers/${userId}`, headers)
        .then((res) => {
            setUsers({ ...users, usersData: res.data.results[0]})
            setPost(res.data.results2);
            console.log(' res.data.results detail profile',  res.data.results[0])
        })
        .catch((err) => {
            setMessage(err.response.data.message)
            console.log('ini err.response.data.message', err.response.data.message)
        })
    }

    useEffect(() => {
        fetchPosts();
        onCheckUserLogin()
      }, []);


    if(user.is_login) {
        return(
            <div className='my-universe-background-home'>
                <div className='container' style={{fontFamily: "Source Sans Pro"}} >
                <div className='container-edit'>
                    <div className='profile'>
                        <div className='profile-image'>
                            <img
                                src={API_URL + '/' + users.usersData.profileimage}
                                id='profile-image' alt="profile-image"
                            />
                        </div>
                        <div className='profile-user-settings d-flex flex-column'>
                            <h1 className="profile-user-name">
                            {users.usersData.username}
                            <span>
                            {
                                users.usersData.is_confirmed === 1?
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
                            {users.usersData.displayname}
                            </span>
                        </div>
                       
                        <div className='profile-bio' style={{paddingTop: '-10px'}} >
                            <p>
                            {/* <span className="profile-real-name" style={{color: 'black'}}>
                            {users.usersData.displayname}
                            </span> */}
                            <p style={{fontSize: '1.4rem', color: 'black'}}>{users.usersData.bio}</p>
                            </p>
                        <p  style={{color: 'grey', fontSize: '1.2rem', display: 'flex'}}>
                        <div style={{height: '20px', width: '20px', backgroundColor: 'grey', borderRadius: '50%'}}></div>
                        <span style={{marginTop: '-5px', marginLeft: '5px'}}>  {users.usersData.email}</span>
                        </p>
                        </div>
                    </div>
                </div>
                <div className='container-edit'  style={{borderTop: '1px solid grey'}}>
                    <div className='gallery mt-3'>
                        <div className='row'>
                        {post.map((item) => (
                        <>
                          <div className='col-12 col-md-6 col-lg-4 my-2'>
                        <div className="card product-card">
                            <Link  to={`/detailpost/${item.postId}`} style={{ textDecoration:"none", color: "inherit" }}>
                            <img src={`${API_URL + '/'}${item.image}`} alt="foto post" id="postImg" />
                            </Link>
                            <div className="mt-2">
                            <div className='d-flex flex-column'>
                                <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>{moment(item.created_at).format('LLL')}</span>
                            </div>
                        </div>
                        </div>
                        </div>
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
                        </>
                        ))}
                        </div>
                    </div>
                </div>
                </div>
            </div>
            )
    }else{
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

export default connect(mapStateToProps, mapDispatchToProps) (DetailProfile)
