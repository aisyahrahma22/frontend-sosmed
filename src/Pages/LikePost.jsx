import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import '../Supports/Stylesheets/HomePage.css';
import Heart from "../Supports/Images/heart.svg";
import '../Supports/Stylesheets/ProfilePosts.css';
import HeartFilled from "../Supports/Images/heartFilled.svg";
import moment from 'moment';
// // import CardHomePost from '../Components/CardHomePost';
import InfiniteScroll from 'react-infinite-scroll-component';

// Redux
import {connect} from 'react-redux';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify} from './../Redux/Actions/userAction'
// import { flushSync } from 'react-dom';


class LikedPost extends React.Component{
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

        axios.get(API_URL + "/post/getlikedpost",  headers)
            .then((res) => {
                console.log('ini liked post res', res)
                console.log('ini likes post res.data', res.data)
                console.log('ini likes post res.data.results', res.data.results)
                this.setState({ listPosts: res.data });
                // console.log('ini res.data.results home', res.data.results)
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
                    <div className="card product-card">
                        <div className='tittle'>
                            <div className='d-flex'>
                                <img  src={`${API_URL + '/'}${item.profileimage}`} id="userImg" />
                                <Link to={`/detailprofile/${item.userId}`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}}>
                                <span style={{fontFamily: "Source Sans Pro"}}>{item.username}</span>
                                </Link>
                            </div>    
                        </div>
                        <Link  to={`/detailpost/${item.id}`} style={{ textDecoration:"none", color: "inherit" }}>
                        <img src={`${API_URL + '/'}${item.image}`} alt="foto post" id="postImg" />
                        </Link>
                        <div className="mt-2">
                    <div className='d-flex flex-column'>
                        <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>{moment(item.created_at).format('LLL')}</span>
                        <span style={{fontSize: '12px', color: 'purple', marginTop: '2px', fontFamily: "Source Sans Pro"}}>
                           you love this
                        </span>
                    </div>
                </div>
                </div>
                </div>
                    // <div className='col-12 col-md-6 col-lg-4' key={id}>
                    //     <div className="p">
                    // <div className="p-browser d-flex justify-content-between">
                    //      <>
                    //         <div className='d-flex'>
                    //             <div className="p-circle"></div>
                    //             <div className="p-circle"></div>
                    //             <div className="p-circle"></div>
                    //         </div>
                    //         <div>
                    //             <div className="p-ex">x</div>
                    //         </div>
                    //     </>
                    //     </div>
                    //         <Link to={`/detailpost/${item.id}`}>
                    //         <img src={`${API_URL + '/'}${item.image}`} alt="" className="p-img" />
                    //         </Link>
                    //     </div>
                    // </div>
                )
            }
        })
    }

    render(){
        if(this.props.user.is_login){
            return(
                <>
             <div className='container'>
                <div className='row'>
                {this.renderListPosts()}
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

export default connect(mapStateToProps, mapDispatchToProps)(LikedPost)