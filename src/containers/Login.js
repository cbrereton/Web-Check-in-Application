import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import { acquireSeat, setSeatGuid } from '../actions/cc_settings';
import Loading  from '../components/Loading';

class Login extends Component {
    constructor(props, context) {
        super(props);

        let stationName = window.localStorage.getItem('stationName') || "";
        this.state = {
            stationName,
            errorText : "",
            isLoading : false
        };

        this.startLogin = this.startLogin.bind(this);
        this.updateStation = this.updateStation.bind(this);
    }
    
    // Start Logging into web check-in
    startLogin(event) {
        event.preventDefault();
        
        if(!this.state.stationName) {
            this.setState({
                errorText : "A station name is required..."
            });
            return false;
        }
        this.setState({isLoading : true});
        acquireSeat(this.state.stationName)
            .then((response) => {
                    if (!response.data.d.Fault) {
                         this.props.setSeatGuid(response.data.d.StationGuid);
                        this.context.router.push('/admin/results');
                    } else {
                        this.setState({
                            errorText : "Sorry, we are unable to find a seat for this device...",
                            isLoading : false
                        });
                    }                  
            })
            .catch((err) => {
                this.setState({
                    errorText : "Sorry, we are unable to find a seat for this device...",
                    isLoading : false
                });
            });
    }

    // Update station name state
    updateStation(ev) {
        this.setState({
			stationName: event.target.value
		});
		window.localStorage.setItem('stationName', (event.target.value) || "");
    }


    render() {
        return (
            <div className="login">
                <div className="title">
                    <h1>Welcome</h1>
                    <h5>Please enter a station name</h5>
                </div>
                <div className="card">
                    <form onSubmit={this.startLogin}>
                        <div className="card-content">
                        <div className="form-group station-name-group">
                            <label for="stationName">Station Name</label>
                            <input className="form-control" type="text"
                                placeholder="Enter a station name.." 
                                value={this.state.stationName}  
                                onChange={this.updateStation} 
                                autoFocus                                                                
                            />
                            { this.state.errorText ? 
                                <span className="station-required" >{this.state.errorText}</span>
                                :
                                ""
                            }                            
                        </div>	
                        </div>
                        
                        <button className="btn-full btn-large btn-none b-t-light btn-col-green v-a-sub p-l-0" type="submit">
                            { this.state.isLoading ? 
                                <Loading /> :
                                "Start"
                            }
                        </button>			                        
                    </form>
                </div>
                <div className="validar-logo">
                    <img src={require('../static/validar-logo-original.png')} />
                </div>
            </div>

        );
    }
}

Login.contextTypes = {
	router : PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSeatGuid : (guid) => dispatch(setSeatGuid(guid))
    };
}

export default connect(null, mapDispatchToProps)(Login);