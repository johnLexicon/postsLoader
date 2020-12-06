const fetch = require('node-fetch');
const fs = require('fs');

const writeToFile = (content) => {
    fs.writeFile('posts.json', content, function(err) {
        if(err){
            console.log(err);
            return;
        }
        console.log("Done!!!");
    })
}

const retrievePosts = async() => {
    try{
        const result = await fetch('https://jsonplaceholder.typicode.com/posts/');
        const text = await result.text();
        return text;
    } catch(err) {
        console.log(err);
    }
};

const configurePosts = (posts) => {
    return posts.map(p => {return { title: p.title, preview: p.body, body: p.body.repeat(100)}});
}

const start = async () => {
    const posts = await retrievePosts();
    const configuredPosts = configurePosts(JSON.parse(posts));
    writeToFile(JSON.stringify(configuredPosts));
}

start();
