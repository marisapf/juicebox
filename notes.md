3-15-22

**create an express server

const express = require('express')
const morgan = require('morgan');
const bodyParser = require('body-parser') **third party library
const router = ('./api')

const (PORT = 3333} = process.env  // (some port number)

const { client } = require ('./db')

client.connect()

const server = express();
server.use(morgan('dev'));   //or app.use, app or server is used

server.use(bodyParser.json)

**use middleware to connect the two routers express server and api router
server.use('/my-api', router)
**import in index.js, import puppy router into api router

let visits = 0
 **SEND A ROUTE
server.get('/', (res,req,next) => {
    res.send(`hello, welcome to juicebox. Site has been visitedd ${++visits} times.`)
})

server.listen (PORT, () => {

 console.log(`listening on ${PORT}`)

})

index.js in api
const express = require('express')
const router = express.Router();

const puppiesRouter = require('./puppies')
tie them together
router.use('/', puppiesRouter)

make sure to export
module.export = router;


***is .env in git.ignore? 
//index.js   is where main router exists

go into puppies, create subrouter, this was in puppies.js not index.js

const express = require('express')
const router = express.Router()  (method in express)


**this is an async func, await for promise to resolve
router.get('/', async (req, res, next) => {

    try {
    const puppies = await getAllPuppies()

    res.send('You are visiting puppies page')
    } catch(error){
      
      throw (not found)  //needs to be caught
    }
})

put a comment above route so you know where it goes

//GET /api/puppies/:id --> getAllPuppies

router.get('/:id', async (req,res,next) => {
    try {
        const id = req,params.id;
        const puppy = await getPuppyById(id)
        res.send(puppy)
    }
     catch(error){
      console.error(error)
      res.send('puppy id not found')
      throw error  //needs to be caught
    }

})


module.exports = router 

connect express server with database 

**review the error part, end of video 
subrouters, main routers, main router be used my express app