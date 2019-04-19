import React, { Component } from 'react';
import './Navbar.css';

class Navbar extends Component {
    render() {
        return (
            <div className="Navbar-H">
                <div>
                    <p>Overview Data</p>
                </div>
                <div>
                    <form onSubmit={this.props.submit}>
                        <input 
                            type="text"
                            className="Navbar-Input" 
                            placeholder="Search..."
                            value={this.props.text}
                            onChange={this.props.changed}
                         />
                        <button type="submit" className="Navbar-Submit">Search</button>
                        
                    </form>
                    <div className="Navbar-List">
                        {this.props.renderSuggestions()}
                    </div>
                </div>
            </div>
        );
    }
}

export default Navbar;