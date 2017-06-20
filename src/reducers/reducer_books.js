import {FETCH_BOOKS,FETCH_BOOK,EDIT_BOOK} from '../actions';
import _ from 'lodash';

export default function(state = {},action) {
	switch(action.type)
	{
		case FETCH_BOOKS:
			return _.mapKeys(action.payload.data,'id');

		case FETCH_BOOK:
		return action.payload.data;

		case EDIT_BOOK:
		return action.payload.data;

		default:
			return state;
	}
}