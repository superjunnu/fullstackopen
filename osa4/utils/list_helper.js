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

// console.log(favoriteBlog(blogs));

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};