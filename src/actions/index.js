import axios from 'axios';

export const FETCH_BOOKS = 'fetch_books';
export const FETCH_BOOK  = 'fetch_book';
export const EDIT_BOOK   = 'edit_book';

const ROOT_URL = 'http://ashernetz.com/api/index.php/books/';

export function editBook(values)
{
	const request = axios.put(`${ROOT_URL}/`,values).then(
		()=>callback());
	return {
		type:EDIT_BOOK,
		payload:request
	};
}

export function fetchBooks(){
	const request = axios.get(ROOT_URL);
	return{
		type:FETCH_BOOKS,
		payload:request
	}
}

export function fetchBook(id){
	const request = axios.get(`${ROOT_URL}${id}`);
	return{
		type:FETCH_BOOK,
		payload:request
	}
}