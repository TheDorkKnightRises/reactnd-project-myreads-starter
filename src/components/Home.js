import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Bookshelf from './Bookshelf'
import PropTypes from 'prop-types'

class Home extends Component {
    static propTypes = {
        books: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired
    }

    render() {
        const books = this.props.books

        const currentlyReadingBooks = books.filter( (book) => book.shelf === 'currentlyReading' )
        const wantToReadBooks = books.filter( (book) => book.shelf === 'wantToRead' )
        const readBooks = books.filter( (book) => book.shelf === 'read' )

        return (
            <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
            <div className="list-books-content">
                <div>
                    <Bookshelf shelftype="currentlyReading" books={currentlyReadingBooks} onShelfChanged={ this.props.onShelfChanged }/>
                    <Bookshelf shelftype="wantToRead" books={wantToReadBooks} onShelfChanged={ this.props.onShelfChanged } />
                    <Bookshelf shelftype="read" books={readBooks} onShelfChanged={ this.props.onShelfChanged } />
                </div>
            </div>
                <div className="open-search">
                    <Link to="/search">Add a book</Link>
                </div>
            </div>
        )
    }
}

export default Home
