import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import moment from 'moment';
// import '../Supports/Stylesheets/HomePage.css';
import '../Supports/Stylesheets/ProfilePosts.css';
import Swal from 'sweetalert2';
// Redux
import {connect} from 'react-redux';
import {onCheckUserLogin,  onCheckUserVerify} from '../Redux/Actions/userAction';


class ProfilePosts extends React.Component{

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
        this.onCheckIsLogedIn(token)
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.get(`${API_URL}/post/getprofilepost`, headers)
        .then((res) => {
            this.setState({ listPosts: res.data })
            console.log(res.data )
        }).catch((err) => {
            console.log('ini err get',err)
        })
    }

    onCheckIsLogedIn = () => {
        let token = localStorage.getItem('myTkn')

        if(token){
            this.setState({ isLogedIn: true })
        }
    }


    onCaptionEditChange = (e) => {
        if(e.target.value.length <= 300) {
            this.setState({ captionEdit: e.target.value })
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Caption can not more than 300 characters',
                icon: 'error',
                confirmButtonText: 'Okay!'
            })
        } 
    }

    onBtnDeletePostClick = (id) => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }
        axios.delete(`${API_URL}/post/deletepost/${id}`,headers)
        .then((res) => {
            window.location.reload(false)
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
    }

    onBtnUpdatePostClick = (id) => {
        var formData = new FormData()
        let token = localStorage.getItem('myTkn')
        var headers = {
            headers: {
                'Authorization': `${token}`,
                'Content-Type': 'multipart/form-data'
            }
        }

        var data = {
            caption: this.state.captionEdit,
        }

       
        formData.append('image', this.state.editImageFile)
        formData.append('data', JSON.stringify(data))

        axios.put(API_URL + "/post/editpost/" + id, formData, headers)
        .then((res) => {
            this.setState({ listPosts: res.data, selectedEditPostId: 0 })
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    renderListPosts = () => {
        return this.state.listPosts.map((item, index) => {
            if(item.id !== this.state.selectedEditPostId) {
                return (
                    <div className='col-12 col-md-6 col-lg-4 my-2' key={index}>
                    <div className="card product-card">
                        <div className='tittle'>
                        <div className='d-flex justify-content-between'>
                        {
                           this.props.user.is_confirmed === 1?
                          <>
                           <div className='d-flex'>
                                    <span className="material-icons" style={{cursor: 'pointer'}} onClick={() => this.setState({ selectedEditPostId: item.id, captionEdit: item.caption })}>
                                    more_horiz
                                    </span>
                                </div>
                                <div>
                                    <span className="material-icons"  style={{cursor: 'pointer'}} onClick={() => this.onBtnDeletePostClick(item.id)}>
                                    close
                                    </span>
                                </div>
                          </>
                            :
                            <>
                                <div className='d-flex'>
                                    <span className="material-icons">
                                    more_horiz
                                    </span>
                                </div>
                                <div>
                                    <span className="material-icons">
                                    close
                                    </span>
                                </div>
                            </>
                       }
                        </div>
                           
                        </div>
                        {
                             this.props.user.is_confirmed === 1?
                             <Link  to={`/detailpost/${item.id}`} style={{ textDecoration:"none", color: "inherit" }}>
                             <img src={`${API_URL + '/'}${item.image}`} alt="foto post" id="postImg" />
                             </Link>
                             :
                             <img src={`${API_URL + '/'}${item.image}`} alt="foto post" id="postImg" />
                        }
                        <div className="mt-2">
                    <div className='d-flex flex-column'>
                        <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>{moment(item.created_at).format('LLL')}</span>
                    </div>
                </div>
                </div>
                </div>
                )
            }
            
            return (
                <div className='col-12 col-md-6 col-lg-4 my-2' key={index}>
                <div className="card product-card">
                    <div className='tittle'>
                        <div className='d-flex justify-content-between'  style={{fontSize: '16px', fontFamily: "Source Sans Pro"}}>
                            Edit your caption
                        </div>
                    </div>
                    <Link  to={`/detailpost/${item.id}`} style={{ textDecoration:"none", color: "inherit" }}>
                    <img src={`${API_URL + '/'}${item.image}`} alt="foto post" id="postImg" />
                    </Link>
                    <div className="mt-2">
                <div className='d-flex flex-column'>
                    <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>{moment(item.created_at).format('LLL')}</span>
                    <span>
                    <textarea
                            value={this.state.captionEdit} onChange={this.onCaptionEditChange}
                            style={{fontFamily: "Source Sans Pro", border: '1px solid rgb(91, 1, 132)'}}
                            type="text"
                            placeholder="Caption.."
                            className="form-control rounded-0"
                        />
                    </span>
                    <div className='d-flex justify-content-around mt-2' style={{backgroundColor: 'white'}}>
                        <input style={{fontFamily: "Source Sans Pro"}} className="btn btn-outline-dark w-50" type="button" value="Cancel" onClick={() => this.setState({ selectedEditPostId: 0 })} />
                        <input style={{fontFamily: "Source Sans Pro"}} className="btn btn-outline-primary w-50 mx-2" type="button" value="Save" onClick={() => this.onBtnUpdatePostClick(item.id)}  />
                    </div>
                </div>
            </div>
            </div>
            </div>
            )
        })
    }

    render(){
        if(this.state.isLogedIn){
            return(
            <div className='container'>
                <div className='row ml-3'>
                {this.renderListPosts()}
                </div>
           </div>
            )
        }

        return <Navigate to='/profile' />
    }
}

const mapDispatchToProps = {
    onCheckUserLogin,  onCheckUserVerify
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)