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
      search_books: [],
    };
    // From:Stackoverflow to solve this is undefined issue in each method
    this.changeShelf = this.changeShelf.bind(this)
    this.search = this.search.bind(this)
    this.clearSearchList = this.clearSearchList.bind(this)
  }

  async getAllBooks() {
    const books = await BooksAPI.getAll();
    this.setState({ books: books, search_books: [] });

  }
  componentDidMount() {
    this.getAllBooks()
  }

  async search(query) {
    //check query value if it is empty, set state of search books to empty array 
    if (query) {

      let search_books = await BooksAPI.search(query);
      console.log("search_books", search_books.length)
      if (search_books.length) {
        const read_books_Id = this.state.books.map((book) => {
          return book.id
        });
        if (read_books_Id.length > 0) {
          search_books = await search_books.map((book) => {
            if (!book.imageLinks) {
              book['imageLinks'] = {}
            }
            if (read_books_Id.find((id) => id === book.id)) {
              book['shelf'] = this.state.books.filter(b => b.id === book.id)[0].shelf;
              return book;
            }
            else {
              book['shelf'] = 'none';
              return book;
            }
          }
          )
        }
        console.log("search books\n", search_books)
        console.log("\n\nMain books\n", this.state.books)


        this.setState(() => ({
          search_books: search_books,
          books: [],
        }));
      }
      else {
        this.setState(() => ({
          search_books: []
        }));
      }
    }
    else {

      // :
      this.setState(() => ({
        search_books: []
      }));
    }
    console.log("\n\nMain books after clearing\n", this.state.books)
  }


  changeShelf(book, shelf) {
    //this is undefined, so I can't use set state here ! why ?
    //solution: this.changeShelf = this.changeShelf.bind(this) in constructor 
    BooksAPI.update(book, shelf).then(res => {
      //Recall API to Update UI as latest changes 
      this.getAllBooks();
    });

  }
  clearSearchList() {
    this.setState({ search_books: [] })
  }

  render() {
    // Note 
    //this.getAllBooks(); 
    // infinite loop - this one is used to update categories immediety but it is not the best practice 
    return (
      <div className="app">
        <Route path='/search' render={() => (
          <Search clearSearchList={this.clearSearchList} books={this.state.search_books}
            search={this.search} shelfStatus={this.changeShelf} />
        )} />

        <Route path='/' exact render={({ history }) => (
          <MyReads books={this.state.books} shelfStatus={this.changeShelf} />
        )} />
      </div>
    )
  }

}

export default BooksApp
