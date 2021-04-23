const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');

// const blogsInDB = async () => {
//     const blogs = await Blog.find({})
//     return blogs.map(b=> b.toJSON())
// }

const initialBlogs = [
	{
		_id: '5a422a851b54a676234d17f7',
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
		__v: 0,
	},
	{
		_id: '5a422aa71b54a676234d17f8',
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
		__v: 0,
	},
];

beforeEach(async () => {
	await Blog.deleteMany({});
	let blogObject = new Blog(initialBlogs[0]);
	await blogObject.save();

	blogObject = new Blog(initialBlogs[1]);
	await blogObject.save();
});

test('blogs are returned as json', async () => {
	const res = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/);

	expect(res.body).toHaveLength(2);
});

test('all blogs are returned', async () => {
	const response = await api.get('/api/blogs');

	expect(response.body).toHaveLength(initialBlogs.length);
});

test('a specific blog is within the returned blogs', async () => {
	const response = await api.get('/api/blogs');
	const titles = response.body.map((r) => r.title);

	expect(titles).toContain('React patterns');
});

// test('unique identifier property of blog is id', async () => {
// 	const blogSchema = mongoose.set('toJSON', {
// 		transform: (document, returnedObject) => {
// 			returnedObject.id = returnedObject._id.toString();
// 			delete returnedObject._id;
// 			delete returnedObject._v;
// 		},
// 	});
// 	await api.get(`/api/blogs/${id}`).expect(blogSchema).toBeDefined();
// });

test('a valid blog can be added', async () => {
	const blogBefore = await Blog.find({});
	const newBlog = {
		_id: '5a422bc61b54a676234d17fc',
		title: 'Type wars',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
		likes: 2,
		__v: 0,
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const blogAfter = await Blog.find({});

	expect(blogAfter.length).toBe(blogBefore.length + 1);
	const titles = blogAfter.map((r) => r.title);

	expect(titles).toContain('Type wars');
});

test('if like is missing default to value 0', async () => {
	const newBlog = {
		// _id: '5a422b891b54a676234d17fa',
		title: 'First class tests',
		author: 'Robert C. Martin',
		url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',

		// __v: 0,
	};

	await api
		.post('/api/blogs')
		.send(newBlog)
		.expect(200)
		.expect('Content-Type', /application\/json/);

	const blog = await Blog.findById({ author: 'Robert C. Martin' });
	// console.log('blogsAfter: ', blog);
	expect(blog.likes).toBeDefined(0);
});

test('if title and url is missing request data is 400', async () => {
	const newBlog = {
		author: 'Robert C. Martin',
		likes: 2,
	};

	await api.post('/api/blogs').send(newBlog).expect(400);
});

// });
afterAll(() => {
	mongoose.connection.close();
});
