import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
import promise from 'redux-promise';
import reducers   from './reducers';

// Components
import BooksIndex  from './components/books-index.js';
import BookDetails from './components/book-details.js';
import BookEdit    from './components/book-form.js';


const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

ReactDOM.render(
  <Provider store={createStoreWithMiddleware(reducers)}>
    <BrowserRouter>
    	<div>
    		<Switch>
    			<Route path="/book-details/:id" component={BookDetails} />
    			<Route path="/book-edit/:id/:action" component={BookEdit} />
    			<Route path="/" component={BooksIndex}/>
    		</Switch>
    	</div>
    </BrowserRouter>
  </Provider>
  , document.querySelector('.container'));
