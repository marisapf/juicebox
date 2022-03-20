/*POSTS ROUTER*/
const express = require('express');

const postsRouter = express.Router();
const { getAllPosts, createPost, updatePost, getPostById } = require('../db');
const { requireUser } = require('./utils')

postsRouter.post('/', requireUser, async (req, res, next) => {
    const { title, content, tags = "" } = req.body;

    const tagArr = tags.trim().split(/\s+/)
    const postData = { authorId: req.user.id, title, content, tags };

    if (tagArr.length) {
        postData.tags = tagArr;
    }

    try {

        const post = await createPost(postData);
        if (post) {
            res.send({ post })
        } else {
            next({
                name: "MissingPostError",
                message: "Invalid post action."
            });
        }

    } catch ({ name, message }) {
        next({ name, message });
    }

});

/*PATCH*/
postsRouter.patch('/:postId', requireUser, async (req, res, next) => {
    const { postId } = req.params;
    const { title, content, tags } = req.body;

    console.log('SAT postId: ', postId);

    const updateFields = {};

    if (tags && tags.length > 0) {
        updateFields.tags = tags.trim().split(/\s+/);
    }

    if (title) {
        updateFields.title = title;
    }

    if (content) {
        updateFields.content = content;
    }

    try {
        const originalPost = await getPostById(postId);

        console.log('originalPost.author: ', originalPost.authorId);
        console.log('SAT req.user: ', req.user);

        if (originalPost.authorId === req.user.id) {
            const updatedPost = await updatePost(postId, updateFields);

            console.log('originalPost.author.id: ', originalPost.author.id);
            console.log('SAT post:', post);

            res.send({ post: updatedPost })
        } else {
            next({
                name: 'UnauthorizedUserError',
                message: 'You cannot update a post that is not yours'
            })
        }
    } catch ({ name, message }) {
        next({ name, message });
    }
});

postsRouter.use((req, res, next) => {
    console.log("A request is being made to /posts");

    next();
});

/*Change in part 3*/
postsRouter.get('/', async (req, res) => {
    try {
        const allPosts = await getAllPosts();

        const posts = allPosts.filter(post => {
            if (post.active) { return true }

            if (req.user && post.author.id === req.user.id) { return true }

            return false;
        })

        res.send({
            posts
        });
    } catch ({ name, message }) {
        next({ name, message });
    }
});

/*DELETE part 5 of part 3, part 2*/
postsRouter.delete('/:postId', requireUser, async (req, res, next) => {
    try {
        const post = await getPostById(req.params.postId);
        console.log('From Delete. post:', post);

        if (post && post.author.id === req.user.id) {
            const updatedPost = await updatePost(post.id, { active: false });

            console.log("from POSTS, post.author.id:", post.author.id);
            console.log('from POSTS, req.user.id:', req.user.id);

            res.send({ post: updatedPost });
        } else {
            next(post ? {
                name: "UnauthorizedUserError",
                message: "You cannot delete a post which is not yours"
            } : {
                name: "PostNotFoundError",
                message: "That post does not exist"
            });
        }
    } catch ({ name, message }) {
        next({ name, message })
    }
});

module.exports = postsRouter;

/*
console.log('from postsRouter, req.user.id: ', req.user.id);
console.log('post.authorId: ', post.authorId);
console.log("from postsRouter, req.body", req.body);
console.log("from postsRouter, req.user: ", req.user);

console.log('post.authorId', post.authorId);

console.log('tagArr: ', tagArr);
console.log('postData: ', postData);

after else statement in delete, line 122
//if there was a post, throw UnauthorizedUserError, otherwise throw PostNotFoundError

where did this come from? 
const { user } = require('pg/lib/defaults');

res.send({ message: 'under construction' });
*/