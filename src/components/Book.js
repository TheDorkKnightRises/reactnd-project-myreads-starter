import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Book extends Component {
    static propTypes = {
        book: PropTypes.object.isRequired,
        onShelfChanged: PropTypes.func.isRequired
    }

    render() {
        const bookItem = this.props.book
        const thumbnail = 'url("' + bookItem.imageLinks.thumbnail + '")'
        return (
            <li>
                <div className="book">
                    <div className="book-top">
                        <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: thumbnail }}></div>
                        <div className="book-shelf-changer">
                            <select value={ bookItem.shelf } onChange={ (e) => { this.props.onShelfChanged(bookItem, e.target.value) } }>
                                <option value="move" disabled>Move to...</option>
                                <option value="currentlyReading">Currently Reading</option>
                                <option value="wantToRead">Want to Read</option>
                                <option value="read">Read</option>
                                <option value="none">None</option>
                            </select>
                        </div>
                    </div>
                    <div className="book-title">{ bookItem.title }</div>
                    <div className="book-authors">{ bookItem.authors.toString() }</div>
                </div>
            </li>
        )
    }

}

export default Book
