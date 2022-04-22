import React from 'react';
import { Navigate, Link } from 'react-router-dom';
import Peoples66 from './../Supports/Images/Peoples66.png';
import '../Supports/Stylesheets/HomePage.css';
import Axios from 'axios';
import HomePost from './HomePost';
// // import CardHomePost from '../Components/CardHomePost';
// // import InfiniteScroll from 'react-infinite-scroll-component';

// Redux
import {connect} from 'react-redux';
import {onUserLogin, onCheckUserLogin, onCheckUserVerify} from './../Redux/Actions/userAction'


class Home extends React.Component{
        //  printProducts = () => {
    //     let { products } = this.state;
    //     return products.map((value, index) => {
    //         return <div className='col-12 col-md-6 col-lg-3 my-2' key={index}>
    //             <CardHomePost detail={value} />
    //         </div>
    //     })
    // }

    onResendEmail = () => {
        let token = localStorage.getItem('myTkn')

        Axios.post('http://localhost:5000/user/resend', {}, {headers: {
            'Authorization': token,
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }})
        .then((res) => {
            alert('Check Your Email!')
        })
        .catch((err) => {
            console.log(err)
        })
    }

    render(){
        if(this.props.user.is_login){
            return(
                <>
                <div className='row'>
                    home
                {/* {
                    this.props.user.is_confirmed === 1?
                    <span>
                         ini home
                    </span>
                        :
                    <span className="ml-3">
                        <input type="button" value="Resend Email Confirmation" onClick={() => this.onResendEmail()} className="btn rounded shadow-lg mytodosapps-bg-secondary mytodosapps-light mytodosapps-input" />        
                    </span> */}
                
                    
                  
                   {/* <HomePost/> */}
                {/* <InfiniteScroll
                    dataLength={this.state.products.length}
                    next={this.getProducts}
                    style={{ display: 'flex', flexWrap: 'wrap' }} //To put endMessage and loader to the top.
                    hasMore={true}
                >
                    {this.printProducts()}
                </InfiniteScroll> */}
                </div>
                <div>
                    {/* <h1>
                        {
                            this.state.isLoading? 'Loading...' : null
                        }
                    </h1> */}
                </div> 
                </>
            )
        }

        return(
            <Navigate to='/landing' />
        )
    }
}

const mapDispatchToProps = {
    onUserLogin, onCheckUserLogin,  onCheckUserVerify
}

const mapStateToProps = (state) => {
    return{
        user: state.user
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)