/*auth middleware,
error function if there is no user
*/

const requireUser = ((req, res, next) => {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
        });
    }
    next();
});

module.exports = {
    requireUser
}

/*
do we need this function in users router file?
*/