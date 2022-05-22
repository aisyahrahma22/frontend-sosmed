import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import Posts from '../Supports/Function/Posts'
import LoadingSkeleton from '../Components/LoadingSkeleton';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify } from './../Redux/Actions/userAction'
import { connect } from 'react-redux';
import HomePost from '../Components/HomePost';
import Swal from 'sweetalert2';
import axios from 'axios';

function Home({user}) {
    const [pageNumber, setPageNumber] = useState(1)
    const {
        posts,
        hasMore,
        loading,
        error,
        errorMessage
      } = Posts(pageNumber)

    const [verify, setVerify] = useState('')
    const observer = useRef()
    const lastPostRef = useCallback(node => {
        if (loading) return
        if (observer.current) observer.current.disconnect()
        observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
            setPageNumber(prevPageNumber => prevPageNumber + 1)
        }
        })
        if (node) observer.current.observe(node)
    }, [loading, hasMore])

    
    useEffect(() => {
        getUserVerify()
        onCheckUserLogin()
    }, [])

    const getUserVerify = () => {
        let token = localStorage.getItem('myTkn')
        const headers = {
            headers: { 
                'Authorization': `${token}`,
            }
        }

        axios.get(`http://localhost:5000/user/userverify`,  headers)
            .then((res) => {
                setVerify(res.data[0].is_confirmed)
            }).catch((err) => {
                console.log(err)
            })
    }

    const onResendEmail = () => {
        let token = localStorage.getItem('myTkn')

        axios.post('http://localhost:5000/user/resend', {}, {headers: {
            'Authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            Swal.fire({
                title: 'Success!',
                text: 'Check Your Email',
                icon: 'success',
                confirmButtonText: 'Okay!'
            })
        })
        .catch((err) => {
            console.log(err)
        })
    }

    if(!user.is_login){
        return(
            <Navigate to='/landing' />
        )
    }else{
        return (
            <div className='pt-5'>
                <div className='container pt-5'>
                   {
                        verify === 1?
                        <span>
                        
                        </span>
                            :
                       <div className='col-3'  style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>
                            <span className="d-flex flex-column">
                            <div className='mb-2 text-center'>Click button here to activate the feature</div>
                            <button type="button" className="btn btn-outline-dark" disabled={user.loading} onClick={() => onResendEmail()}>
                                {
                                    user.loading?
                                        'Loading'
                                    :
                                        'Resend Email Confirmation'
                                }
                            </button>    
                        </span>
                       </div>
                    } 
                </div>
                 <div className='d-flex'> 
                    <div className='home-con'> 
                        <div>
                            </div>                   
                                {
                                    posts.map((post, index) => {
                                        if (posts.length === index + 1) {
                                            return <div ref={lastPostRef} key={post.id}>
                                                <HomePost  post={post} pageNumber={pageNumber} />
                                            </div>
                                        } 
                                        else {
                                            return <div key={post.id}>
                                                <HomePost post={post} pageNumber={pageNumber} />
                                            </div>
                                        }
                                    })
                                }
                                <div>{loading && <LoadingSkeleton />}</div>
                                <div>{error && `${errorMessage}`}</div>
                            </div>
                    </div>
                </div>
         );
    }

   
}

const mapDispatchToProps = {
    onUserLogin, onCheckUserLogin, onCheckUserVerify
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps) (Home)