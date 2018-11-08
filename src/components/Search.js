import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as BooksAPI from '../utils/BooksAPI'
import Book from './Book'

class Search extends Component {
    static propTypes = {
        userBooks: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired
    }

    state = {
        books: [],
        query: ''
    }

    render() {
        return (
            <div className="search-books">
                <div className="search-books-bar">
                    <Link to="/" className="close-search">Close</Link>
                    <div className="search-books-input-wrapper">
                        <input type="text" placeholder="Search by title or author"
                            value={ this.state.query } onChange={ (e) => {
                                const queryText = e.target.value
                                this.setState(() => {
                                    return { query: queryText.toString() }
                                })
                                if (queryText.length > 0) {
                                    BooksAPI.search(queryText, 20).then((books) => {
                                        if (books.length > 0) {
                                            books = books.filter((book) => book.imageLinks && book.authors)
                                            this.setState(() => {
                                                return { books }
                                            })
                                        } else {
                                            this.setState(() => {
                                                return { books: [] }
                                            })
                                        }
                                    })
                                } else {
                                    this.setState((books) => {
                                        return { books: [], query: '' }
                                    })
                                }
                            }} />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {
                        this.state.books.map((book) => {
                            if (this.props.userBooks.filter((userBook) => userBook.id === book.id).length > 0) {
                                const userBook = this.props.userBooks.filter((userBook) => userBook.id === book.id)[0]
                                return (
                                    <Book key={ userBook.id } book={ userBook } onShelfChanged= { this.props.onShelfChanged }/>
                                )
                            } else {
                                book.shelf = "none"
                                return (
                                    <Book key={ book.id } book={ book } onShelfChanged= { this.props.onShelfChanged }/>
                                )
                            }
                        })
                    }
                    </ol>
                </div>
            </div>
        );
    }
}

export default Search
