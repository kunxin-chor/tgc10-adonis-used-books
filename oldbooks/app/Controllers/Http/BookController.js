'use strict'


const Book = use('App/Models/Book')
const Publisher = use ('App/Models/Publisher')

class BookController {
  async index({view}) {
    // select all the rows from the books table
    let allBooks = await Book.all();
    return view.render('books/index', {
      "books": allBooks.toJSON() // must convert to JSON
    })
  }

  async show({view, params}) {
    // extract out the book_id parameter from the URL
    let bookId = params.book_id;
    // select * from books where id = bookId
    let book = await Book.find(bookId);
    let publisher = await book.publisher().fetch();
    return view.render("books/show", {
      "book": book.toJSON(),
      "publisher": publisher.toJSON()
    })
  }

  async create({view}) {
    // retrieve all the publishers
    let allPublishers = await Publisher.all()
    return view.render('books/create',{
      'publishers': allPublishers.toJSON()
    })
  }

  async processCreate({request, response}) {
    let body = request.post();
    console.log(body);
    let book = new Book();
    book.title = body.title;
    book.condition = body.condition;
    book.price = body.price;
    book.publisher_id = body.publisher
    await book.save();
    return response.route('BookController.index')
  }
}

module.exports = BookController
