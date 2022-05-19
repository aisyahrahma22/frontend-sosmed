import React, { Component } from "react";
import axios from "axios";
import { API_URL } from '../Supports/Helpers/index';
import LoadingSkeleton from '../Components/LoadingSkeleton';
import moment from 'moment';
import { Navigate, Link } from 'react-router-dom';
import Heart from "../Supports/Images/heart.svg";
import HeartFilled from "../Supports/Images/heartFilled.svg";
import '../Supports/Stylesheets/HomePage.css';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      listPosts: [], 
      loading: false,
      page: 1,
      prevY: 0
    };
  }

  componentDidMount() {
    this.getPhotos(this.state.page);
    var options = {
        root: null,
        rootMargin: "0px",
        threshold: 1.0
      };
      
      this.observer = new IntersectionObserver(
        this.handleObserver.bind(this),
        options
      );
      this.observer.observe(this.loadingRef);     
  }

  handleObserver(entities, observer) {
    const y = entities[0].boundingClientRect.y;
    console.log('ini y', y)
    if (this.state.prevY > y) {
      const lastPhoto = this.state.photos[this.state.photos.length - 1];
      const curPage = lastPhoto.albumId;
      this.getPhotos(curPage);
      console.log('ini curPage', curPage)
      this.setState({ page: curPage });
    }
    this.setState({ prevY: y });
  }


  getPhotos(page) {
    let token = localStorage.getItem('myTkn')
    this.setState({ loading: true });
    const headers = {
      headers: { 
          'Authorization': `${token}`,
      }
  }
    axios.get(`http://localhost:5000/post/getallposts?page=${page}&limit=6`, headers)
    .then((res) => {
      console.log('ini res home', res.data)
      // this.setState({ listPosts: res.data});
      this.setState({ photos: [...this.state.photos, ...res.data] });
      this.setState({ loading: false });
    }).catch((err) => {
        console.log(err)
    })
  }

  // getPhotos(page) {
  //   this.setState({ loading: true });
    
  //   axios.get(
  //       `https://jsonplaceholder.typicode.com/photos?_page=${page}&_limit=6`
  //     )
  //     .then(res => {
  //       console.log('ini res home', res.data)
  //       this.setState({ photos: [...this.state.photos, ...res.data] });
  //       this.setState({ loading: false });
  //     });
  // }

  render() {

    // Additional css
    const loadingCSS = {
      height: "100px",
      margin: "30px"
    };

    // To change the loading icon behavior
    const loadingTextCSS = { display: this.state.loading ? "block" : "none" };

    return (
    <div className='container-fluid my-universe-background-home'>
        <div className='pt-5'>    
            <div className='container'>
                    <div className='pt-5'>
                         <div className="">
                            <div className="row">
                            {this.state.photos.map(user => (
                                <>
                                  <div className='col-12 col-md-6 col-lg-4 my-2'>
                                      <div className="card product-card">
                                          <div className='tittle  mb-2'>
                                              <div className='d-flex'>
                                                  <img  src={`${API_URL + '/'}${user.profilepicture}`} id="userImg" />
                                                  <Link to={`/detailprofile/${user.userId}`} style={{cursor: 'pointer', textDecoration: 'none', color: 'black'}}>
                                                  <span style={{fontFamily: "Source Sans Pro"}}>{user.username}</span>
                                                  </Link>
                                              </div>    
                                          </div>
                                          <Link  to={`/detailpost/${user.id}`}style={{ textDecoration:"none", color: "inherit" }}>
                                          <img src={`${API_URL + '/'}${user.image}`} alt="foto post" id="postImg" />
                                          </Link>
                                          <div className="mt-2">
                                      <div className='d-flex flex-column'>
                                          <span className="text-muted" style={{fontSize: '14px', fontFamily: "Source Sans Pro"}}>{moment(user.created_at).format('LLL')}</span>
                                          <span>
                                          {user.myLike > 0 ? (
                                              <img src={HeartFilled} alt="" id="cardIcon" onClick={() => this.handleClick(user.id)}/>
                                              ) : (
                                              <img
                                                  src={Heart}
                                                  alt=""
                                                  id="cardIcon"
                                                  onClick={() => this.handleClick(user.id)}
                                              />
                                              )}
                                            <span style={{fontSize: '12px', color: 'purple', marginTop: '2px', fontFamily: "Source Sans Pro"}}>
                                            {user.totalLike} peoples love this
                                            </span>
                                          {/* {
                                              this.props.user.is_confirmed === 1?
                                              <div id="interaction">
                                              {user.myLike > 0 ? (
                                              <img src={HeartFilled} alt="" id="cardIcon" onClick={() => this.handleClick(user.id)}/>
                                              ) : (
                                              <img
                                                  src={Heart}
                                                  alt=""
                                                  id="cardIcon"
                                                  onClick={() => this.handleClick(user.id)}
                                              />
                                              )}
                                            <span style={{fontSize: '12px', color: 'purple', marginTop: '2px', fontFamily: "Source Sans Pro"}}>
                                            {user.totalLike} peoples love this
                                            </span>
                                              </div>
                                                  :
                                              <span>
                                              <img
                                                  src={Heart}
                                                  alt=""
                                                  id="cardIcon"
                                              />
                                              </span>
                                          } */}
                                          </span>
                                      </div>
                                  </div>
                              </div>
                          </div>
                                </>
                              
                            ))}
                            </div>
                            <div
                            ref={loadingRef => (this.loadingRef = loadingRef)}
                            style={loadingCSS}
                            >
                            <span style={loadingTextCSS}><LoadingSkeleton/></span>
                            </div>
                        </div>
                    </div>
            </div> 
        </div>  
    </div>
    );
  }
}

export default Home;