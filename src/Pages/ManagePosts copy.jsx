import React, { Component } from 'react';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers';
import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';

class ManagePosts extends Component {
    state = { 
        listPosts: [], 
        addImageFileName: 'Select Image...', 
        addImageFile: undefined, 
        captionAdd: '',
        selectedEditPostId: 0,
        editImageFileName: 'Select Image...',
        editImageFile: undefined,
        captionEdit: '' 
    }

    componentDidMount() {
        const token = localStorage.getItem('token')
        const headers = {
            headers: { 
                'Authorization': `Bearer ${token}`,
            }
        }
        axios.get(`${API_URL}/post/getposts`, headers)
        .then((res) => {
            this.setState({ listPosts: res.data })
        }).catch((err) => {
            console.log(err)
        })
    }

    onAddImageFileChange = (e) => {
        // console.log(document.getElementById('addImagePost').files[0])
        // console.log(e.target.files[0])
        if(e.target.files[0]) {
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
            const token = localStorage.getItem('token')
            var headers = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            }

            var data = {
                caption: this.state.captionAdd
            }

            formData.append('image', this.state.addImageFile)
            formData.append('data', JSON.stringify(data))

            axios.post(API_URL + "/post/addpost", formData, headers)
            .then((res) => {
                this.setState({ listPosts: res.data })
            })
            .catch((err) =>{
                console.log(err)
            })
        }
        else {
            alert('Image harus diisi!')
        }
    }

    onBtnDeletePostClick = (id) => {
        const token = localStorage.getItem('token')
        const headers = {
            headers: { 
                'Authorization': `Bearer ${token}`,
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
        const token = localStorage.getItem('token')
        var headers = {
            headers: {
                'Authorization': `Bearer ${token}`,
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
        return this.state.listPosts.map((item) => {
            if(item.id !== this.state.selectedEditPostId) {
                return (
                    <div className='col-lg-6 col-md-6 col-12'>
                        <div className="row card rounded-0 mx-1 px-3 py-3 my-3" style={{width: '18rem'}}>
                            <img src={`${API_URL}${item.image}`} alt={`${item.image}`} className="card-img-top" sytle={{width: 300, height:240}}/>
                            <div className="card-body">
                            <p className="card-text">{item.caption}</p>
                            </div>
                            <div className="card-body">                             
                                    <input type="button" value="Edit Image" onClick={() => this.setState({ selectedEditPostId: item.id, captionEdit: item.caption })} className="btn btn-warning rounded-0" style={{width: '100px', opacity: 0.9}} />
                                    <input className="btn btn-danger mx-2 rounded-0" type="button" value="Delete" onClick={() => this.onBtnDeletePostClick(item.id)} style={{width: '80px', opacity: 0.9}}/>
                            </div>
                        </div> 
                    </div>
                )
            }
            
            return (
                <div className='col-lg-6 col-md-6 col-12'>
                <div className="row card rounded-0 mx-1 px-3 py-3" style={{width: '18rem'}}>
                    <img src={`${API_URL}${item.image}`} alt={`${item.image}`} className="card-img-top" sytle={{width: 300, height:240}}/>
                    <div className="card-body">
                        <input type="file" label={this.state.editImageFileName} onChange={this.onEditImageFileChange} multiple /> 
                        <textarea value={this.state.captionEdit} onChange={this.onCaptionEditChange} placeholder="Caption.." className="mt-3 rounded-0"> </textarea>
                    </div>
                    <div className="card-body">                             
                        <input type="button" value="Cancel" onClick={() => this.setState({ selectedEditPostId: 0 })} className="btn btn-primary rounded-0" style={{width: '80px', opacity: 0.9}} />
                        <input className="btn btn-danger rounded-0 mx-2" type="button" value="Save" onClick={() => this.onBtnUpdatePostClick(item.id)} style={{width: '80px', opacity: 0.9}}/>
                    </div>
                </div> 
                </div>
            )
        })
    }

    render() {
        if(this.props.token !== '' && this.props.authChecked) {
            return (
                <div className=''>
                    <div className='row'>
                        {this.renderListPosts()}
                    </div>
                </div>
            )
        }
        else if(this.props.authChecked && this.props.token === '') {
            return <Navigate to="/login" />
        }
        
        return <h1>Loading...</h1>
    }
}

const mapStateToProps = (state) => {
    return { token: state.auth.token, authChecked: state.auth.authChecked }
}

export default connect(mapStateToProps)(ManagePosts);