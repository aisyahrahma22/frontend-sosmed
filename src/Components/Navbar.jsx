import React from 'react';
import { Link } from 'react-router-dom';
import '../Supports/Stylesheets/Navbar.css';


class Navbar extends React.Component{

    render(){

        return(
        <div id= 'navbar' className='row'  style={{position: 'fixed', zIndex: '2', width: '100%'}}>
            <div className='col-12 col-md-6 col-lg-6 align-self-center'>
                <Link to="/" style={{ textDecoration: "none" }}>
                    <h3 style={{fontSize: '40px'}} className='ml-5 px-3' id='my-universe-navbar-logo'>
                        myUniverse
                    </h3>
                </Link>
            </div>
            <div className='col-12 col-md-6 col-lg-6 '>
                
             </div>
         </div>
        )
    }
}


export default Navbar