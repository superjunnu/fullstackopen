const lodash = require("lodash");

const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item;
  };

  const blogLikes = blogs.map((blogs) => blogs.likes);

  return blogLikes.reduce(reducer, 0);
};

// const blogs = [
//   { title: "Blog 1", author: "Author 1", likes: 5 },
//   { title: "Blog 2", author: "Author 2", likes: 15 },
//   { title: "Blog 3", author: "Author 3", likes: 10 },
//   { title: "Blog 4", author: "Author 3", likes: 8 },
//   { title: "Blog 5", author: "Author 1", likes: 8 },
//   { title: "Blog 6", author: "Author 1", likes: 8 },
// ];

const favoriteBlog = (blogs) => {
  const blogsLikes = blogs.map((blogs) => blogs.likes);
  const getIndexOfMostBlogLikes = blogsLikes.indexOf(Math.max(...blogsLikes));
  const hasMostBlogLikes = blogs[getIndexOfMostBlogLikes];

  return {
    title: hasMostBlogLikes.title,
    author: hasMostBlogLikes.author,
    likes: hasMostBlogLikes.likes,
  };
};

const mostBlogs = (blogs) => {
  const author = (blog) => blog.author;

  const countAuthorBlogs = lodash.countBy(blogs, author);

  const findAuthorWithMostBlogs = (countAuthorBlogs) => {
    return Object.keys(countAuthorBlogs).reduce((a, b) =>
      countAuthorBlogs[a] > countAuthorBlogs[b] ? a : b
    );
  };

  const authorWitMostBlogs = findAuthorWithMostBlogs(countAuthorBlogs);

  return {
    author: authorWitMostBlogs,
    blogs: countAuthorBlogs[authorWitMostBlogs],
  };
};

const mostLikes = (blogs) => {
  const groupedBlogs = lodash.groupBy(blogs, "author");

  const countedAuthors = lodash.map(groupedBlogs, (arr) => {
    return {
      author: arr[0].author,
      likes: lodash.sumBy(arr, "likes"),
    };
  });
  const maxLikesAuthor = lodash.maxBy(countedAuthors, (a) => a.likes);
  const authorName = lodash.head(lodash.values(maxLikesAuthor));

  return {
    author: authorName,
    likes: maxLikesAuthor.likes,
  };
};

// console.log(mostLikes(blogs));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
