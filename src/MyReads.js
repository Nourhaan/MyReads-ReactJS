import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Shelf from './Shelf'


class MyReads extends Component {
  
  render() {
    const currentlyReadingBooks = this.props.books.filter(b => b.shelf === "currentlyReading");
    const readBooks = this.props.books.filter(b => b.shelf === "read");
    const wantToReadBooks = this.props.books.filter(b => b.shelf === "wantToRead");
    const shelfs = [
      { id: 1, name: "Currently Reading", books: currentlyReadingBooks },
      { id: 2, name: "Read", books: readBooks },
      { id: 3, name: "Want To Read", books: wantToReadBooks },
    ];
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {/* <Shelf books={currentlyReadingBooks} shelf="Currently Reading" shelfStatus={this.props.shelfStatus} /> */}
        <div className="list-books-content">
          <div>

            <ul className="no-bullets">
              {shelfs.map((shelf) => (
                <li key={shelf.id}>
                  <Shelf books={shelf.books} shelf={shelf.name} shelfStatus={this.props.shelfStatus} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="open-search">
          {/* <button onClick={() => this.setState({ showSearchPage: true })}>Add a book</button> */}
          <Link className="Link-search" to='/search' >Add a Book</Link>
        </div>
      </div>
    )
  }
}

export default MyReads
