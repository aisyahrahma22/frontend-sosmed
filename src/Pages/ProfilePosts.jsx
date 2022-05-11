import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers/index';
import "../Components/card.css";
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";
import Comment from "../Supports/Images/comment.svg";

// Redux
import {connect} from 'react-redux';
import {onUserRegister, onCheckUserLogin,  onCheckUserVerify} from '../Redux/Actions/userAction';


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

    onAddImageFileChange = (e) => {
        if(e.target.files[0]) {
            console.log('add image file', e.target.files[0] )
            this.setState({ addImageFileName: e.target.files[0].name, addImageFile: e.target.files[0]})
        }
        else {
            this.setState({ addImageFileName: 'Select Image...', addImageFile: undefined })
        }
    }

    onEditImageFileChange = (e) => {
        if(e.target.files[0]) {
            this.setState({ editImageFileName: e.target.files[0].name, editImageFile: e.target.files[0]})
        }
        else {
            this.setState({ editImageFileName: 'Select Image...', editImageFile: undefined })
        }
    }

    onCaptionAddChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value.length <= 100) {
            this.setState({ captionAdd: e.target.value })
        }
    }

    onCaptionEditChange = (e) => {
        // console.log(e.target.value)
        if(e.target.value.length <= 100) {
            this.setState({ captionEdit: e.target.value })
        }
    }

    onBtnAddPostClick = () => {
        if(this.state.addImageFile) {
            var formData = new FormData()
            let token = localStorage.getItem('myTkn')
            console.log('token dari add post fe', token)
            var headers = {
                headers: {
                    'Authorization': `${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }
            console.log('ini headers btn add', headers)

            var data = {
                caption: this.state.captionAdd
            }

            formData.append('image', this.state.addImageFile)
            formData.append('data', JSON.stringify(data))

            axios.post(API_URL + "/post/addpost", formData, headers)
            .then((res) => {
                this.setState({ listPosts: res.data })
                console.log('ini res.data btn add',res.data)
            })
            .catch((err) =>{
                console.log('ini err btn add', err)
            })
        }
        else {
            alert('Image harus diisi!')
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
            console.log('ini item',item)
            if(item.id !== this.state.selectedEditPostId) {
                return (
                    <div className='col-12 col-md-6 col-lg-4 my-2' key={index}>
                        <div className="border border-grey rounded"  >
                        <div>
                           <Link to={`/detailpost/${item.id}`}>
                           <img src={`${API_URL + '/'}${item.image}`} alt={`${item.image}`} className="postImg" />
                           </Link>
                        </div>
                        <div  className="info">
                                <span className=''>
                                {item.caption}
                                </span>
                        </div>
                        {
                            this.props.user.is_confirmed === 1?
                            <>
                             <div className="interaction justify-content-around">
                               <span className="material-icons cardIcon mb-2" style={{fontWeight: 'lighter'}} onClick={() => this.setState({ selectedEditPostId: item.id, captionEdit: item.caption })}>
                                more_horiz
                                </span>
                                <span className="material-icons cardIcon mb-2 mx-2" style={{fontWeight: 'lighter'}} onClick={() => this.onBtnDeletePostClick(item.id)} >
                                delete
                                </span> 
                            </div>
                            </>
                                :
                            <span className="ml-3">
                            
                            </span>
                        }
                        </div>
                    </div>
                )
            }
            
            return (
                <div className='col-12 col-md-6 col-lg-4 my-2' key={index}>
                <div className="border border-grey rounded"  >
                <div>
                    <img src={`${API_URL + '/'}${item.image}`} alt={`${item.image}`} className="postImg" />
                </div>
                <div className="info">
                    <textarea value={this.state.captionEdit} onChange={this.onCaptionEditChange}>
                    </textarea>
                </div>
                <div className="interaction justify-content-around">
                       <span className="material-icons cardIcon mb-2" style={{fontWeight: 'lighter'}} onClick={() => this.setState({ selectedEditPostId: 0 })}>
                        cancel
                        </span>
                        <span className="material-icons cardIcon mb-2 mx-2" style={{fontWeight: 'lighter'}} onClick={() => this.onBtnUpdatePostClick(item.id)} >
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

        return(
            <div>
                123
            </div>
        )
    }
}

const mapDispatchToProps = {
    onUserRegister, onCheckUserLogin,  onCheckUserVerify
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePosts)