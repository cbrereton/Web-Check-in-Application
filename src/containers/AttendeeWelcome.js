import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { clearAllSearching } from '../actions/cc_registrant';

class AttendeeWelcome extends Component {
	constructor(props) {
		super(props);
	}

	// Clear all searches
	componentWillMount(){		
		this.props.clearAllSearching();
	}

	render() {
		const { attendeeConfig } = this.props;
		return (
			<div className="attendee-welcome container-fluid">

				<Link to="/attendee/password" className="attendee-password-btn">

				</Link>
				
				<div className="row">
					<div className="instruction-text col-xs-12">
						Please select your method of checking in.
					</div>
				</div>
				<div className={"row " + ((attendeeConfig && !attendeeConfig.Search && !attendeeConfig.Scan) ? "invisible" : "")}>
					<div className="col-xs-12 col-sm-6 offset-sm-3">
						<div className="select-entry-method text-center">
							{
								(attendeeConfig && attendeeConfig.Search) ?
								<Link to="/attendee/search" className={"method-search " + ((attendeeConfig && attendeeConfig.Scan) ? "" : "one-method")}>
									<div className="method-icon">
										<i className="material-icons">search</i>
									</div>
									<div className="method-text">
										Search
									</div>
								</Link> :
								""
							}							
							{
								(attendeeConfig && attendeeConfig.Scan) ? 
								<Link to="/attendee/scan" className={"method-scan " + ((attendeeConfig && attendeeConfig.Search) ? "" : "one-method")}>
									<div className="method-icon">
										<i className="material-icons">filter_center_focus</i>
									</div>
									<div className="method-text">							
										Scan
									</div>
								</Link> :
								""
							}							
						</div>						
					</div>
				</div>
				{
					(attendeeConfig && attendeeConfig.WalkIns) ?
					<div className="row">
						<div className="col-xs-12 col-sm-6 offset-sm-3 method-walkin text-center">
							<Link to="/attendee/walkin">
								Not registered?<br />Register here.
							</Link>
						</div>
					</div> :
					""
				}							
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		attendeeConfig : state.settings.configuration.AttendeeMode
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		clearAllSearching : () => dispatch(clearAllSearching())
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(AttendeeWelcome);