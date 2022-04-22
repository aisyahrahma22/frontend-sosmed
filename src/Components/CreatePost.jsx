// import Axios from 'axios'
import React, { Component } from 'react';
import {Modal, ModalBody} from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers';

export class CreatePost extends Component{

    state = {
        modalOpen: false,
        errorMessage: '',
        images: null,
        listPosts: [], 
        addImageFileName: 'Select Image...', 
        addImageFile: undefined, 
        captionAdd: '',
        previewImage: null,
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
        if(e.target.files[0]) {
            this.setState({ addImageFileName: e.target.files[0].name, addImageFile: e.target.files[0], previewImage: e.target.files[0]})
        }
        else {
            this.setState({ addImageFileName: 'Select Image...', addImageFile: undefined, previewImage:'Preview here' })
        }
    }

    onCaptionAddChange = (e) => {
        if(e.target.value.length <= 100) {
            this.setState({ captionAdd: e.target.value })
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


    render(){
        return(
            <>
                <div type="button"  onClick={() => this.setState({modalOpen: true})} className="rounded-0">
                    <span class="material-icons">
                    add_a_photo
                    </span>
                </div>
                <Modal toggle={() => this.setState({modalOpen: false})} isOpen={this.state.modalOpen}>
                    <ModalBody>
                        <div className="text-center px-3 py-3">
                            <h3>
                                Insert Photo
                            </h3>
                        </div>
                        <div className="px-3">
                            <div className="row justify-content-center">
                                <div className="col-12 d-flex justify-content-center align-items-center border border-primary" style={{width: '100%', height:'200px'}}>
                                {
                                    this.state.previewImage? <img src={this.state.previewImage} alt='Image Preview' width='50%' /> : 'Image Preview'
                                }
                                </div>
                                <div className="col-6 mt-3">
                                    <div>
                                        <input id="addImagePost" type="file" label={this.state.addImageFileName} onChange={this.onAddImageFileChange}/>
                                    </div>
                                </div>
                                <div className="form-group mt-3 mb-3">
                                <div className="input-group">
                                    <textarea value={this.state.captionAdd} onChange={this.onCaptionAddChange} placeholder="Caption.." className="rounded-0"> </textarea>
                                    <div className="input-group-prepend">
                                    </div>
                                </div>
                            </div>
                                <div className="col-12">
                                    Error Message
                                </div>
                                <div className="col-12 mt-3">
                                    <input type="button" value="Submit" className="btn btn-primary w-100" onClick={this.onBtnAddPostClick}/>
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}