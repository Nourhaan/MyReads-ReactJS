import React, { Component } from 'react'
import Book from './Book'

class Shelf extends Component {

    render() {
        const { books, shelfStatus , shelf} = this.props
        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf}</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.map((book) => (
                            <li key={book.id}>
                                <Book book={book} shelfStatus={shelfStatus} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Shelf