import React, { useEffect, useState } from 'react';
import { useParams, Navigate, useNavigate  } from 'react-router-dom';
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
    const navigate = useNavigate();

    let params = useParams();
    const [post, setPost] = useState({
        postData: {},
      });

      console.log(post)
      console.log('ini comment'. comment)
     
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
        console.log('ini postId', postId)
        
        Axios.get(`${API_URL}/post/get/${postId}`, headers)
        .then((res) => {
            setPost({ ...post, postData: res.data.results[0]});
            console.log('ini res.data.results[0] detail post',  res.data.results[0])
            setComment(res.data.comment);
            setLikes(res.data.likes);
            console.log('ini res.data.likes', res.data.likes)

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

    const onCommentAddChange = (e) => {
        // console.log(e.target.value)

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
            console.log('ini hasil komen res', res)
            console.log('ini hasil komen res.data', res.data)
            // this.setState({ addComment: res.data })
            setCommentAdd('')
            // alert('berhasil')
            // navigate(`/`);
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

      const SHOW_BY_DEFAULT = 5;
      const visibleOptions = showAll ? comment.length : SHOW_BY_DEFAULT;
      console.log('ini visibleOptions', visibleOptions)
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

        console.log('ini idnya', id)
       
        Axios.post(`${API_URL}/post/likepost/${id}`, {}, headers)
        .then((res) => {
          fetchPosts()
          setLiked(true);
          console.log('ini res button like', res)
        }).catch((err) => {
            console.log(err)
        })
    }

    
    const [isLogedIn, setisLogedIn] = useState(false);
    const onCheckIsLogedIn = () => {
       let token = localStorage.getItem('myTkn')

       if(token){
           setisLogedIn(true)
       }
   }


   if(user.is_login){
    return(
    <div className='container-fluid my-universe-background-home'>
        <div className='pt-1' style={{paddingBottom: '13px'}}>
            <div className='container'>
                <div className='row'>
                <div className='pt-1' style={{height: '550px'}}>
                    <div className="app-detail rounded ml-4" style={{backgroundColor: 'white'}}>
                        <div className="details">
                                <div className="big-img">
                                    <img src={API_URL + '/' + post.postData.image} alt="" className='detail-post-img'/>
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
                                    <h2 className='mx-3 mt-2' style={{fontFamily: "Source Sans Pro"}}>{post.postData.displayname}</h2>
                                    </div>
                                    <div>
                                    {likes.includes(post.postData.id)  ? (
                                        <img src={HeartFilled} alt="" id="cardIconDet" onClick={() => handleClick(post.postData.id)} />
                                        ) : (
                                        <img
                                            src={Heart}
                                            alt=""
                                            id="cardIconDet"
                                            onClick={() => handleClick(post.postData.id)}
                                        />
                                    )}
                                    <span style={{fontSize: '14px', color: 'purple', marginTop: '0px', fontFamily: "Source Sans Pro"}}>{post.postData.totalLike} peoples love this</span>
                                    </div>
                                    <div>
                                        <div style={{fontSize: '12px'}}>
                                            {moment(post.postData.created_at).format('LLL')}
                                        </div>
                                    </div>
                                    <div className="d-flex mt-3">
                                    <strong><span style={{fontFamily: "Source Sans Pro"}}>{post.postData.username}</span></strong>
                                    <span style={{marginTop: '0px', marginLeft: '10px',  fontFamily: "Source Sans Pro" }}>{post.postData.caption}</span>
                                    </div>
                                    <div className='container'>
                                    {comment.slice(0, visibleOptions).map(( item) => (
                                            <div>
                                            <div className='d-flex' key={item.postId}>
                                            <span style={{fontSize: '14px', color: 'purple', fontWeight: 'bold', fontFamily: "Source Sans Pro"}}>
                                                {item.username} 
                                            </span>
                                            <span className='mx-2' style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>
                                            {item.comment}
                                            </span>
                                            </div>
                                            {/* <div style={{fontSize: '10px'}}>
                                            {moment(item.created_at).format('LL')}
                                            </div> */}
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
        </div>
    </div>
   
    // <div className='pt-1 '>
    //     <div className="app-detail">
    //    <div className="details">
    //           <div className="big-img">
    //             <img src={API_URL + '/' + post.postData.image} alt="" className='detail-post-img'/>
    //           </div>
    //           <div className="box">
    //            <div id="content">
    //            <div className="row">
    //                 <span>
    //                 <img
    //                     style={{borderRadius: '50%'}}
    //                     src={API_URL + '/' + post.postData.profileimage}
    //                     width="50px"
    //                     height="50px"
    //                     alt="gambar"
    //                 />
    //               </span>
    //               <h2 className='mx-3' style={{fontFamily: "Source Sans Pro"}}>{post.postData.displayname}</h2>
    //             </div>
    //             <div>
    //             {likes.includes(post.postData.id)  ? (
    //                 <img src={HeartFilled} alt="" id="cardIcon" onClick={() => handleClick(post.postData.id)} />
    //                 ) : (
    //                 <img
    //                     src={Heart}
    //                     alt=""
    //                     id="cardIcon"
    //                     onClick={() => handleClick(post.postData.id)}
    //                 />
    //             )}
    //             <span style={{fontSize: '12px', color: 'purple', marginTop: '0px', fontFamily: "Source Sans Pro"}}>{post.postData.totalLike} peoples love this</span>
    //             </div>
    //             <div>
    //                  <div style={{fontSize: '10px'}}>
    //                     {moment(post.postData.created_at).format('LL')}
    //                 </div>
    //             </div>
    //             <div className="d-flex mt-3">
    //               <strong><span style={{fontFamily: "Source Sans Pro"}}>{post.postData.username}</span></strong>
    //               <span style={{marginTop: '0px', marginLeft: '10px',  fontFamily: "Source Sans Pro" }}>{post.postData.caption}</span>
    //             </div>
    //             <div className='container'>
    //             {comment.slice(0, visibleOptions).map(( item) => (
    //                     <div>
    //                     <div className='d-flex' key={item.postId}>
    //                     <span style={{fontSize: '14px', color: 'purple', fontWeight: 'bold', fontFamily: "Source Sans Pro"}}>
    //                         {item.username} 
    //                     </span>
    //                     <span className='mx-2' style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>
    //                     {item.comment}
    //                     </span>
    //                     </div>
    //                     {/* <div style={{fontSize: '10px'}}>
    //                     {moment(item.created_at).format('LL')}
    //                     </div> */}
    //                     </div>
    //             ))}
    //             {comment.length > SHOW_BY_DEFAULT && (
    //                 <div onClick={toggleShowAll} style={{cursor: 'pointer', fontSize: '14px', color: 'darkblue', fontFamily: "Source Sans Pro"}}>
    //                      {!showAll ? "Show more" : "Show Less"}
    //                 </div>
    //             )}
    //             </div>
    //             <div className='d-flex mt-2'>
    //                 <input  style={{fontFamily: "Source Sans Pro"}} type='text' value={commentAdd} onChange={onCommentAddChange}  placeholder="Add comment.." className="form-control rounded-0 cart-comment" />
    //                 <span> <button disabled={!commentAdd} style={{fontFamily: "Source Sans Pro"}} onClick={() => onBtnAddCommentClick(post.postData.id)}  className="cart">
    //                    Post
    //                 </button></span>
    //             </div>
    //            </div>
    //           </div>
    //         </div>
    //   </div>
    // </div>
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