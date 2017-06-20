import axios from 'axios';

export const FETCH_BOOKS = 'fetch_books';
export const FETCH_BOOK  = 'fetch_book';

const ROOT_URL = 'http://ashernetz.com/api/index.php/books/';

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