const express = require('express');
const apiRouter = express.Router();

/*Part 2*/
const jwt = require('jsonwebtoken');
const { getUserById } = require('../db');
const { JWT_SECRET } = process.env;

apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        console.log('prefix', prefix);
        const token = auth.slice(prefix.length)
        // const [_, token] = auth.split(' ')
        console.log("token in api index.js:", token);
        console.log("JWT_SECRET:",JWT_SECRET);
        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }
        } catch ({ name, message }) {
            next({ name, message })
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});

apiRouter.use((req, res, next) => {
    if(req.user) {
     console.log("User is set:", req.user);
    }
    next();
});

/*Part 1*/
const usersRouter = require('./users');
apiRouter.use('/users', usersRouter);

const postsRouter = require('./posts');
apiRouter.use('/posts', postsRouter);

const tagsRouter = require('./tags');
apiRouter.use('/tags', tagsRouter);

/*Part 2, simple error handler */

apiRouter.use((error, req, res, next) => {
 res.send({
  name: error.name,
  message: error.message
 });
});

module.exports = apiRouter;