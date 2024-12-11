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

module.exports = {
  dummy,
  totalLikes,
};
