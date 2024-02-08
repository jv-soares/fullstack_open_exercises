const Blog = require('../models/blog');

const initialBlogs = [
    {
        title: 'Viage na Viagem',
        author: 'joao soares',
        url: 'https://www.viajenaviagem.com/',
    },
    {
        title: 'Mit Vergnügen Köln',
        author: 'joao soares',
        url: 'https://koeln.mitvergnuegen.com/',
    },
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map((e) => e.toJSON());
};

module.exports = { initialBlogs, blogsInDb };
