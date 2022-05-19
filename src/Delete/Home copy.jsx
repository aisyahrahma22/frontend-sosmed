import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import '../Supports/Stylesheets/HomePage.css';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";
import moment from 'moment';
import InfiniteScroll from 'react-infinite-scroll-component';

// Redux
import {connect} from 'react-redux';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify} from './../Redux/Actions/userAction'
import LoadingSkeleton from '../Components/LoadingSkeleton';


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
        page: 1,
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
    
        axios.get(`http://localhost:5000/post/getallposts?page=${this.state.page}&limit=6`,  headers)
            .then((res) => {
                this.setState({ listPosts: res.data});
            }).catch((err) => {
                console.log(err)
            })
    }

    onResendEmail = () => {
        let token = localStorage.getItem('myTkn')

        axios.post(`${API_URL}/user/resend`, {}, {headers: {
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
          
          axios.post(`${API_URL}/post/likepost/${id}`, {}, headers)
          .then((res) => {
            this.getAllPost()
            this.setState({
                liked: true
              });
          }).catch((err) => {
              console.log(err)
          })
    }

    renderListPosts = () => {
        return this.state.listPosts.map((item, id) => {
            
            if(item.id !== this.state.selectedEditPostId) {
                return (
                    <div className='col-12 col-md-6 col-lg-4 my-2' key={id}>
                        <div className="card product-card">
                            <div className='tittle  mb-2'>
                                <div className='d-flex'>
                                    <img  src={`${API_URL + '/'}${item.profilepicture}`} id="userImg" />
                                    <Link to={`/detailprofile/${item.userId}`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}}>
                                    <span style={{fontFamily: "Source Sans Pro"}}>{item.username}</span>
                                    </Link>
                                </div>    
                            </div>
                            <Link  to={`/detailpost/${item.id}`}style={{ textDecoration:"none", color: "inherit" }}>
                            <img src={`${API_URL + '/'}${item.image}`} alt="foto post" id="postImg" />
                            </Link>
                            <div className="mt-2">
                        <div className='d-flex flex-column'>
                            <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>{moment(item.created_at).format('LLL')}</span>
                            <span>
                            {
                                this.props.user.is_confirmed === 1?
                                <div id="interaction">
                                {item.myLike > 0 ? (
                                <img src={HeartFilled} alt="" id="cardIcon" onClick={() => this.handleClick(item.id)}/>
                                ) : (
                                <img
                                    src={Heart}
                                    alt=""
                                    id="cardIcon"
                                    onClick={() => this.handleClick(item.id)}
                                />
                                )}
                               <span style={{fontSize: '12px', color: 'purple', marginTop: '2px', fontFamily: "Source Sans Pro"}}>
                               {item.totalLike} peoples love this
                               </span>
                                </div>
                                    :
                                <span>
                                <img
                                    src={Heart}
                                    alt=""
                                    id="cardIcon"
                                />
                                </span>
                            }
                            </span>
                        </div>
                    </div>
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
                <div className='container-fluid my-universe-background-home'>
                    <div className='pt-3'>
                    {
                        this.props.user.is_confirmed === 1?
                        <span>
                        
                        </span>
                            :
                        <span className="ml-3">
                            <input type="button" value="Resend Email Confirmation" onClick={() => this.onResendEmail()} className="btn rounded shadow-lg" />     
                        </span>
                    }                   
                    <div className='container'>
                        <div className='row mt-5 pt-5'>
                        <InfiniteScroll
                        dataLength={this.state.listPosts.length}
                        next={this.getAllPost}
                        style={{ display: 'flex', flexWrap: 'wrap' }} 
                        hasMore={true}
                    >
                        {this.renderListPosts()}
                    </InfiniteScroll>
                            <h1>
                                {
                                    this.state.isLoading?  <LoadingSkeleton/> : null
                                }
                            </h1>
                        </div>
                    
                </div> 
               </div>
                  
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