import React, { Component } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {onUserLogin, onCheckUserLogin } from '../Redux/Actions/userAction'
import ManagePosts from './ManagePosts';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';


class Profile extends Component {
    state = {
        listPosts: [], 
    }


    componentDidMount(){
        let token = localStorage.getItem('myTkn')
        // this.props.onCheckUserVerify(token)
        // this.onCheckIsLogedIn(token)
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/user/allusers`, headers)
        .then((res) => {
            console.log(res)
            console.log('ini res.data get',res.data)
            this.setState({ listPosts: res.data })
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }

    renderListPosts = () => {
        return this.state.listPosts.map((item, index) => {
            console.log('ini item',item)
            if(item.id !== this.state.selectedEditPostId) {
                return (
                    <div className="profile card-home home">
                    <div className="profile-info row">
                        <div className="col s4 left">
                            <img className="profile-img" src='https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' alt="profile-img" />
                        </div>
                        <div className="col s8 profile-data">
                            <div className="username">{item.username}</div>
                            <div className="full-name"><strong>{item.displayname}</strong></div><br />
                            <div className="">{item.bio}</div><br /><br />
                        </div>
                    </div>
                            <div>
                                <Link to="/editprofile" >< div className="btn black" style={{ width: '48%', marginLeft: '2%', borderRadius: '0.3rem' }}><strong className="white-text">Edit Profile</strong></div></Link>
                               < div className="btn black" style={{ width: '48%', marginLeft: '2%', borderRadius: '0.3rem' }}><strong className="white-text">Show My Posts</strong></div> 
                            </div>
                    <hr className="hr-profile" />
                    <div className="row center">
                        {/* <ManagePosts/> */}
                    </div>
                    <hr className="hr-profile" />
    
                </div>
                    // <div key={index}>

                    //     <div>{item.id}</div>
                    //     <div>{item.profileimage}</div>
                    //     <div>{item.displayname}</div>
                    //     <div>{item.username}</div>
                    //     <div>{item.bio}</div>
                    // </div>
                )
            }
        })
    }
   
    render() {
        if(this.props.user.is_login) {
            return (
            <>
               
               {this.renderListPosts()}
            </>
            )
        }
        
        return <Navigate to='/landing' />
    }
}


const mapDispatchToProps = {
    onUserLogin, onCheckUserLogin
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);