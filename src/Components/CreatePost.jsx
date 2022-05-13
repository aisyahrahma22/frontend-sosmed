// import Axios from 'axios'
import React, { Component } from 'react';
import {Modal, ModalBody} from 'reactstrap';
import axios from 'axios';
import { API_URL } from '../Supports/Helpers';
import Swal from 'sweetalert2';
import '../Supports/Stylesheets/Uploud.css';
import Uploud2 from '../Supports/Images/Uploud2.png';


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
        this.onCheckIsLogedIn(token)
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
        }else{
            Swal.fire({
                title: 'Error!',
                text: 'Caption too long',
                icon: 'error',
                confirmButtonText: 'Okay!'
            })
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
                this.setState({ modalOpen: false })
                window.location.reload(false)

                
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
                <span className="material-icons"  style={{cursor: 'pointer', color: 'rgb(91, 1, 132)'}}>
                add_a_photo
                </span>
            </div>
            <Modal toggle={() => this.setState({modalOpen: false})} isOpen={this.state.modalOpen}>
                <ModalBody className="border border-white">
                <div className="text-right mytetring-clickable-element">
                        </div>
                        <div className="pt-0 pb-3 text-left mr-5">
                            <div className="pt-1 pb-3 text-right">
                                <h3><span className="font-weight-bold" style={{fontFamily: "Source Sans Pro"}}>Create</span><span className="font-weight-light">Post</span></h3>
                                <h5 className="font-weight-normal mytetring-font-size-14 mytetring-grey" style={{fontFamily: "Source Sans Pro"}}>Share your moment with us!</h5>
                            </div>
                        </div>
                        <div className="text-center">
                        {
                        this.state.previewImage? <img src={this.state.previewImage} id="imageResult" alt='Image Preview' width="300px" className="img-fluid rounded shadow-sm mx-auto d-block" /> :  <img src={Uploud2} alt="" width="300px" />
                        }  
                        </div>
                        <div className="px-5 py-0">
                            <div className="form-group mt-3 mb-3">
                                <div className="d-flex justtify-content-center">
                                <input style={{fontFamily: "Source Sans Pro", color: 'rgb(91, 1, 132)'}} type="file" label={this.state.addImageFileName} onChange={this.onAddImageFileChange} className="form-control rounded-0 border-0"/>
                                </div>
                            </div>
                            <div className="form-group mt-3 mb-3">
                                <h3 className='ml-2 text-center' style={{fontSize: '16px', color: 'rgb(91, 1, 132)', fontFamily: "Source Sans Pro"}}><span className="font-weight-bold" style={{fontFamily: "Source Sans Pro"}}>What's on</span><span className="font-weight-light mx-2" style={{fontFamily: "Source Sans Pro"}}>your mind?</span></h3>
                                {/* <div className="input-group" style={{width: '365px', height:'55px', border: '1px solid rgb(124, 101, 136)'}}>
                                </div> */}
                                <textarea
                                value={this.state.captionAdd} onChange={this.onCaptionAddChange} 
                                name="editUserCaption"
                                style={{fontFamily: "Source Sans Pro"}}
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