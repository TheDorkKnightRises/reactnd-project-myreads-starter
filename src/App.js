import React from 'react'
import { Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Home from './Home'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
    state = {
        books: []
    }

    componentDidMount() {
        // Fetch book data
        BooksAPI.getAll().then((books) =>  {
            this.setState({ books })
            // console.log(books)
        })
    }

    updateShelf = (book, shelf) => {
        // Update shelf
        BooksAPI.update(book, shelf).then(() => {
            // Fetch updated book data
            BooksAPI.getAll().then((books) =>  {
                this.setState({ books })
                // console.log(books)
            })
        })
    }

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={
                    () => {
                        return <Home books={ this.state.books } onShelfChanged= { this.updateShelf }/>
                    }
                } />
                <Route path="/search" render={
                    () => {
                        return <Search userBooks={ this.state.books } onShelfChanged= { this.updateShelf }/>
                    }
                } />
            </div>
        )
    }
}

export default BooksApp
