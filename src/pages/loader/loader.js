import React, {Component} from 'react';
import "./loader.css"

export default class Loader extends Component {
    constructor(props){
        super(props);
    }
    
    render(){
        
        return(
            <div className={this.props.theme ?'dark' :'light'}>
                <main>
                    <div style={{margin:'390px',fontSize:"40px"}}>
                        <p>Loading.......</p>
                    </div>
                </main>
            </div>
        );
    }
}