import React,{Component} from 'react';
import {connect} from 'react-redux';
import {fetchBooks} from '../actions';
import _ from 'lodash';

class BooksIndex extends Component{
	constructor(props)
	{
		super(props);
		this.state = {selectedBook:null,error:""};
	}

	componentDidMount()
	{
		this.props.fetchBooks();
	}

	BookInfo(selectedBook)
	{
		this.setState({
			selectedBook
		},()=>{
			// selecting row.
			let rows = document.getElementsByClassName("selectedRow");
			if(rows[0]!=undefined)
			{
				rows[0].className = "text-center";
			}
				let row = document.getElementById(`book-${this.state.selectedBook}`);
				row.className = "text-center selectedRow";
			
		});
		
	}

	renderBooks()
	{
		let {books} = this.props;
		return _.map(books,book=>{
			return(
				<tr className="text-center" key={book.id} onClick={this.BookInfo.bind(this,book.id)}
				id={`book-${book.id}`}>
					<td>{book.author}</td>
					<td>{book.title}</td>
					<td>{book.isbn}</td>
				</tr>
			);
		});		
	}

	RedirectEdit()
	{
		if(this.state.selectedBook!=null)
		{
			this.props.history.push(`/book-edit/${this.state.selectedBook}/edit`)
		}else{
			this.ShowError("Error: Favor de seleccionar un libro");
		}
	}

	RedirectInfo()
	{
		if(this.state.selectedBook!=null)
		{
			this.props.history.push(`/book-details/${this.state.selectedBook}`)
		}else{
			this.ShowError("Error: Favor de seleccionar un libro");
		}
	}

	ShowError(error)
	{
		this.setState({
				...this.state,
				error
			},()=>{
				let error_message = document.querySelector("#error-message");
				error_message.className = "alert alert-danger show";
				setTimeout(()=>{
					error_message.className = "alert alert-danger hidden";
				},2000);
			});
	}

	render()
	{

		return(
			<div className="col-md-12">
				<div className="alert alert-danger hidden" role="alert" id="error-message">
					<p className="text-center">{this.state.error}</p>
				</div>
				<div className="row">
					<table className="table table-striped">
						<thead>
							<tr>
								<th className="text-center">Author</th>
								<th className="text-center">Name</th>
								<th className="text-center">ISBN</th>
							</tr>
						</thead>
						<tbody>
							{this.renderBooks()}
						</tbody>
					</table>
					<div className="col-md-12">
						<div className="btn-group">
							<btn className="btn btn-primary" onClick={this.RedirectEdit.bind(this)}>Edit</btn>
							<btn className="btn btn-info" onClick={this.RedirectInfo.bind(this)}>Info</btn>
							<btn className="btn btn-danger" onClick={this.RedirectEdit}>Delete</btn>
						</div>
					</div>
				</div>
			</div>
		);
	}
}


function mapStateToProps(state)
{
	return {"books":state.books}
}

export default connect(mapStateToProps,{fetchBooks})(BooksIndex);