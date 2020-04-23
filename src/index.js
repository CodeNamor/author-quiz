import React from 'react';
import ReactDOM from 'react-dom';
import * as Redux from 'redux';
import * as ReactRedux from 'react-redux';
import {BrowserRouter, Route, withRouter } from 'react-router-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';
import AddAuthorForm from './AddAuthorForm';


const authors = [
    {
        name : 'Mark Twain',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource:'Wikimedia Commons',
        books: ['The Adventures of Huckleberry Finn']
    },
    {
        name : 'Joseph Conrad',
        imageUrl: 'images/authors/josephconrad.png',
        imageSource:'Wikimedia Commons',
        books: ['Hearth of Darkness']   
    },
    {
        name : 'Stephen King',
        imageUrl: 'images/authors/stephenking.jpg',
        imageSource:'Wikimedia Commons',
        books: ['The Shining', 'IT']   
    },
    {
        name : 'Charles Dickens',
        imageUrl: 'images/authors/marktwain.jpg',
        imageSource:'Wikimedia Commons',
        books: ['David Cooperfield', 'A Tale of Two Cities']   
    },
    {
        name : 'William Shakespare',
        imageUrl: 'images/authors/williamshakespare.jpg',
        imageSource:'Wikimedia Commons',
        books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']   
    },
];

function getTurnData(authors) {
    const allBooks = authors.reduce(function (p, c, i) {
        return p.concat(c.books)
    }, []);
    const fourfourRandomBooks = shuffle(allBooks).slice(0,4);
    const answer = sample(fourfourRandomBooks);

    return {
        books: fourfourRandomBooks,
        author: authors.find((author) =>
            author.books.some((title) =>
                title === answer))
    }
}

function resetState() {
    return {
        turnData: getTurnData(authors),
        highlight: ''
    };
}
function reducer(state = {authors, turnData: getTurnData(authors), highlight: ''}, action) {
    switch (action.type) {
        case 'ANSWER_SELECTED':
            const isCorrect = state.turnData.author.books.some((book) => book === action.authors);
            return Object.assigh({}, state, {
                highlight: isCorrect ? 'correct' : 'wrong'
            });
        default:
            return state

    }
    return state;
}

let store = Redux.createStore(reducer);

let state = resetState();

function App() {
    return <ReactRedux.Provider store={store}>
        <AuthorQuiz />;</ReactRedux.Provider>
}

const AuthorWrapper = withRouter(({ history }) =>
    <AddAuthorForm onAddAuthor={(author) => {
        authors.push(author);
        history.push('/');
    }} />
);

function render() {
    ReactDOM.render(
    <BrowserRouter>
        <React.Fragment>
            <Route exact path="/" component={App} />
            <Route exact path="/add" component={AuthorWrapper} />
        </React.Fragment>
    </BrowserRouter>, document.getElementById('root'));
}
render();
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
