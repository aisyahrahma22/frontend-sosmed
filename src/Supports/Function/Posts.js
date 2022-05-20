import axios from 'axios';
import { API_URL } from '../Helpers/index';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function Posts(pageNumber, props) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [posts, setPosts] = useState([])
    const [hasMore, setHasMore] = useState(false)
    const token = localStorage.getItem('myTkn')

    useEffect(() => {
        setLoading(true)
        setError(false)
        axios.get(`${API_URL}/post/getallposts?page=${pageNumber}&limit=6`, {
            headers: {
            authorization: token
            }
        }).then(res => {
        setPosts(prevPosts => {
            return [...prevPosts, ...res.data.map(post => ({
                id: post.id,
                image: post.image,
                caption: post.caption,
                created_at: post.created_at,
                postId: post.id,
                userId: post.userId,
                profilepicture: post.profilepicture,
                username: post.username,
                totalLike: post.totalLike,
                myLike: post.myLike
            }))]
        })
        setHasMore(res.data.length > 0)
        setLoading(false)
        }).catch(e => {
            setLoading(false)
            setError(true)
            setErrorMessage(e.message)
        })
    }, [pageNumber])

    return { loading, error, posts, hasMore, errorMessage }
}