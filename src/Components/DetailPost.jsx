import React, { useEffect, useState } from 'react';
import { useParams, Navigate, Link  } from 'react-router-dom';
import Axios from 'axios';
import { connect } from 'react-redux';
import '../Supports/Stylesheets/DetailPost.css';
import { API_URL } from '../Supports/Helpers/index';
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from './../Redux/Actions/userAction'

import moment from 'moment';
import Swal from 'sweetalert2';

const DetailPost = ({user}) => {

    let params = useParams();
    const [post, setPost] = useState({
        postData: {},
      });
     
    const [comment, setComment] = useState([]);
    const [likes, setLikes] = useState([]);
    
    const [message, setMessage] = useState('')
    const [commentAdd, setCommentAdd] = useState('')
    const [liked, setLiked] = useState(false)
    const [ showAll, setShowAll] = useState(false)

    const fetchPosts = () => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        const postId = params.id;
        
        Axios.get(`${API_URL}/post/get/${postId}`, headers)
        .then((res) => {
            setPost({ ...post, postData: res.data.results[0]});
            // setComment(res.data.comment);
            console.log(res.data.results[0])
            setLikes(res.data.likes);

        })
        .catch((err) => {
            setMessage(err.response.data.message)
        })
    }

    const getComments = () => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        const postId = params.id;
        
        Axios.get(`${API_URL}/post/getcomment/${postId}`, headers)
        .then((res) => {
            setComment(res.data);
            console.log('ini res.data comment', res.data)

        })
        .catch((err) => {
            setMessage(err.response.data.message)
        })
    }
    

    

    useEffect(() => {
        fetchPosts();
        onCheckUserLogin();
        getComments()
      }, []);

    const onCommentAddChange = (e) => {
        if(e.target.value.length <= 300) {
            setCommentAdd(e.target.value)
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Comment can not more than 300 characters',
                icon: 'error',
                confirmButtonText: 'Okay!'
            })
        }
    }

      const onBtnAddCommentClick = (id) => {
        let token = localStorage.getItem('myTkn')
        var headers = {
            headers: {
                'Authorization': `${token}`,
            }
        }


        var data = {
            comment: commentAdd
        }

        Axios.post(API_URL + `/post/addcomment/${id}`, data, headers)
        .then((res) => {
            setCommentAdd('')
            window.location.reload(false)
        })
        .catch((err) =>{
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'Okay!',
                timer: 1500
            })
        })
        
      };
     const onBtnDeletePostClick = (id) => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        Axios.delete(`${API_URL}/post/deletepost/${id}`,headers)
        .then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }


      const SHOW_BY_DEFAULT = 5;
      const visibleOptions = showAll ? comment.length : SHOW_BY_DEFAULT;
       const toggleShowAll = () => {
        setShowAll(!showAll);
      };

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
        }).catch((err) => {
            console.log(err)
        })
    }


   if(user.is_login){
    return(
    <div className='container-fluid my-universe-background-dpost'>
        <div className='pt-3' style={{paddingBottom: '13px'}}>
            <div className='container'>
            <div className="app-detail rounded" style={{backgroundColor: 'white'}}>
                <div className="details">
                        <div className="big-img">
                            <img src={API_URL + '/' + post.postData.image} alt="post-gambar" className='detail-post-img'/>
                        </div>
                        <div className="box">
                        <div id="content">
                        <div className="row">
                                <span>
                                <img
                                    style={{borderRadius: '50%'}}
                                    src={API_URL + '/' + post.postData.profileimage}
                                    className ='userImgDet'
                                    alt="gambar"
                                />
                            </span>
                            
                            <Link to={`/detailprofile/${post.postData.userId}`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}}>
                            <h2 className='mx-3 mt-2' style={{fontFamily: "Source Sans Pro", fontSize: '25px'}}>{post.postData.displayname}</h2>
                            </Link>
                            </div>
                            <div>
                            {likes.includes(post.postData.id)  ? (
                                <img src={HeartFilled} alt="" id="cardIconDet" onClick={() => handleClick(post.postData.id)} />
                                ) : (
                                <img
                                    src={Heart}
                                    alt="heart"
                                    id="cardIconDet"
                                    onClick={() => handleClick(post.postData.id)}
                                />
                            )}
                            <span style={{fontSize: '14px', color: 'purple', marginTop: '0px', fontFamily: "Source Sans Pro"}}>{post.postData.totalLike} peoples love this</span>
                            </div>
                            <div className='mt-2'>
                                <div style={{fontSize: '12px'}}>
                                    {moment(post.postData.created_at).format('LLL')}
                                </div>
                            </div>
                            <div className="d-flex mt-2">
                            <strong><span style={{fontFamily: "Source Sans Pro"}}>{post.postData.username}</span></strong>
                            <span style={{marginTop: '0px', marginLeft: '10px',  fontFamily: "Source Sans Pro" }}>{post.postData.caption}</span>
                            </div>
                            <div className='container'>
                            {comment.slice(0, visibleOptions).map(( item) => (
                                    <div className=''>
                                        <div className='d-flex' key={item.postId}>
                                            <span style={{fontSize: '14px', color: 'purple', fontWeight: 'bold', fontFamily: "Source Sans Pro"}}>
                                                {item.username} 
                                            </span>
                                            <span className='mx-2' style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>
                                            {item.comment}
                                            </span>
                                        <span className='mx-2 text-muted' style={{fontSize: '10px', fontFamily: "Source Sans Pro"}}>
                                        {/* {moment(item.created_at).format('LLL')} */}
                                        {/* {moment(item.created_at).startOf('day').fromNow()} */}
                                        </span>
                                        </div>
                                        <div className='text-muted' style={{fontSize: '10px', fontFamily: "Source Sans Pro"}}>
                                        {moment(item.created_at).startOf('day').fromNow()}
                                        </div>
                                   
                                    {/* <span className="material-icons"  style={{cursor: 'pointer', fontSize: '14px'}} onClick={() => onBtnDeletePostClick(item.postId)}>
                                    close
                                    </span> */}
                                    </div>
                            ))}
                            {comment.length > SHOW_BY_DEFAULT && (
                                <div onClick={toggleShowAll} style={{cursor: 'pointer', fontSize: '14px', color: 'darkblue', fontFamily: "Source Sans Pro"}}>
                                    {!showAll ? "Show more" : "Show Less"}
                                </div>
                            )}
                            </div>
                            <div className='d-flex mt-2'>
                                <input  style={{fontFamily: "Source Sans Pro"}} type='text' value={commentAdd} onChange={onCommentAddChange}  placeholder="Add comment.." className="form-control rounded-0 cart-comment" />
                                <span> <button disabled={!commentAdd} style={{fontFamily: "Source Sans Pro"}} onClick={() => onBtnAddCommentClick(post.postData.id)}  className="cart">
                                Post
                                </button></span>
                            </div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps) (DetailPost)