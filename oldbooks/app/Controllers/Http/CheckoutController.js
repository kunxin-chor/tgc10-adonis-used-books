'use strict'

const Config = use('Config')
const Stripe = use('stripe')(Config.get('stripe.secret_key'))

const CART_KEY = "cart"

class CheckoutController {

  async checkout({ response, session, view }) {
    let lineItems = [];
    let cart = Object.values(session.get(CART_KEY, {}));
    for (let cartItem of cart) {
      lineItems.push({
        name: cartItem.title,
        images: [cartItem.image_url],
        amount: cartItem.price,
        quantity: cartItem.qty,
        currency:'SGD'
      })
    }
    let metaData = JSON.stringify(lineItems);

    const payment = {
      payment_method_types: ['card'],
      line_items: lineItems,
      success_url: Config.get('stripe.success_url') + '?sessionId={CHECKOUT_SESSION_ID}',
      cancel_url: Config.get('stripe.error_url'),
      metadata: {
        'orders': metaData
      }
    }

    let stripeSession = await Stripe.checkout.sessions.create(payment)
    return view.render('checkout/checkout',{
        'sessionId' : stripeSession.id,
        'publishableKey': Config.get('stripe.publishable_key')
    })
  }

  processPayment({request, response}) {
    let payload = request.raw();
    // console.log(payload)
    let endpointSecret = Config.get('stripe.endpoint_secret')
    console.log("--endpoint secret---")
    console.log(endpointSecret)
    let sigHeader = request.header("stripe-signature")
    console.log(sigHeader);
    let event = null;
    try {
      event = Stripe.webhooks.constructEvent(payload, sigHeader, endpointSecret);

    } catch (e) {
      console.log(e)
      response.send({
        'error':e.message
      })
    }
    console.log(event)
    if (event.type=='checkout.session.completed') {
      let stripeSession = event.data.object;
      console.log("meta-data:")
      console.log(stripeSession);
      console.log(stripeSession.metadata)
    }
    response.json({received: true});
  }
}

module.exports = CheckoutController
