// import Axios from 'axios'
import React, { Component } from 'react';
import {Modal, ModalBody} from 'reactstrap';
import axios from 'axios';
import {onCheckUserVerify} from './../Redux/Actions/userAction'
import { API_URL } from '../Supports/Helpers';
import Swal from 'sweetalert2';

export class CreatePost extends Component{

    state = {
        modalOpen: false,
        errorMessage: '',
        images: null,
        listPosts: [], 
        addImageFileName: 'Select Image...', 
        addImageFile: undefined, 
        captionAdd: '',
        isLogedIn: false,
        previewImage: null,
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
        axios.get(`${API_URL}/post/getposts`, headers)
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
            const reader = new FileReader()
            reader.readAsDataURL(e.target.files[0])
            reader.onload = () => {
                if(reader.readyState === 2){
                    this.setState({previewImage: reader.result})
                }
            }
        }
        else {
            this.setState({ addImageFileName: 'Select Image...', addImageFile: undefined })
        }
    }

    onCaptionAddChange = (e) => {
        console.log('ini caption add', e.target.value)
        if(e.target.value.length <= 300) {
            this.setState({ captionAdd: e.target.value })
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

            var data = {
                caption: this.state.captionAdd
            }

            formData.append('image', this.state.addImageFile)
            formData.append('data', JSON.stringify(data))

            axios.post(API_URL + "/post/addpost", formData, headers)
            .then((res) => {
                this.setState({ listPosts: res.data })
                Swal.fire({
                    title: 'Success!',
                    text: res.data.message,
                    icon: 'success',
                    confirmButtonText: 'Okay!'
                })
                // this.data.value =''
            })
            .catch((err) =>{
                Swal.fire({
                    title: 'Error!',
                    text: err.message,
                    icon: 'error',
                    confirmButtonText: 'Okay!'
                })
            })
        }
        else {
            Swal.fire({
                title: 'Error!',
                text: 'Image Empty Please Input in JPEG or JPG Format',
                icon: 'error',
                confirmButtonText: 'Okay!'
            })
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
                                <div className="col-12 d-flex justify-content-center align-items-center border border-secondary" style={{width: '100%', height:'200px'}}>
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