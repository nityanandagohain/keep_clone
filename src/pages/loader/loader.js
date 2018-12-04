import React, {Component} from 'react';

export default class Loader extends Component {
    // constructor(props){
    //     super(props);
    // }
    render(){
        return(
            <div className="loader">
                <div style={{margin:'300px',fontSize:"40px"}}>
                    <p>Loading.......</p>
                </div>
            </div>
        );
    }
}