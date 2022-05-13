import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardHomePost = (props) => {
 
    return (
        <div className="card">
             <img src='' className="card-img-top" sytle={{width: 300, height:240}} />
            <div className="card-body d-flex justify-content-between">
                <h6 className="card-title mt-n2">Name</h6>                                   
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="#" className="btn btn-primary rounded-0 w-100">Detail Product</a>
            </div>
            <button className='btn btn-info'>Add To Cart</button>
        </div>
    )
}

export default CardHomePost;