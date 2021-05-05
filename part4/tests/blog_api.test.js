const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);
const Blog = require('../models/blog');
const User = require('../models/user');

const blogsInDB = async () => {
	const blogs = await Blog.find({});
	return blogs.map((b) => b.toJSON());
};

const usersInDB = async () => {
	const users = await User.find({});
	return users.map((u) => u.toJSON());
};

const equalTo = (blog) => (b) =>
	b.author === blog.author && b.title === blog.title && b.url === blog.url;

const initialBlogs = [
	{
		title: 'React patterns',
		author: 'Michael Chan',
		url: 'https://reactpatterns.com/',
		likes: 7,
	},
	{
		title: 'Go To Statement Considered Harmful',
		author: 'Edsger W. Dijkstra',
		url:
			'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
		likes: 5,
	},
];
describe('when there are blogs saved', () => {
	beforeEach(async () => {
		await Blog.deleteMany({});

		for (let blog of initialBlogs) {
			let blogObject = new Blog(blog);
			await blogObject.save();
		}
	});

	test('all blogs are returned as json', async () => {
		const res = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/);

		expect(res.body.length).toBe(initialBlogs.length);
	});

	test('blogs have identifier field id', async () => {
		const result = await api.get('/api/blogs');

		const oneBlog = result.body[0];
		expect(oneBlog.id).toBeDefined();
	});

	test('a blog can be deleted', async () => {
		const blogAtStart = await blogsInDB();
		const blockToDelete = blogAtStart[0];

		await api.delete(`/api/blogs/${blockToDelete.id}`).expect(204);

		const blogsAtEnd = await blogsInDB();
		const deleted = blogsAtEnd.find(equalTo(blockToDelete));

		expect(deleted).toBe(undefined);

		expect(blogsAtEnd.length).toBe(initialBlogs.length - 1);
	});

	test('contents of a blog can be changed', async () => {
		const blogAtStart = await blogsInDB();
		const blockToChange = blogAtStart[0];

		const updatedBlog = { ...blockToChange, likes: blockToChange.likes + 1 };

		await api
			.put(`/api/blogs/${blockToChange.id}`)
			.send(updatedBlog)
			.expect(200);

		const blogsAtEnd = await blogsInDB();

		const changed = blogsAtEnd.find(equalTo(blockToChange));

		expect(changed.likes).toBe(blockToChange.likes + 1);
	});

	describe('adding a new blog', () => {
		it('increases the blog count', async () => {
			const newBlog = {
				title: 'Type wars',
				author: 'Robert C. Martin',
				url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
				likes: 2,
			};

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(200)
				.expect('Content-Type', /application\/json/);

			const blogAfter = await blogsInDB();

			expect(blogAfter.length).toBe(initialBlogs.length + 1);
			const created = blogAfter.find(equalTo(newBlog));

			expect(created).toBeDefined();
		});

		it('likes get default value if not set', async () => {
			const newBlog = {
				title: 'First class tests',
				author: 'Robert C. Martin',
				url:
					'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
			};

			await api.post('/api/blogs').send(newBlog);

			const blogsAtEnd = await blogsInDB();
			const created = blogsAtEnd.find(equalTo(newBlog));

			expect(created.likes).toBe(0);
		});

		it('blog is not added without url', async () => {
			const newBlog = {
				title: 'First class tests',
				author: 'Robert C. Martin',
				likes: 3,
			};
			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			const blogsAtEnd = await blogsInDB();

			expect(blogsAtEnd.length).toBe(initialBlogs.length);
		});

		it('blog is not added without title', async () => {
			const newBlog = {
				author: 'Robert C. Martin',
				url:
					'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html',
				likes: 3,
			};

			await api
				.post('/api/blogs')
				.send(newBlog)
				.expect(400)
				.expect('Content-Type', /application\/json/);

			const blogsAtEnd = await blogsInDB();

			expect(blogsAtEnd.length).toBe(initialBlogs.length);
		});
	});
});

describe('when there is initially one user at db', () => {
	beforeEach(async () => {
		await User.deleteMany({});

		const user = new User({ username: 'root', password: 'sekret' });
		await user.save();
	});

	test('creation succeeds with a fresh username', async () => {
		const usersAtStart = await usersInDB();

		const newUser = {
			username: 'mluukkai',
			name: 'Matti Luukkainen',
			password: 'salainen',
		};

		await api
			.post('/api/users')
			.send(newUser)
			.expect(200)
			.expect('Content-Type', /application\/json/);

		const usersAtEnd = await usersInDB();
		expect(usersAtEnd.length).toBe(usersAtStart.length + 1);

		const usernames = usersAtEnd.map((u) => u.username);
		expect(usernames).toContain(newUser.username);
	});

	test('creation fails with proper statuscode and message if username already taken', async () => {
		const usersAtStart = await usersInDB();

		const newUser = {
			username: 'root',
			name: 'Superuser',
			password: 'salainen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain('`username` to be unique');

		const usersAtEnd = await usersInDB();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});

	test('creation fails with too short username', async () => {
		const usersAtStart = await usersInDB();

		const newUser = {
			username: 'he',
			name: 'Arto Hellas',
			password: 'salainen',
		};

		const result = await api
			.post('/api/users')
			.send(newUser)
			.expect(400)
			.expect('Content-Type', /application\/json/);

		expect(result.body.error).toContain(
			'is shorter than the minimum allowed length'
		);

		const usersAtEnd = await usersInDB();
		expect(usersAtEnd.length).toBe(usersAtStart.length);
	});
});
afterAll(() => {
	mongoose.connection.close();
});
