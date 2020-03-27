import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AuthorQuiz from './AuthorQuiz';
import * as serviceWorker from './serviceWorker';
import {shuffle, sample} from 'underscore';

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

const state = {
    turnData: getTurnData(authors)
};

ReactDOM.render(<AuthorQuiz {...state}/>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
