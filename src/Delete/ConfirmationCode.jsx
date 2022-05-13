import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import Peoples44 from './../Supports/Images/Peoples44.png';

const ConfirmationCode = () => {

    let params = useParams();

    const [activationCode, setActivationCode] = useState(null)
    const [message, setMessage] = useState('')

    const onSubmit = () => {
        Axios.patch('http://localhost:5000/user/confirmation', {id: params.id, code_activation: activationCode})
        .then((res) => {
            setMessage(res.data.message)
        })
        .catch((err) => {
            setMessage(err.response.data.message)
        })
    }

    return(
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
                <div className="col-6 rounded px-5 ">
                <div className="d-none d-md-block">
                    <img src={Peoples44} alt="" width="100%" />
                </div>
                </div>
                <div className="col-6 rounded">
                    <div className='px-5 py-5'>
                    <h1 className="text-center my-3">
                        Join With Us
                    </h1>
                    
                    <div className="form-group">
                        <label for="exampleInputEmail1">Input Your Code here :</label>
                        <input type="text" onChange={(event) => setActivationCode(event.target.value)} className="form-control" aria-describedby="emailHelp" />
                    </div>
                    <div>
                        {
                            message? message : null
                        }
                    </div>
                    <button type="submit" onClick={() => onSubmit()} className="btn btn-primary w-100 mb-3">
                        Submit
                    </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationCode