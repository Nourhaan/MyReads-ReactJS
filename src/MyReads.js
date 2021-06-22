import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import CurrentlyReading from './CurrentlyReading'
import Read from './Read'
import WantToRead from './WantToRead'


class MyReads extends Component {
  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <CurrentlyReading books={this.props.books} shelfStatus={this.props.shelfStatus} />
        <div className="list-books-content">
          <div>
            <Read books={this.props.books} shelfStatus={this.props.shelfStatus} />
            <WantToRead books={this.props.books} shelfStatus={this.props.shelfStatus} />
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
