import React,{Component} from 'react';
import {connect } from 'react-redux';
import {fetchBook} from '../actions';


class BookDetails extends Component{
	constructor(props)
	{
		super(props);
		this.state = {};
	}

	componentDidMount()
	{
		const {id} = this.props.match.params;
		this.props.fetchBook(id);
	}



	render()
	{
		let {book} = this.props;
		return(
			<div className="col-md-12">
				<div className="row">
					<div className="bookinfo text-center" key={book.id}>
						<h2>{book.title}</h2>
						<h3>{book.author}</h3>
						<h3>{book.isbn}</h3>
					</div>
				</div>
			</div>
		);
	}

}

function mapStateToProps(state)
{
	return {"book":state.books}
}

export default connect(mapStateToProps,{fetchBook})(BookDetails);