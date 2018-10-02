'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager'} */
const Route = use('Route')
const Ws = use('Ws')

Route.on('/').render('welcome')

Route.on('/cliente').render('cliente');

Route.on('/restaurant').render('restaurant');

Route.get('/number/', ({ request }) => {
  /** get number from the url query string */
  const guessedNumber = Number(request.input('number'))

  /** if number is not specified, let the user know about it */
  if (!guessedNumber) {
    return 'Please specify a number by passing ?number=<num> to the url'
  }

  /** generate a random number */
  const randomNumber = Math.floor(Math.random() * 20) + 1

  /** let the user know about the match */
  return randomNumber === guessedNumber
  ? 'Matched'
  : `Match failed. The actual number is ${randomNumber}`
})

Route.post('/', ({ request, response }) => {
	const body = request.post();
	console.log(body);
	return 	response.json(body);
});

Route.post('/hacer_pedido', ({ request, response }) => {
	const body = request.post();
    const restaurant = Ws.getChannel('restaurant:*');
    let topic = restaurant.topic('restaurant:ordenes');
    topic.broadcast('message',body);
})

