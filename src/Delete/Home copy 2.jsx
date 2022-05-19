import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Posts from '../Supports/Function/Posts'
import {onUserLogin, onCheckUserLogin, onCheckUserVerify} from '../Redux/Actions/userAction'
import LoadingSkeleton from '../Components/LoadingSkeleton';
import HomePost from '../Components/HomePost';


function Home(props) {
    
    const [pageNumber, setPageNumber] = useState(1)
    const navigate = useNavigate()
    const {
        posts,
        hasMore,
        loading,
        error,
        errorMsg
      } = Posts(pageNumber)

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

    if(!localStorage.getItem('myTkn')){
        return(
            <Navigate to='/landing' />
        )
    }else{
        return (
            <div className='pt-5 my-universe-background-home'>
                 <div className='d-flex'>
                 <div className='home-con'>
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
                     <div>{error && `${errorMsg}`}</div>
                 </div>
             </div>
            </div>
         );
    }

   
}

export default Home