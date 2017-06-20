import React,{Component}  from 'react';
import {connect }  		  from 'react-redux';
import {fetchBook} 		  from '../actions';
import 	{Field,reduxForm} from 'redux-form';
import {Link} 			  from 'react-router-dom';
import editBook from '../actions';

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
		this.setState({...this.state,title});

		if(action==="edit")
		{
			this.props.fetchBook(id);
		}
		console.log(this.props.editBook);
	}

	componentDidUpdate()
	 {
	 	if(this.props.match.params.action==="edit")
		{
			if(this.props.book && this.props.book.title)
			{
				//this.props.change("title", this.props.book.title);
				//this.props.change("author", this.props.book.author);
				//this.props.change("isbn", this.props.book.isbn);
			}
		}
	 }

	renderField(field)
	{	
		const {meta:{touched,error}} = field;
		const className=`form-group ${touched && error ?'has-danger':''}`;
		return(
			<div className={className}>
				<label>{field.label}: </label>
				<input className="form-control" {...field.input} type="text" />
				<div className="text-help">
					{touched ? error:""}
				</div>
			</div>
		);
	}


	onSubmit(values)
	{
		alert("holis");
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
// //
function validate(values)
{
	const errors = {};
	if(!/^[a-z]{3,40}$/i.test(values.title))
	{
		errors.title = "Enter a title with at least 3 characters";
	}

	return errors;
}	

function mapStateToProps(state)
{
	return {"book":state.books}
}

export default reduxForm({
	form:'BooksEditForm',
	validate
})(
	connect(mapStateToProps,{fetchBook,editBook})(BookForm)
);