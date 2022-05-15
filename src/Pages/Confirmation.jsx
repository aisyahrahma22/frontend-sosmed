import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { useParams, Navigate } from 'react-router-dom'
import Peoples7 from './../Supports/Images/Peoples7.png';
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
    }else if(!localStorage.setItem('myTkn', params.token)){
        return(  
            <div className='container-fluid my-universe-background-home' id="my-universe-background-con">
            <div className='pt-3'>     
                <div className='container'>
                    <div className='row' style={{paddingBottom: '13px'}}>
                        <div className="col-6">
                            <div className="d-none d-md-block">
                                <img src={Peoples7}  alt="" width="100%" />
                            </div>
                        </div>
                        <div className="col-6" style={{fontFamily: "Source Sans Pro"}}>
                            <div className='text-center mt-5'>
                            <h3 style={{paddingTop: '100px', fontSize: '40px'}}></h3>
                                    <h3 style={{fontSize: '40px'}}  className='pb-3' id='my-universe-navbar-logo' >
                                        myUniverse
                                    </h3>
                                <p style={{fontSize: '20px'}}>
                                    Can't reach your token because it's already expired
                                </p>
                                <p style={{fontSize: '20px'}}>
                                Please resend email confirmation or
                                </p>
                                <b>
                                <Link to="/login" style={{cursor: 'pointer', textDecoration: 'none', color: 'purple'}}>
                                <u>
                                    Click here to Login
                                </u>
                                </Link>
                                </b>
                                <br></br>
                                <i style={{color:'purple'}}>
                                    
                                </i>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
        )
    }else{
        return(
            <>
            <div className='container-fluid my-universe-background-home' id="my-universe-background-con">
                <div className='pt-3'>     
                     <div className='container'>
                        <div className='row' style={{paddingBottom: '13px'}}>
                            <div className="col-6">
                                <div className="d-none d-md-block">
                                    <img src={Peoples7} alt="" width="100%" />
                                </div>
                            </div>
                            <div className="col-6" style={{fontFamily: "Source Sans Pro"}}>
                                <div className='text-center mt-5'>
                                <h3 style={{paddingTop: '100px'}}>Welcome to be a part of</h3>
                                         <h3 style={{fontSize: '40px'}}  className='pb-3' id='my-universe-navbar-logo' >
                                            myUniverse
                                        </h3>
                                    <p style={{fontSize: '20px'}}>
                                        Enjoy Our Features!
                                    </p>
                                    <b>
                                    <Link to="/login" style={{cursor: 'pointer', textDecoration: 'none', color: 'purple'}}>
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
                </div>
            </div>
            </>
        )
    }

    
}

export default Confirmation