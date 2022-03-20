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

FRONT END WILL MAKE REQUESTS THAT LOOK LIKE THIS:

fetch('our api url', {
  method: 'SOME_METHOD',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer HOLYMOLEYTHISTOKENISHUGE'
  },
  body: JSON.stringify({})
})

We need the Content-Type set so that our bodyParser module will be able to read off anything we need from the user (like form data).

We need the Authorization set so that we can read off that Bearer token.

3-17-22
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzYW5kcmEiLCJpYXQiOjE2NDc1NzA4ODl9.JLFLzvf9xNx5_aUOSP1v6kJVj5sgx_-K7f5WHCvCWKo

curl http://localhost:3000/api -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwidXNlcm5hbWUiOiJzYW5kcmEiLCJpYXQiOjE2NDc1NzA4ODl9.JLFLzvf9xNx5_aUOSP1v6kJVj5sgx_-K7f5WHCvCWKo'

curl http://localhost:3000/api -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc1NzQ4MzZ9.vzkCebSuhCkO_qohQV7_0PmB5G1fmMkPf6c9WW1oncc'

FROM tags.js
 if (tagName) {

    //console.log('', );
    //console.log('SAT tagName:', tagName); //#happy 

    //send out an object to the client { posts: // the posts } 
        } else {
           next({
               name: 'TagError',
               message: 'Does not match any tags'
           })
       }


3-18 / 3-19

encodeUriComponent 

encode the hashtag #happy
'#' with a string
made sure hash is encoded 

unicode

'#'  hex utf-8  
%23   U+0023

TOKEN:
 eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc2MzAxNTR9.aSMfOmtVwrIgp8CicAcZLJBzMmFRxVXFYuV_o5EjmrA

3-19 Saturday 
last part of part 2, PART 3,  (part 2)  WRITING POST/api/posts 

curl http://localhost:3000/api/users/login -H "Content-Type: application/json" -X POST -d '{"username": "albert", "password": "bertie99"}'

{"message":"You're logged in!","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc2MzAxNTR9.aSMfOmtVwrIgp8CicAcZLJBzMmFRxVXFYuV_o5EjmrA"}

CORRECT REQUEST  **this worked
curl http://localhost:3000/api/posts -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc2MzAxNTR9.aSMfOmtVwrIgp8CicAcZLJBzMmFRxVXFYuV_o5EjmrA'

