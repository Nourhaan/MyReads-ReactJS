import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import MyReads from './MyReads'
import Search from './Search'

import './App.css'

class BooksApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      search_click:false
    };
    // From:Stackoverflow to solve this is undefined issue in each method
    this.changeShelf = this.changeShelf.bind(this) 
    this.search = this.search.bind(this)

  }

  getAllBooks() {
    BooksAPI.getAll()
      .then((books) => {
        this.setState(() => ({
          books: books
        }));
        // console.log("componentDidMount",this.state.books);
      })
  }

  componentDidMount() {
    this.getAllBooks()
  }

  search(query) {
    //check query value if it is empty, set state of search books to empty array 
    query?
    BooksAPI.search(query)
      .then((books) => {
        this.setState(() => ({
          books: books,
          search_click:true
        }));
      }):
      this.setState(() => ({
        books: []
      }));
  }

  changeShelf(book, shelf) {
    //this is undefined, so I can't use set state here ! why ?
    //solution: this.changeShelf = this.changeShelf.bind(this) in constructor 
    BooksAPI.update(book, shelf).then(res => {
      //Recall API to Update UI as latest changes 
      this.getAllBooks();
    });

  }

  render() {
    // Note 
    //this.getAllBooks(); // infinite loop - this one is used to update categories immediety but it is not the best practice -
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search search_click={this.state.search_click} books={this.state.books} search={this.search} shelfStatus={this.changeShelf} />
        )} />

        <Route path='/' exact render={({ history }) => (
          <MyReads books={this.state.books} shelfStatus={this.changeShelf} />
        )} />
      </div>
    )
  }

}

export default BooksApp
