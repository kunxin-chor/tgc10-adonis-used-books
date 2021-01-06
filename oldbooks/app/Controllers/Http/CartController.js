'use strict'
const Book = use('App/Models/Book')
const CART_KEY = 'cart'
class CartController {
  async add({ params, session, response }) {
    let book = (await Book.find(params.book_id)).toJSON();
    let cart = session.get(CART_KEY, {});
    if (!cart.hasOwnProperty(book.id)) {
      // add the book to the cart, using the book's id as the key (for easier lookup later)
      cart[book.id] = {
        ...book, // copy everything from book over, but only the properties (not methods)
        qty: 1
      }

      session.flash({ notification: `${book.title} has been added to the shopping cart` });
    } else {
      // increase the quantity by 1
      cart[book.id].qty += 1;
      session.flash({ notification: `Added one more of ${book.title} to the cart` });
    }
    session.put(CART_KEY, cart);
    return response.route('show_all_books')
  }

  show({view, session}) {
    let cart = session.get(CART_KEY, {});
    return view.render('cart/show', {
      cart : Object.values(cart)
    })
  }

  clear({session, response}) {
    session.clear(CART_KEY)
    return response.route('show_all_books')
  }
}

module.exports = CartController
