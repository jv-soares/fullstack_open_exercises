const _ = require('lodash');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    let likes = 0;
    for (const blog of blogs) {
        likes += blog.likes;
    }
    return likes;
};

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return;
    let favorite = blogs[0];
    for (const blog of blogs) {
        if (blog.likes > favorite.likes) {
            favorite = blog;
        }
    }
    return {
        title: favorite.title,
        author: favorite.author,
        likes: favorite.likes,
    };
};

const mostBlogs = (blogs) => {
    const grouped = _(blogs)
        .countBy('author')
        .map((blogs, author) => ({
            author: author,
            blogs: blogs,
        }))
        .value();
    return _.maxBy(grouped, 'blogs');
};

const mostLikes = (blogs) => {
    const grouped = _(blogs)
        .groupBy('author')
        .map((blogs, author) => ({
            author: author,
            likes: _.sumBy(blogs, 'likes'),
        }))
        .value();
    return _.maxBy(grouped, 'likes');
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
};
