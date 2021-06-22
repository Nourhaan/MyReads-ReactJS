import React, { Component } from 'react'
import Book from './Book'

class Read extends Component {
    render() {
        const { books, shelfStatus } = this.props

        return (
            <div className="bookshelf">
                <h2 className="bookshelf-title">Read</h2>
                <div className="bookshelf-books">
                    <ol className="books-grid">
                        {books.filter(b => b.shelf === "read").map((book) => (
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
export default Read

