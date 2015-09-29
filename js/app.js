/** @jsx React.DOM */

const Input = ReactBootstrap.Input;
const monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
			dateArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 
			yearArray = [1980, 1981, 1982, 1983, 1984, 1985],
			stateArray = ['AL', 'CA', 'DE', 'FL', 'NY', 'MD', 'IL'];


var DropDown = React.createClass({
	render: function() {
		return (
			<Input className="select" 
				id={this.props.id}
				onChange={this.props.onChange}
				type="select">
				<option selected disabled>{this.props.name}</option>
			{this.props.list.map(function(item) {
				return (
					<option value={item}>{item}</option>
				);
			}, this)}
			</Input>
		);
	}
});

var InputText = React.createClass({
	render: function() {
		return (
			<Input type="text" id={this.props.id} onChange={this.props.onChange} 
						 placeholder={this.props.placeholder}/>
		);
	}
});

var Address = React.createClass({
	handleChange: function(e) {
		this.props.address[e.target.id] = e.target.value;
		console.log(e.target.id +": " + this.props.address[e.target.id]);
	},
	render: function() {
		var address = this.props.address;
		return (
			<div className="row">
				<label className="col-md-2">Address</label>
				<div className="col-md-10 form-inline">
					<InputText id="street" onChange={this.handleChange} value={address.street} 
									   placeholder="Street"/>
					<InputText id="unit" onChange={this.handleChange} value={address.unit} 
										 placeholder="Unit#"/>
					<InputText id="city" onChange={this.handleChange} value={address.city} 
									   placeholder="City"/>
					<DropDown name="State" id="state" onChange={this.handleChange} list={stateArray} 
					 					value={address.state}/>
					<InputText id="zip" onChange={this.handleChange} value={address.zip} 
										 placeholder="Zip"/>
				</div>
			</div>

		);
	}
});

var BasicInfo = React.createClass({
	getInitialState: function() {
		return {
			birthday: {},
			gender: null,
			address: {}
		}
	},
	handleBirthday: function(e) {
		var birthday = this.state.birthday;
		birthday[e.target.id] = e.target.value;
		this.setState({birthday: birthday});
		console.log(e.target.id +": " + this.state.birthday[e.target.id]);
	},
	handleGender: function(e) {
		this.setState({gender: e.target.value});
		console.log("gender: "+ e.target.value)
	},
	render: function() {
		var birthday = this.state.birthday,
				gender = this.state.gender,
				address = this.state.address;
		return (
			<div>
				<div className="row form-inline">
					<label className="col-md-2">Birthday</label>
					<div className="form-group col-md-10">
						<DropDown className="form-control" id="month" name="Month" 
								onChange={this.handleBirthday} list={monthArray} value={birthday.month}/>
						<DropDown name="Date" id="day" onChange={this.handleBirthday}
								list={dateArray} value={birthday.day}/>
						<DropDown name="Year" id="year" onChange={this.handleBirthday}
								list={yearArray} value={birthday.year}/>
					</div>
				</div>
				<div className="row">
					<label className="col-md-2">Gender</label>
					<div className="form-group col-md-10">
						<label className="radio-inline">
							<Input onChange={this.handleGender} type="radio" name="gender" value='Male'/>Male</label>
						<label className="radio-inline">
							<Input onChange={this.handleGender} type="radio" name="gender" value='Female'/>Female</label>
						<label className="radio-inline">
							<Input onChange={this.handleGender} type="radio" name="gender" value='Other'/>Other</label>
					</div>
				</div>
				<Address address={address}/>
			</div>
		);
	} 
});

var Background = React.createClass({
	render: function() {
		return (
			<div className="background-wrap">
				<h2>Basic Info</h2>
				<BasicInfo/>
			</div>
		);
	}
});
React.render(
	<Background />,
	document.getElementById('background-div')
);
