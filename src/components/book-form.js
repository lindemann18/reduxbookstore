import React,{Component}  from 'react';
import {connect }  		  from 'react-redux';
import {fetchBook} 		  from '../actions';
import 	{Field,reduxForm} from 'redux-form';
import {Link} 			  from 'react-router-dom';

class BookForm extends Component{
	constructor(props)
	{
		super(props);
		this.state = {action:null,title:null,book:{}};
	}

	componentDidMount()
	{
		const {action} = this.props.match.params;
		const {id} = this.props.match.params;
		const title = action==="edit"?"Edit Book Information":"Add a Book";

		if(action==="edit")
		{
			this.props.fetchBook(id);
		}
	}

	renderField(field)
	{	
		console.log(field.value);
		const {meta:{touched,error}} = field;
		const className=`form-group ${touched && error ?'has-danger':''}`;
		return(
			<div className={className}>
				<label>{field.label}: </label>
				<input className="form-control" {...field.input} type="text"  />
				<div className="text-help">
					{touched ? error:""}
				</div>
			</div>
		);
	}


	onSubmit(values)
	{

	}

	render()
	{
		const {handleSubmit} = this.props;
		let {book} = this.props;
		
		return(
			<div className="col-md-12">
				<h2 className="text-center">{this.state.title}</h2>
				<div className="row">
					<form className="col-md-offset-3 col-md-6"
					onSubmit={handleSubmit(this.onSubmit.bind(this))}>
							<Field
							name="title"
							label="Title"
							component={this.renderField}
							/>

							<Field
							name="author"
							label="Author"
							component={this.renderField}/>

							<Field
							name="isbn"
							label="Isbn"
							component={this.renderField}/>

							<button type="submit" className="btn btn-primary">Submit</button>
							<Link type="buton" className="btn btn-danger" to="/">Cancel</Link>
					</form>
				</div>
			</div>
		);
	}

}

function validate(values)
{

}

function mapStateToProps(state)
{
	return {"book":state.books}
}

export default reduxForm({
	form:'PostsNewForm',
	validate
})(
	connect(mapStateToProps,{fetchBook})(BookForm)
);