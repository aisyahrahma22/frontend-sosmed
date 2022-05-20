import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import Axios from 'axios';
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";
import default1 from '../Supports/Images/default.jpg';
import { API_URL } from '../Supports/Helpers/index';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from './../Redux/Actions/userAction'
import '../Supports/Stylesheets/DetailProfile.css';
import Verified from './../Supports/Images/Verified2.png';
import moment from 'moment';

const DetailProfile = ({user}) => {

    let params = useParams();
    const [post, setPost] = useState([]);
   
    const [users, setUsers] = useState({
        usersData: {},
      });
      

    const [message, setMessage] = useState('')
    const [likes, setLikes] = useState([])
    const [liked, setLiked] = useState(false)

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
            setLikes(res.data.likes)
        })
        .catch((err) => {
            setMessage(err.response.data.message)
        })
    }

    const [newPost, setNewPost] = useState([]);
    const getPosts = () => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        
        const userId = params.id;
        Axios.get(`${API_URL}/post/getpostuserbyid/${userId}`, headers)
        .then((res) => {
            console.log(res)
            setNewPost(res.data)
        })
        .catch((err) => {
            setMessage(err.response.data.message)
        })
    }


    useEffect(() => {
        fetchPosts();
        getPosts();
        onCheckUserLogin()
      }, []);

      const handleClick = (id) => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        }
      
        Axios.post(`${API_URL}/post/likepost/${id}`, {}, headers)
        .then((res) => {
          fetchPosts()
          setLiked(true);
          console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    if(user.is_login) {
        return(
            <>
            <div className='pt-3'>
            <div className='container-new' style={{fontFamily: "Source Sans Pro"}}>
                <div className='photo'>
                    <div>
                   {
                       users.usersData.profileimage ?
                       <img
                       src={API_URL + '/' + users.usersData.profileimage}
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
                {users.usersData.username}
                 {
                     users.usersData.is_confirmed === 1?
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
                     {users.usersData.displayname}
                     </div>
                     <div className='description mb-2' style={{fontSize: '18px'}}>
                     {users.usersData.bio}
                    {/* <div> Pitchfork tilde lomo chillwave keytar, tofu chartreuse letterpress mumblecore.mixtape palo santo kit</div> */}
                    
                     </div>
                     <div className='d-flex'>
                         <div className='mt-1' style={{height: '15px', width: '15px', backgroundColor: 'grey', borderRadius: '50%'}}></div>
                         <span style={{marginTop: '0px', marginLeft: '5px'}}>  {users.usersData.email}</span>
                     </div>
                 </div>
                 <div className='description'>
                     
                 </div>
            </div>
            <div className='container'>
                <div className='link-grid'>
                   
                </div>
            </div>
            <div className='container ml-5 mb-3'>
                <div className='row ml-5 pl-3'>
                    {newPost.map((item) => (
                    <>
                    <div className='col-12 col-md-6 col-lg-4 my-2'>
                        <div className="card product-card">
                            <Link  to={`/detailpost/${item.id}`} style={{ textDecoration:"none", color: "inherit" }}>
                            <img src={`${API_URL + '/'}${item.image}`} alt="foto post" id="postImg" />
                            </Link>
                            <div className="mt-2">
                                <div className='d-flex flex-column'>
                                    <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>{moment(item.created_at).format('LLL')}</span>
                                </div>
                            </div>
                            <div>
                            {/* {likes.includes(item.id)  ? (
                                <img src={HeartFilled} alt="" id="cardIconDet" onClick={() => handleClick(item.id)} />
                                ) : (
                                <img
                                    src={Heart}
                                    alt="heart"
                                    id="cardIconDet"
                                    onClick={() => handleClick(item.id)}
                                />
                            )} */}
                            </div>
                            <span className='mt-2' style={{color: 'black', fontSize: '14px', fontWeight: 'light', fontFamily: "Source Sans Pro"}}>
                            {item.caption}
                            </span>
                        </div>
                    </div>
                    </>
                    ))}
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
