import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import debounce from 'lodash.debounce';
import PropTypes from 'prop-types'

import Book from './Book'
class Search extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.emitChangeDebounced = debounce(this.emitChange, 1000);
    this.props.clearSearchList();
  }

  componentWillUnmount() {
    this.emitChangeDebounced.cancel();
  }

  handleChange(e) {
    this.emitChangeDebounced(e.target.value);
  }

  emitChange(value) {
    this.props.search(value);
  }

  render() {
    let { books, shelfStatus } = this.props
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
              onChange={this.handleChange}
              // onChange={(event) => search(event.target.value)}
              placeholder="Search by title or author" />
          </div>
        </div>

        
        <div className="search-books-results">
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

Search.propTypes={
  books:PropTypes.array.isRequired,
  shelfStatus:PropTypes.func.isRequired,
  search:PropTypes.func.isRequired,
  clearSearchList:PropTypes.func.isRequired
}
export default Search
