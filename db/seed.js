/*seed.js, tables, users, posts*/
const {
    client,
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    createPost,
    updatePost,
    getAllPosts,
    getPostsByUser, //Where do we call this?

    //PART 3
    createTags,    //this is in createInitialTags
    createPostTag, //this is used in addTagsToPost
    addTagsToPost,
    getPostById,
    getPostsByTagName

} = require('./index');

async function dropTables() {
    try {

        console.log("Starting to drop tables...")

        await client.query(`  
       DROP TABLE IF EXISTS post_tags;
       DROP TABLE IF EXISTS tags;
       DROP TABLE IF EXISTS posts;
       DROP TABLE IF EXISTS users;
    `);

        console.log("Finished dropping tables!");
    } catch (error) {
        console.error("Error dropping tables!")
        throw error;
    }
}

/* TABLE PART 3, tags and post_tags  */
async function createTables() {
    try {
        console.log("Starting to build tables...");

        await client.query(`
     CREATE TABLE users (
       id SERIAL PRIMARY KEY, 
       username varchar(255) UNIQUE NOT NULL,
       password varchar(255) NOT NULL,
       name varchar(255) NOT NULL,
       location varchar(255) NOT NULL,
       active BOOLEAN DEFAULT true
    );

    CREATE TABLE posts (
      id SERIAL PRIMARY KEY, 
      "authorId" INTEGER REFERENCES users(id) NOT NULL,
      title varchar(255) NOT NULL,
      content TEXT NOT NULL,
      active BOOLEAN DEFAULT true
       );

    CREATE TABLE tags (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) UNIQUE NOT NULL
    );

    CREATE TABLE post_tags (
      "postId" INTEGER REFERENCES posts(id) ,
      "tagId" INTEGER REFERENCES tags(id),
       UNIQUE ("postId","tagId")
    );
    
  `)

        console.log("Finished building tables!")
    } catch (error) {
        console.error("Error building tables!")
        throw error;
    }
}

async function createInitialUsers() {
    try {
        console.log("Starting to create users...");

        await createUser({ username: 'albert', password: 'bertie99', name: 'Al Bert', location: 'Sidney, Australia', active: true });
        await createUser({ username: 'sandra', password: '2sandy4me', name: 'Just Sandra', location: "Ain't tellin'", active: true });
        await createUser({ username: 'glamgal', password: 'soglam', name: 'Joshua', location: 'Upper East Side', active: true });

        console.log("Finished creating users!");
    } catch (error) {
        console.error("Error creating users!");
        throw error;
    }
}

async function createInitialPosts() {
    try {
        const [albert, sandra, glamgal] = await getAllUsers();

        console.log("Starting to create posts...");
        await createPost({
            authorId: albert.id,
            title: "First Post",
            content: "This is my first post. I hope I love writing blogs as much as I love writing them.",
            tags: ["#happy", "#youcandoanything"]
        });

        await createPost({
            authorId: sandra.id,
            title: "Sandra's post",
            content: "This is a test post.",
            tags: ['#happy', '#worst-day-ever']
        });

        await createPost({
            authorId: glamgal.id,
            title: "A glam post",
            content: "This is a glam post.",
            tags: ["#happy", "#youcandoanything", "#canmandoeverything"]
        });

        console.log("Finished creating posts!");
    } catch (error) {
        console.log("Trouble creating posts!")
        throw error;
    }
}

async function rebuildDB() {
    try {
        client.connect();

        await dropTables();
        await createTables();
        await createInitialUsers();
        await createInitialPosts();

    } catch (error) {
        console.log("Trouble rebuilding DB")
        throw error;
    }
}

async function testDB() {
    try {
        console.log("Starting to test database...");

        console.log("Calling getAllUsers");
        const users = await getAllUsers();
        console.log("SEED, users:", users);

        console.log("SEED, Calling updateUser on users[0]", users[0]);
        const updateUserResult = await updateUser(users[0].id, {
            name: "Newname Sogood",
            location: "Lesterville, KY"
        });
        console.log("SEED updateUserResult:", updateUserResult);

        console.log("Calling getAllPosts");
        const posts = await getAllPosts();
        console.log("SEED, posts: ", posts);

        console.log("SEED Calling updatePost on posts[0]: ", posts[0]);
        const updatePostResult = await updatePost(posts[0].id, {
            title: "New Title",
            content: "Updated Content"
        });
        console.log("SEED, updatePostResult:", updatePostResult);

        console.log("Calling getUserById with 1");
        const albert = await getUserById(1);
        console.log("SEED, albert:", albert);

        console.log("SEED, Calling all posts by user with userId 2: ");
        const user2posts = await getPostsByUser(2);
        console.log('SEED, getPostsByUser(2)', user2posts);

        console.log("SEED, Calling updatePost on posts[1], only updating tags");
        const updatePostTagsResult = await updatePost(posts[1].id, {
            tags: ["#youcandoanything", "#redfish", "#bluefish"]
        });
        console.log("SEED, updatePostTagsResult:", updatePostTagsResult);

        console.log("SEED, Calling getPostsByTagName with #happy");
        const postsWithHappy = await getPostsByTagName("#happy");
        console.log("SEED, getPostsByTagName with #happy:", postsWithHappy);

        console.log("SEED, Finished building database tests!")

    } catch (error) {
        console.error("SEED, Error testing database!");
        throw error;
    }
}

rebuildDB()
    .then(testDB)
    .catch(console.error)
    .finally(() => client.end());
