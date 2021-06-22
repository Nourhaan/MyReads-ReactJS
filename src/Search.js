import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Book from './Book'
class Search extends Component {

  render() {
    const { books,shelfStatus, search,search_click } = this.props
    return (
      <div className="search-books">
        <div className="search-books-bar">
          {/* <button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button> */}
          <Link className="close-search" to='/'>Back</Link>
          <div className="search-books-input-wrapper">
            {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md
                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
            <input type="text"
              onChange={(event) => search(event.target.value)}
              placeholder="Search by title or author" />
          </div>
        </div>
        {search_click ?
        (
        <div className="search-books-results">
          <ol className="books-grid">
            {books.map((book) => (
              <li key={book.id}>
                <Book book={book} shelfStatus={shelfStatus} />
              </li>
            ))}
          </ol>
        </div>
        ):
        (<div></div>)
        }
      </div>
    )
  }
}

export default Search
