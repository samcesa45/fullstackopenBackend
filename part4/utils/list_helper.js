const dummy = (blogs) => {
	return 1;
};

const totalLikes = (blogs) => {
	return blogs.reduce((sum, item) => {
		return sum + item.likes;
	}, 0);
};

const favouriteBlog = (blogs) => {
	var max_likes = 0;
	var favorite_blog;

	for (var i = 0; i < blogs.length; i++) {
		if (blogs[i].likes > max_likes) {
			max_likes = blogs[i].likes;
			favorite_blog = blogs[i];
		}
	}
	return favorite_blog;
};

const mostBlogs = (blogs) => {
	const result = blogs.reduce((a, b) => {
		let known = a.find((found) => {
			return found.author === b.author;
		});
		if (!known) {
			return a.concat({ author: b.author, blogs: 1 });
		}
		known.blogs++;
		return a;
	}, []);
	return result.reduce((a, b) => (a.blogs > b.blogs ? a : b));
};

const mostLikes = (blogs) => {
	const result = blogs.reduce((a, b) => {
		let known = a.find((found) => {
			return found.author === b.author;
		});
		if (!known) {
			return a.concat({ author: b.author, likes: b.likes });
		}
		known.likes += b.likes;
		return a;
	}, []);

	return result.reduce((a, b) => (a.likes > b.likes ? a : b));
};
module.exports = {
	dummy,
	totalLikes,
	favouriteBlog,
	mostBlogs,
	mostLikes,
};
