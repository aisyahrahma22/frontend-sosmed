import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";

import moment from 'moment';

const DetailPost = () => {

    let params = useParams();
    const [post, setPost] = useState({
        postData: {},
      });

      console.log(post)
     
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
      }, []);

      const renderComment = () => {
        if(comment.commentData.length > 5){
          return(
            <div>
              {
                showAll ?
                comment.commentData :
                comment.commentData.slice(0,5)
              }
    
              { 
                showAll ? 
                <div onPress={() => setShowAll({showAll : false})} style={{fontWeight:'bold'}}>See Less</div>
                :
                <div onPress={() => setShowAll({showAll: true})} style={{fontWeight:'bold'}}>See More</div>
              }
            </div>
          )
        }
        else{
          return comment.commentData
        }
      }

    const onCommentAddChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value.length <= 300) {
            setCommentAdd(e.target.value)
        }
    }

      const onBtnAddCommentClick = (id) => {
        let token = localStorage.getItem('myTkn')
        var headers = {
            headers: {
                'Authorization': `${token}`,
            }
        }
        console.log(post.postData.id)

        var data = {
            comment: commentAdd
        }
        console.log('ini data comment', data)

        Axios.post(API_URL + `/post/addcomment/${id}`, data, headers)
        .then((res) => {
            this.setState({ addComment: res.data })
            console.log('ini res.data btn addComment',res.data)
        })
        .catch((err) =>{
            console.log('ini err btn addComment', err)
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



    return(
        <div className="container">
            <div className="row mt-3">
                <div className="col-6" style={{height: '80vh'}}>
                    <img
                        style={{marginLeft: '-15px'}}
                        src={API_URL + '/' + post.postData.image}
                        width="105%"
                        height="100%"
                        alt="gambar"
                    />
                </div>
                <div className="col-6 border border-grey" style={{height: '80vh'}}>
                    <div className='d-flex flex-column justify-content-between' style={{height: '80vh'}}>
                        <div className=''>
                            <div className='d-flex mt-2'>
                               <div>
                               <img
                                    style={{borderRadius: '50%'}}
                                    src={API_URL + '/' + post.postData.profileimage}
                                    width="50px"
                                    height="50px"
                                    alt="gambar"
                                />
                               </div>
                               <div className='mx-2 mt-2'>
                                    {post.postData.username}
                               </div>
                            </div>
                            <div className='d-flex mt-2'>
                                <div className='col-3'>
                                <strong>{post.postData.displayname}</strong>
                                </div>
                                <div className='mb-3 col-9'>
                                "{post.postData.caption}"
                                </div>
                            </div>
                            <div className='d-flex mt-2'>
                            <div className="interaction">
                                <h5>
                                    {likes.includes(post.postData.id)}
                                </h5>
                                {likes.includes(post.postData.id)   ? (

                                <img src={HeartFilled} alt="" className="cardIcon" onClick={() => handleClick(post.postData.id)} />
                                ) : (
                                <img
                                    src={Heart}
                                    alt=""
                                    className="cardIcon"
                                    onClick={() => handleClick(post.postData.id)}
                                />
                                )}
                            </div>
                                <div className='mx-2'>
                                {post.postData.totalLike} peoples love this
                                </div>
                            </div>
                            <div className='ml-1' style={{fontSize:'12px'}}> {moment(post.postData.created_at).format('LL')}</div> 
                            <div className='mt-2'>
                                {comment.slice(0, visibleOptions).map(( item) => (
                                     <div>
                                     <div className='d-flex' key={item.postId}>
                                     <span>
                                         <strong>{item.username} </strong>
                                     </span>
                                     <span className='mx-2'>
                                     {item.comment}
                                     </span>
                                     </div>
                                     {/* <div style={{fontSize: '10px'}}>
                                     {moment(item.created_at).format('LL')}
                                     </div> */}
                                     </div>
                                ))}
                                {comment.length > SHOW_BY_DEFAULT && (
                                    <div onClick={toggleShowAll} style={{cursor: 'pointer'}}>
                                    {!showAll ? "Show more" : "Show Less"}
                                    </div>
                                )}
                            </div>
                           
                        </div>
                        <div className='d-flex mt-2'>
                            <input type='text'  value={commentAdd} onChange={onCommentAddChange}  placeholder="Add comment.." className="form-control rounded-0 border-0" />
                            <span  onClick={() => onBtnAddCommentClick(post.postData.id)}   className='input-group-text rounded-0 border-0'  style={{cursor: 'pointer', background: 'none', backgroundColor: 'white'}}>Post</span>
                        </div>
                        
                    </div>
                </div>
                {
                message? message : null
                }
            </div>
        </div>
    )
}

export default DetailPost