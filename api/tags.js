/*TAGS ROUTER*/
const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName, getAllPosts } = require('../db');

tagsRouter.use((req, res, next) => {
    console.log("A request is being made to /tags");

    next();
});

tagsRouter.get('/', async (req, res) => {
    const tags = await getAllTags();

    res.send({
        tags
    });
});

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
    // read the tagname from the params
    try {
        const { tagName } = req.params;
        // use our method to get posts by tag name from the db
        const posts = await getPostsByTagName(tagName);
        const taggedPosts = posts.filter(post => {
            if (post.active && post.author.id === req.user.id){
                return true
               }
               return false; 
        })
        console.log('taggedPosts: ', taggedPosts)
        res.send({ taggedPosts });

    } catch ({ name, message }) {
        // forward the name and message to the error handler
        next({name:'tag error', message:'that tag is incorrect'});
        //why is this showing 
    }
});

module.exports = tagsRouter;

/*Sat 3/19

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
*/

 