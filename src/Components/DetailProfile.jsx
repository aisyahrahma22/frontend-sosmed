import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from './../Redux/Actions/userAction'
import '../Supports/Stylesheets/Coba.css';

const DetailProfile = ({user}) => {

    let params = useParams();
    const [post, setPost] = useState([]);
   
    const [users, setUsers] = useState({
        userData: {},
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
            setUsers({ ...users, userData: res.data.results[0]})
            setPost(res.data.results2);
            console.log('ini res', res)
            console.log('ini res data', res.data)
            console.log('ini  res.data.results[0]',  res.data.results[0])
            console.log('ini  res.data.results',  res.data.results)
            console.log('ini  res.data.results2',  res.data.results2)
        })
        .catch((err) => {
            setMessage(err.response.data.message)
            console.log('ini err.response.data.message', err.response.data.message)
        })
    }

    useEffect(() => {
        fetchPosts();
        onCheckIsLogedIn();
        onCheckUserLogin()
      }, []);

     const [isLogedIn, setisLogedIn] = useState(false);
     const onCheckIsLogedIn = () => {
        let token = localStorage.getItem('myTkn')

        if(token){
            setisLogedIn(true)
        }
    }


    if(user.is_login) {
        return(
            <>
                <div className='container'>
                <div className='container-edit'>
                    <div className='profile'>
                        <div className='profile-image'>
                            <img
                                src={API_URL + '/' + users.userData.profileimage}
                                id='profile-image' alt="profile-image"
                            />
                        </div>
                        <div className='profile-user-settings'>
                            <h1 className="profile-user-name">
                            {user.userData.username}
                            </h1>
                        </div>
                       
                        <div className='profile-bio'>
                        <p><span className="profile-real-name mx-2">
                        {users.userData.displayname}
                        </span>
                        "{users.userData.bio}"
                        </p>
                        <p><span className="profile-real-name mx-2">Email:</span>
                        {users.userData.email}
                        </p>
                        </div>
                    </div>
                </div>
                <div className='container-edit' style={{borderTop: '1px solid grey'}}>
                    <div className='gallery'>
                        <div className='row'>
                        {post.map((item) => (
                        <>
                         <div className='col-lg-4 col-md-6 col-12'>
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
                        </div>
                        </>
                        ))}
                        </div>
                    </div>
                </div>
                </div>
            </>
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
