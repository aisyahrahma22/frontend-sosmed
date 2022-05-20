import React, { useEffect, useState } from 'react';
import { useNavigate, Link, Navigate } from 'react-router-dom';
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";
import moment from 'moment';
import '../Supports/Stylesheets/HomePage.css';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import default1 from '../Supports/Images/default.jpg';

function HomePost({post, pageNumber}) {
    const [liked, setLiked] = useState(false)
    const [likes, setLikes] = useState(post.totalLike)
    const [verify, setVerify] = useState('')

    useEffect(() => {
        post.myLike && setLiked(true)
        getUserVerify()
    }, [post, pageNumber])

    const handleClick = (id) => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
      
        axios.post(`${API_URL}/post/homelike/${id}`, {}, headers)
        .then((res) => {
          setLiked(true);
          setLikes(likes + 1)
          console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    const deleteHandleClick = (id) => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
      
        axios.delete(`${API_URL}/post/homeunlike/${id}`, headers)
        .then((res) => {
          setLiked(false);
          setLikes(likes - 1)
          console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    const getUserVerify = () => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }

        axios.get(`http://localhost:5000/user//userverify`,  headers)
            .then((res) => {
                setVerify(res.data[0].is_confirmed)
            }).catch((err) => {
                console.log(err)
            })
    }

    if(!localStorage.getItem('myTkn')){
        return(
            <Navigate to='/landing' />
        )
    }else{
        return (
            <>
             <div className='home-container'>
                    <div className='d-flex mb-2'>
                       {
                           post.profilepicture ?
                           <img  src={`${API_URL + '/'}${post.profilepicture}`} id="userImg" />
                           :
                           <img  src={default1} id="userImg" />
    
                       }
                       {
                           verify === 1 ?
                           <Link to={`/detailprofile/${post.userId}`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}}>
                           <span style={{fontFamily: "Source Sans Pro"}}>{post.username}</span>
                           </Link>
                           :
                           <span style={{fontFamily: "Source Sans Pro"}}>{post.username}</span>
                       }
                    </div>
                       {
                           verify === 1 ?
                           <Link  to={`/detailpost/${post.id}`}style={{ textDecoration:"none", color: "inherit" }}>
                           <img src={`${API_URL + '/'}${post.image}`} alt="foto post" id="postImg" />
                            </Link>
                           :
                           <img src={`${API_URL + '/'}${post.image}`} alt="foto post" id="postImg" />
                       }
                <div className='home-detail'>
                <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>{moment(post.created_at).format('LLL')}</span>
                </div>
                <div className='home-detail'>
                    <div className='d-flex'>
                        <div id='interaction'>
                       {
                           verify === 1 ?
                            <>
                           {liked ? (
                            <img src={HeartFilled} alt="" id="cardIcon"  onClick={() => deleteHandleClick(post.id)}/>
                            ) : (
                            <img
                                src={Heart}
                                alt=""
                                id="cardIcon"
                                onClick={() => handleClick(post.id)}
                               
                            />
                             )}
                            </>
                           :
                           <img
                                src={Heart}
                                alt=""
                                id="cardIcon"
                               
                            />
                       }
                        </div>
                        <span style={{fontSize: '12px', color: 'purple', marginTop: '5px', fontFamily: "Source Sans Pro"}}>
                            {likes} peoples love this
                        </span>
                     
                    </div>
                </div>
            </div>
         </>
        );
    }

   
}


export default HomePost