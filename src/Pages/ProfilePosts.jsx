import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import "../Components/card.css";
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";
import Comment from "../Supports/Images/comment.svg";
import '../Supports/Stylesheets/ProfilePosts.css';

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
        // this.props.onCheckUserVerify(token)
        this.onCheckIsLogedIn(token)
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

    onCheckIsLogedIn = () => {
        let token = localStorage.getItem('myTkn')

        if(token){
            this.setState({ isLogedIn: true })
        }
    }


    onCaptionEditChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value.length <= 100) {
            this.setState({ captionEdit: e.target.value })
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
            this.setState({ listPosts: res.data })
            window.location.reload(false)
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
            window.location.reload(false)
        })
        .catch((err) =>{
            console.log(err)
        })
    }

    renderListPosts = () => {
        return this.state.listPosts.map((item, index) => {
            console.log('ini item',item)
            if(item.id !== this.state.selectedEditPostId) {
                return (
                    <div className='col-12 col-md-6 col-lg-4' key={index}>
                        <div className="p">
                    <div className="p-browser d-flex justify-content-between">
                       {
                           this.props.user.is_confirmed === 1?
                          <>
                            <div className='d-flex' style={{cursor: 'pointer'}} onClick={() => this.setState({ selectedEditPostId: item.id, captionEdit: item.caption })}>
                                    <div className="p-circle"></div>
                                    <div className="p-circle"></div>
                                    <div className="p-circle"></div>
                            </div>
                            <div>
                                <div className="p-ex" style={{cursor: 'pointer'}} onClick={() => this.onBtnDeletePostClick(item.id)}>x</div>
                            </div>
                          </>
                            :
                            <>
                                <div className='d-flex'>
                                    <div className="p-circle"></div>
                                    <div className="p-circle"></div>
                                    <div className="p-circle"></div>
                                </div>
                                <div>
                                    <div className="p-ex">x</div>
                                </div>
                            </>
                       }
                        </div>
                            <Link to={`/detailpost/${item.id}`}>
                            <img src={`${API_URL + '/'}${item.image}`} alt="" className="p-img" />
                            </Link>
                        </div>
                    </div>
                )
            }
            
            return (
            <div className='col-12 col-md-6 col-lg-4 my-2' key={index}>
                <div className="">
                    <div className="p-browser">
                        <div className="p-circle"></div>
                        <div className="p-circle"></div>
                        <div className="p-circle"></div>
                    </div>
                    <img src={`${API_URL + '/'}${item.image}`} alt="" className="p-img" />
                    <div>
                        <textarea
                            value={this.state.captionEdit} onChange={this.onCaptionEditChange}
                            style={{fontFamily: "Source Sans Pro", border: '1px solid rgb(91, 1, 132)'}}
                            type="text"
                            placeholder="Caption.."
                            className="form-control rounded-0"
                        />
                    </div>
                    <div className='d-flex justify-content-around' style={{backgroundColor: 'white'}}>
                        <span className="material-icons mb-2" style={{fontWeight: 'lighter', fontFamily: "Source Sans Pro", color: 'rgb(91, 1, 132)', cursor: 'pointer'}} onClick={() => this.setState({ selectedEditPostId: 0 })}>
                        cancel
                        </span>
                        <span className="material-icons mb-2 mx-2" style={{fontWeight: 'lighter', fontFamily: "Source Sans Pro", color: 'rgb(91, 1, 132)', cursor: 'pointer'}} onClick={() => this.onBtnUpdatePostClick(item.id)} >
                        save
                        </span> 
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
                <div className='row'>
                {this.renderListPosts()}
                </div>
           </div>
            )
        }

        return <Navigate to='/profile' />

        // return(
        //     <div>
        //         123
        //     </div>
        // )
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