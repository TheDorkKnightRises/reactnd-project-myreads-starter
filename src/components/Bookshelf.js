import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Book from './Book'

class Bookshelf extends Component {
    static propTypes = {
        shelftype: PropTypes.string.isRequired,
        books: PropTypes.array.isRequired,
        onShelfChanged: PropTypes.func.isRequired
    }

    render() {
        const { shelftype, books, onShelfChanged } = this.props
        let title
        switch (shelftype) {
            case "currentlyReading":
                title = "Currently Reading"
                break;
            case "wantToRead":
                title = "Want to Read"
                break;
            default:
                title = "Read"
                break;
        }
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{ title }</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {
                            books.map( (bookItem) => {
                                return (
                                    <Book key={ bookItem.id } book={ bookItem } onShelfChanged= { onShelfChanged }/>
                                )
                            })
                        }
                    </ol>
              </div>
            </div>
        )
    }
}

export default Bookshelf
