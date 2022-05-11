import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Peoples66 from './../Supports/Images/Peoples66.png';
import '../Supports/Stylesheets/HomePage.css';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import HomePost from './HomePost';
import "../Components/card.css";
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";
import Comment from "../Supports/Images/comment.svg";

import moment from 'moment';
import Share from "../Supports/Images/share.svg";
import Info from "../Supports/Images/info.svg";
// // import CardHomePost from '../Components/CardHomePost';
import InfiniteScroll from 'react-infinite-scroll-component';

// Redux
import {connect} from 'react-redux';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify} from './../Redux/Actions/userAction'
import { flushSync } from 'react-dom';


class Home extends React.Component{
    state = {
        limit: 0,
        isLoading: false,
        liked: false,
        is_disabled: false,
        isLogedIn: false,
        commentAdd: '',
        listPosts: [], 
        listLikes: [], 
        addComment: [], 
        editComment: [], 
        deleteComment: [], 
        selectedLikedPostId: 0,
        selectedEditPostId: 0,
    }



    componentDidMount(){
        let token = localStorage.getItem('myTkn')
        this.props.onCheckUserVerify(token)
        this.getAllPost();
    }

    getAllPost = () => {
      
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        let totalLimit = this.state.limit + 6
        this.setState({ limit: totalLimit, isLoading: true })
    
        axios.get(API_URL + "/post/getall?_limit=" + totalLimit,  headers)
            .then((res) => {
                this.setState({ listPosts: res.data.results, isLoading: false, listLikes: res.data.results2, }); 
                console.log('ini res.data.results home', res.data.results)
            }).catch((err) => {
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

    handleClick = (id) => {
          let token = localStorage.getItem('myTkn')
          const headers = {
              headers: { 
                  'Authorization': token,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json'
              }
          }
          
          console.log(id)
          axios.post(`${API_URL}/post/likepost/${id}`, {}, headers)
          .then((res) => {
            this.getAllPost()
            this.setState({
                liked: true
              });
            console.log('ini res button like', res)
          }).catch((err) => {
              console.log(err)
          })
    }

    onCommentAddChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value.length <= 300) {
            this.setState({ commentAdd: e.target.value })
        }
    }

    onBtnAddCommentClick = (id) => {
        let token = localStorage.getItem('myTkn')
        var headers = {
            headers: {
                'Authorization': `${token}`,
            }
        }
        console.log(id)

        var data = {
            comment: this.state.commentAdd
        }
        console.log('ini data comment', data)

        axios.post(API_URL + `/post/addcomment/${id}`, data, headers)
        .then((res) => {
            this.setState({ addComment: res.data })
            console.log('ini res.data btn addComment',res.data)
        })
        .catch((err) =>{
            console.log('ini err btn addComment', err)
        })
    }


    onCommentEditChange = (id) => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.put(`${API_URL}/post/editcomment/${id}`,headers)
        .then((res) => {
            this.setState({ editComment: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onCommentDeleteChange = (id) => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.delete(`${API_URL}/post/deletecomment/${id}`,headers)
        .then((res) => {
            this.setState({ deleteComment: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    renderListPosts = () => {
        return this.state.listPosts.map((item, id) => {
            console.log('ini item',item)
            if(item.id !== this.state.selectedEditPostId) {
                return (
                    <div className='col-12 col-md-6 col-lg-4 my-2' key={id}>
                        <div className="card">
                            <div className="info">
                                <img  src={`${API_URL + '/'}${item.profileimage}`} className="userImg" />
                                <Link to={`/detailprofile/${item.userId}`} style={{cursor: 'pointer', textDecoration: 'none'}}>
                                    <span>{item.username}</span>
                                </Link>
                            </div>
                            <Link to={`/detailpost/${item.id}`} style={{cursor: 'pointer'}}>
                                    <img src={`${API_URL + '/'}${item.image}`} alt={`${item.image}`} className="postImg" />
                            </Link>
                            <div className="info" style={{fontSize:'12px'}}> {moment(item.created_at).format('LL')}</div>  
                            <div  className="info">
                                <span className=''>
                                {item.caption}
                                </span>
                            </div>
                            {/* <div  className="info">
                                <span className=''>
                                total Like: {item.totalLike}
                                </span>
                            </div>
                            <div  className="info">
                                <span className=''>
                               comment: {item.comment}
                                </span>
                            </div> */}
                            {
                                this.props.user.is_confirmed === 1?
                                <div className="interaction">
                                {this.state.listLikes.includes(item.id)  ? (
                                <img src={HeartFilled} alt="" className="cardIcon" onClick={() => this.handleClick(item.id)}/>
                                ) : (
                                <img
                                    src={Heart}
                                    alt=""
                                    className="cardIcon"
                                    onClick={() => this.handleClick(item.id)}
                                />
                                )}
                                {/* <img
                                src={Comment}
                                alt=""
                                className="cardIcon"
                                /> */}
                                {item.totalLike} peoples love this
                                </div>
                                    :
                                <span className="ml-3">
                                     
                                </span>
                            }
                            
                            {/* <div className='d-flex'>
                            <input type='text' value={this.state.commentAdd} onChange={this.onCommentAddChange}  placeholder="Add comment.." className="form-control rounded-0 border-0" />
                            <span   onClick={() => this.onBtnAddCommentClick(item.id)}  className='input-group-text rounded-0 border-0'  style={{cursor: 'pointer', background: 'none', backgroundColor: 'white'}}>Post</span>
                            </div> */}
                            </div>
                    </div>
                )
            }
        })
    }

    render(){
        if(this.props.user.is_login){
            return(
                <>
                <div className='row ml-5 mt-5'>
                <div className='container'>
                {
                    this.props.user.is_confirmed === 1?
                    <span>
                       
                    </span>
                        :
                    <span className="ml-3">
                         <input type="button" value="Resend Email Confirmation" onClick={() => this.onResendEmail()} className="btn rounded shadow-lg mytodosapps-bg-secondary mytodosapps-light mytodosapps-input" />     
                    </span>
                }
                </div>
                
               <div className='container'>
                    <div className='row'>
                     <InfiniteScroll
                    dataLength={this.state.listPosts.length}
                    next={this.getAllPost}
                    style={{ display: 'flex', flexWrap: 'wrap' }} //To put endMessage and loader to the top.
                    hasMore={true}
                >
                     {this.renderListPosts()}
                </InfiniteScroll>
                    </div>
               </div>
                  
                </div>
                <div>
                    <h1>
                        {
                            this.state.isLoading? 'Loading...' : null
                        }
                    </h1>
                </div> 
                </>
            )
        }

        return(
            <Navigate to='/landing' />
        )
    }
}

const mapDispatchToProps = {
    onUserLogin, onCheckUserLogin,  onCheckUserVerify
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)