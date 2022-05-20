// import Axios from 'axios'
import React, { Component } from 'react';
import {Modal, ModalBody} from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers';
import Swal from 'sweetalert2';
import '../Supports/Stylesheets/Uploud.css';
import Peoples44 from '../Supports/Images/Peoples44.png';


export class CreatePost extends Component{

    state = {
        modalOpen: false,
        images: null,
        listPosts: [], 
        message: [],
        addImageFileName: 'Select Image...', 
        addImageFile: undefined, 
        captionAdd: '',
        previewImage: null,
    }

    onAddImageFileChange = (e) => {
        if(e.target.files[0]) {
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
        if(e.target.value.length <= 300) {
            this.setState({ captionAdd: e.target.value })
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Caption can not more than 300 characters',
                icon: 'error',
                confirmButtonText: 'Okay!'
            })
        }
    }

    onBtnAddPostClick = () => {
        if(this.state.addImageFile) {
            var formData = new FormData()
            let token = localStorage.getItem('myTkn')
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

            // if(data.caption == '') throw { message: 'Caption Empty!' }

            if(data.caption == ''){
                // alert('caption empty')
                Swal.fire({
                    title: 'Error!',
                    text: 'Caption empty',
                    icon: 'error',
                    confirmButtonText: 'Okay!'
                })
            }else{
                axios.post(API_URL + "/post/addpost", formData, headers)
                .then((res) => {
                    console.log('ini res uploud', res)
                    this.setState({ listPosts: res.data })
                    Swal.fire({
                        title: 'Success!',
                        text: res.data.message,
                        icon: 'success',
                        confirmButtonText: 'Okay!'
                    })
                    this.setState({ modalOpen: false })
                    window.location.reload(false)
                })
                .catch((err) =>{
                    console.log('ini err uploud',err)
                    Swal.fire({
                        title: 'Error!',
                        text: err.message,
                        icon: 'error',
                        confirmButtonText: 'Okay!'
                    })
                })
            }
           
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
                <span className="material-icons"  style={{cursor: 'pointer', color: 'rgb(91, 1, 132)'}}>
                add_a_photo
                </span>
            </div>
            <Modal toggle={() => this.setState({modalOpen: false})} isOpen={this.state.modalOpen}>
                <ModalBody className="border border-white">
                        <div className="text-left mr-5">
                            <div className="pt-1 pb-1 text-right" style={{fontFamily: "Source Sans Pro"}}>
                                <h3><span className="font-weight-bold">Create</span><span className="font-weight-light">Post</span></h3>
                                <h5 className="font-weight-normal" style={{fontSize: '14', color: 'grey'}}>Share your moment with us!</h5>
                            </div>
                        </div>
                        <div className="text-center">
                        {
                        this.state.previewImage? <img src={this.state.previewImage} id="imageResult" alt='Image Preview' width="300px" className="img-fluid rounded shadow-sm mx-auto d-block" /> :  <img src={Peoples44} alt="" width="300px" />
                        }  
                        </div>
                        <div className="px-5 py-0" style={{fontFamily: "Source Sans Pro"}}>
                            <div className="form-group mt-3 mb-3">
                                <div className="d-flex justtify-content-center">
                                <input style={{color: 'rgb(91, 1, 132)'}} type="file" label={this.state.addImageFileName} onChange={this.onAddImageFileChange} className="form-control rounded-0 border-0"/>
                                </div>
                            </div>
                            <div className="form-group mt-3 mb-3">
                                <h3 className='ml-2 text-center' style={{fontSize: '16px', color: 'rgb(91, 1, 132)'}}><span className="font-weight-bold">What's on</span><span className="font-weight-light mx-2">your mind?</span></h3>
                                <textarea
                                value={this.state.captionAdd} 
                                onChange={this.onCaptionAddChange} 
                                name="editUserCaption"
                                id="Caption"
                                type="text"
                                placeholder="Caption.."
                                className="form-control rounded-0"
                                />
                            </div>
                            <div className="pt-3 pb-5">
                                <button style={{fontFamily: "Source Sans Pro"}} disabled={this.state.isLoading} onClick={this.onBtnAddPostClick} className="btn rounded w-100 d-flex justify-content-center" id='my-universe-btn-uploud'>
                                    {
                                        this.state.isLoading? 
                                           'Loading'
                                        :
                                            'Submit'
                                    }    
                                </button>
                            </div>
                        
                        </div>
                </ModalBody>
            </Modal>
            </>
        )
    }
}