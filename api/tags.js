/*TAGS ROUTER*/
const express = require('express');
const tagsRouter = express.Router();
const { getAllTags, getPostsByTagName, getAllPosts } = require('../db');
//why is getAllPosts destructured?

tagsRouter.use((req, res, next) => {
    console.log("tags.js, A request is being made to /tags");
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
            if (post.active && post.author.id === req.user.id) {
               return true
               }
               return false; 
        })
        console.log('tags.js, taggedPosts: ', taggedPosts)
        res.send({ taggedPosts });

    } catch ({ name, message }) {
        // forward the name and message to the error handler
        next({name:'tag error', message:'that tag is incorrect'});
        //why is this showing, this shows in terminal after curl command
    }
});

module.exports = tagsRouter;


 