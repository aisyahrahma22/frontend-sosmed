import React from 'react';
import { Link } from 'react-router-dom';
import '../Supports/Stylesheets/Loading.css';


class Loading extends React.Component{

    render(){

        return(
        <div className='col-lg-4 col-md-6 col-12'>
             <template id="card-template">
                <div class="card">
                <div class="header">
                    <img class="header-img skeleton" src="https://source.unsplash.com/100x100/?nature" />
                    <div class="title" data-title>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    </div>
                </div>
                <div data-body>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text"></div>
                </div>
                </div>
            </template>
         </div>
        )
    }
}


export default Loading