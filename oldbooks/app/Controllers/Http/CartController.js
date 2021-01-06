'use strict'
const Book = use('App/Models/Product')
const CART_KEY = 'cart'
class CartController {
  add({ params, session, redirect }) {
    let book = Book.find(params.book_id);
    let cart = session.get(CART_KEY, {});
    if (cart.hasOwnProperty(book.id)) {
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
    session.put(CART_KET, cart);
    return redirect.route('show_all_books')
  }

  show({view, session}) {
    let cart = session.get(CART_KEY, {});
    return view.render('cart/show', {
      cart : cart.values()
    })
  }
}

module.exports = CartController
