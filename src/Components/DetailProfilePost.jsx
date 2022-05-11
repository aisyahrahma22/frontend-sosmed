import React, { Component } from 'react';
import '../Supports/Stylesheets/Coba.css';
import { Navigate, Link } from 'react-router-dom';
import { useParams } from 'react-router';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import { connect } from 'react-redux';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from '../Redux/Actions/userAction'

class DetailProfilePost extends Component {

    state = {
        is_disabled: false,
        isLogedIn: false,
        listPosts: [], 
        addImageFileName: 'Select Image...', 
        addImageFile: undefined, 
        captionAdd: '',
        selectedEditPostId: 0,
        editImageFileName: 'Select Image...',
        editImageFile: undefined,
        captionEdit: '',
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
        axios.get(`${API_URL}/post/getallbyuserid`, headers)
        .then((res) => {
            console.log(res)
            console.log('ini res.data get',res.data)
            this.setState({ listPosts: res.data })
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }

    renderListPosts = () => {
        return this.state.listPosts.map((item, id) => {
            console.log('ini item',item)
            if(item.id !== this.state.selectedEditPostId) {
                return (
                <>
                <div key={id}>
                    <div className='col-lg-4 col-md-6 col-12'>
                        <div className='d-flex'>
                            <div className='mt-3'>
                                <div className="gallery-item" tabindex="0">
                                    <img src={`${API_URL + '/'}${item.image}`} alt={`${item.image}`} className="gallery-image"/>
                                    <div className='gallery-item-info'>
                                        <ul>
                                            <Link to={`/detailpost/${item.id}`}>
                                            <li className="gallery-item-likes"><span className="visually-hidden"></span><i className="fas fa-heart" aria-hidden="true"></i>detail</li>
                                            </Link>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </>
                )
            }
        })
    }

    render() {
        if(this.props.user.is_login) {
            return(
            <>
           <div className='container'>
               <div className='gallery'>
                <div className='row' >
                {this.renderListPosts()}
                </div>
               </div>

           </div>
            </>
            )
        
        }
        
        return <Navigate to='/landing' />
    }
}

//     render() {
//         if(this.props.user.is_login) {
//             return(
            // <>
            // <div className='gallery'>
            //     <div className='col-lg-4 col-md-6 col-12'>
            //         <div className='d-flex'>
            //             <div className='mt-3'>
            //                 <div className="gallery-item" tabindex="0">
            //                         <img  src="https://images.unsplash.com/photo-1511765224389-37f0e77cf0eb?w=500&h=500&fit=crop" className="gallery-image" alt=""/>
            //                         <div className='gallery-item-info'>
            //                             <ul>
            //                             <li className="gallery-item-likes"><span className="visually-hidden"></span><i className="fas fa-heart" aria-hidden="true"></i>detail</li>
            //                             </ul>
            //                         </div>
            //                 </div>
            //             </div>
            //         </div>
            //     </div>
            // </div>
            // </>
//             )
        
//         }
        
//         return <Navigate to='/landing' />
//     }
    
// }

const mapDispatchToProps = {
    onUserLogin, onCheckUserLogin, onCheckUserVerify
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailProfilePost)