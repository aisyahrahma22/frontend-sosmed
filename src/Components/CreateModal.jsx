import Axios from 'axios'
import React, { Component } from 'react'
import {Modal, ModalBody} from 'reactstrap'
import { connect } from 'react-redux'

class CreateModal extends Component{

    state = {
        modalOpen: false,
        errorMessage: '',
        images: null
    }

    onImagesValidation = (e) => {
        try {
            let files = [...e.target.files]

            if(files.length !== 3) throw { message: 'Select 3 Images!' }

            files.forEach((value) => {
                if(value.size > 20000) throw { message: `${value.name} More Than 20Kb` }
            })

            this.setState({images: files, errorMessage: null})
        } catch (error) {
            this.setState({errorMessage: error.message})
        }
    }

    onSubmitData = () => {
        try {
            let name = this.name.value
            let price = this.price.value
            let description = this.description.value
            let weight = this.weight.value
            let stock = this.stock.value
    
            if(!name || !price || !description || !weight || !stock) throw { message: 'Data Not Completed! Fill All Data!' }

            let data = {
                name, 
                price,
                description, 
                weight, 
                stock
            }

            let dataToSend = JSON.stringify(data)

            let fd = new FormData()
            fd.append('data', dataToSend)

            this.state.images.forEach((value) => {
                fd.append('images', value)
            })

            console.log(fd)

            Axios.post('http://localhost:5000/upload/newproduct', fd)
            .then((res) => {
                alert('Upload Product Success!')
            })
            .catch((err) => {
                console.log(err)
            })
        } catch (error) {
            this.setState({errorMessage: error.message})
        }
    }

    render(){
        return(
            <>
                <input type="button" value="Insert Product" onClick={() => this.setState({modalOpen: true})} className="btn btn-primary rounded-0" />
                <Modal toggle={() => this.setState({modalOpen: false})} isOpen={this.state.modalOpen}>
                    <ModalBody>
                        <div className="text-center px-3 py-3">
                            <h3>
                                Insert Product
                            </h3>
                        </div>
                        <div className="px-3 py-3">
                            <h6>Product Name :</h6>
                            <input type="text" ref={(e) => this.name = e} className="form-control" />
                        </div>
                        <div className="px-3 py-3">
                            <h6>Price :</h6>
                            <input type="text" ref={(e) => this.price = e} className="form-control" />
                        </div>
                        <div className="px-3 py-3">
                            <h6>Description :</h6>
                            <input type="text" ref={(e) => this.description = e} className="form-control" />
                        </div>
                        <div className="px-3 py-3">
                            <h6>Weight :</h6>
                            <input type="text" ref={(e) => this.weight = e} className="form-control" />
                        </div>
                        <div className="px-3 py-3">
                            <h6>Stock :</h6>
                            <input type="text" ref={(e) => this.stock = e} className="form-control" />
                        </div>
                        <div className="px-3 pt-3">
                            <h6>Select Images :</h6>
                        </div>
                        <div className="row border mx-3 px-3 py-3 rounded">
                            <div className="col-12">
                                <div>
                                    <input type="file" accept="image/*" multiple onChange={(e) => this.onImagesValidation(e)} />
                                    {/* <input type="button" value="Choose File" onClick={() => this.files.click()} className="btn btn-warning" /> */}
                                </div>
                            </div>
                        </div>
                        <div className="px-3">
                            {/* <h6 className={this.props.products.error? 'text-warning' : 'text-success'}>
                               {
                                   this.props.products.insertMessage?
                                        this.props.products.insertMessage
                                    :
                                        null
                               }
                            </h6> */}
                        </div>
                        <div className="my-3 px-3 py-3">
                            <input type="button" value="Submit Data" onClick={this.onSubmitData} className="btn btn-primary w-100" />
                        </div>
                    </ModalBody>
                </Modal>
            </>
        )
    }
}

// const mapDispatchToProps = {
//     insertProduct
// }

// const mapStateToProps = (state) => {
//     return{
//         products: state.products
//     }
// }

export default CreateModal;