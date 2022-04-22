import React from 'react';
import { connect } from 'react-redux';

const Test = (props) => {

    var display = "Hello, ";
    display += props.username;
    console.log(display)
    return (
        <div>
            {display}
        </div>
    )
} 

const mapStateToProps = (state) => {
    return { username: state.auth.username }
}

export default connect(mapStateToProps)(Test);