response:
{"message":"You're logged in!","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc3MTAwMjB9.NQDrs2-DCiILJiP9cFfgs7-Lrgt

MISSING TAGS **mostly worked
 curl http://localhost:3000/api/posts -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc2MzAxNTR9.aSMfOmtVwrIgp8CicAcZLJBzMmFRxVXFYuV_o5EjmrA' -H 'Content-Type: application/json' -d '{"title": "I still do not like tags", "content": "CMON! why do people use them?"}'

response: 
{"post":{"id":20,"title":"I still do not like tags","content":"CMON! why do people use them?","active":true,"tags":[{"id":17,"name":""}]}}

MISSING TITLE OR CONTENT 
curl http://localhost:3000/api/posts -X POST -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc2MzAxNTR9.aSMfOmtVwrIgp8CicAcZLJBzMmFRxVXFYuV_o5EjmrA' -H 'Content-Type: application/json' -d '{"title": "I am quite frustrated"}'

response: 
{"name":"error","message":"null value in column \"content\" violates not-null constraint"}

CHECK Writing PATCH/api/posts/:id

curl http://localhost:3000/api/posts/1 -X PATCH -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc2MzAxNTR9.aSMfOmtVwrIgp8CicAcZLJBzMmFRxVXFYuV_o5EjmrA' -H 'Content-Type: application/json' -d '{"title": "updating my old stuff", "tags": "#oldisnewagain"}'

CHECK Writing GET/api/tags/:tagName/posts

curl http://localhost:3000/api/tags/%23happy/posts

CHECK Delete

curl http://localhost:3000/api/posts/1 -X DELETE -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc2MzAxNTR9.aSMfOmtVwrIgp8CicAcZLJBzMmFRxVXFYuV_o5EjmrA'

LAST

curl http://localhost:3000/api/posts

curl http://localhost:3000/api/posts -H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE2NDc2MzAxNTR9.aSMfOmtVwrIgp8CicAcZLJBzMmFRxVXFYuV_o5EjmrA'

curl http://localhost:3000/api/tags/%23happy/posts

WRAPPING UP 

https://shrouded-tor-14882.herokuapp.com/api/posts

curl https://shrouded-tor-14882.herokuapp.com/api/posts

curl https://something-31315.herokuapp.com/api/users/login -H "Content-Type: application/json" -X POST -d '{"username": "albert", "password": "bertie99"}'

 GET /api/posts
curl https://shrouded-tor-14882.herokuapp.com/api/posts

 {"posts":[{"id":2,"title":"How does this work?","content":"Seriously, does this even do anything?","active":true,"tags":[{"id":2,"name":"#youcandoanything"},{"id":9,"name":"#redfish"},{"id":10,"name":"#bluefish"}],"author":{"id":2,"username":"sandra","name":"Just Sandra","location":"Ain't tellin'"}},{"id":3,"title":"Living the Glam Life","content":"Do you even? I swear that half of you are posing.","active":true,"tags":[{"id":1,"name":"#happy"},{"id":2,"name":"#youcandoanything"},{"id":7,"name":"#canmandoeverything"}],"author":{"id":3,"username":"glamgal","name":"Joshua","location":"Upper East Side"}},{"id":1,"title":"New Title","content":"I really do not want to complain","active":false,"tags":[{"id":11,"name":"#oldisnewalways"}],"author":{"id":1,"username":"albert","name":"Newname Sogood","location":"Lesterville, KY"}}]}

 POST /api/users/login
curl https://shrouded-tor-14882.herokuapp.com/api/users/login -H "Content-Type: application/json" -X POST -d '{"username": "albert", "password": "bertie99"}'

 {"message":"you're logged in!","token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhbGJlcnQiLCJpYXQiOjE1ODgwMzU3MDN9.YdIMbfMPHoYoXUGxeo1fQOhEpKB_esw_pEzqSUXdRVg"}

GET /api/tags/:tagName/posts
curl https://shrouded-tor-14882.herokuapp.com/api/tags/%23happy/posts

FROM index.js/db

*why was this on line 2
const { user } = require('pg/lib/defaults');

previous updatePost 

async function updatePost(id, fields = {}) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

FROM seed.js

PART 3,
async function createInitialTags() {
    try {
        console.log("Starting to create initial tags...");

        const [happy, sad, inspo, catman] = await createTags([
            '#happy',
            '#worst-day-ever',
            '#youcandoanything',
            '#catmandoeverything'
        ]);

        const [postOne, postTwo, postThree] = await getAllPosts();

        await addTagsToPost(postOne.id, [happy, inspo]);
        await addTagsToPost(postTwo.id, [sad, inspo]);
        await addTagsToPost(postThree.id, [happy, catman, inspo]);

        console.log("Finished creating tags!");
    } catch (error) {
        console.log("Trouble creating tags!");
        throw error;
    }
}

Sat 3/19

tags.js, last part of, part 2, 'One Method Changes Many Others'
console.log('SAT posts.tags: ', posts.tags);//undefined

tagsRouter.get('/:tagName/posts', async (req, res, next) => { 

try {
    const { tagName } = req.params;
    const posts = await getPostsByTagName(tagName)

    const taggedPosts = posts.filter( post => {
      if ( post.active && post.author.id === req.user.id){
        return true
       }
       return false; 
    })
           
    res.send({ taggedPosts} )

}  catch ({ name, message }) {
  // forward the name and message to the error handler
 }

}