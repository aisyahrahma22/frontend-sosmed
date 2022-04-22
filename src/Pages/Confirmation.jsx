import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams, Navigate } from 'react-router-dom'
import Peoples77 from './../Supports/Images/Peoples77.png';
import { Link } from 'react-router-dom';

// SweetAlert
import Swal from 'sweetalert2';
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 5000,
    timerProgressBar: true,
})

const Confirmation = () => {

    const [isRedirect, setIsRedirect] = useState(false)

    let params = useParams();

    const [message, setMessage] = useState('')

    useEffect(() => {
        onConfirmation()
    }, [])

    const onConfirmation = () => {
        Axios.patch('http://localhost:5000/user/confirmation', {}, {headers: {
            'Authorization': params.token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            Toast.fire({
                icon: 'success',
                title: res.data.message
            })
            setIsRedirect(true)
            localStorage.setItem('myTkn', params.token)
        })
        .catch((err) => {
            setMessage(err.response.data.message)
            Toast.fire({
                icon: 'error',
                title: err.response.data.message
            })
        })
    }

    if(isRedirect){
        return(  
            <Navigate to='/' />
        )
    }

    return(
        <div className="container">
            <div className="row justify-content-center align-items-center" style={{height: '100vh'}}>
            <div className="col-6 text-center px-5 rounded">
            <div className="d-none d-md-block">
                    <img src={Peoples77} alt="" width="100%" />
                </div>
            </div>
                <div className="col-6">
                   <div className='text-center'>
                   <h3>Welcome to be a part of</h3>
                    <h4>myUniverse</h4>
                    <p style={{fontSize: '20px'}}>
                        Enjoy Our Features!
                    </p>
                    <b>
                    <Link to="/login">
                    <u>
                        Click here to Login
                    </u>
                    </Link>
                    </b>
                    <br></br>
                    <i style={{color:'purple'}}>
                        {
                            message? message : null
                        }
                    </i>
                   </div>
                </div>
            </div>
        </div>
    )
}

export default Confirmation