// const mongoose = require('mongoose');

// if (process.argv.length < 3) {
// 	console.log(
// 		'Please provide the password as an argument: node mongo.js <password>'
// 	);
// 	process.exit(1);
// }

// const password = process.argv[2];
// const url = `mongodb+srv://endsars101:${password}@blog.2kxh9.mongodb.net/person?retryWrites=true&w=majority&ssl=true`;

// mongoose
// 	.connect(url, {
// 		useNewUrlParser: true,
// 		useCreateIndex: true,
// 		useUnifiedTopology: true,
// 		useFindAndModify: false,
// 	})
// 	.then((result) => console.log('connected to db'))
// 	.catch((err) => console.log(err));

// const personSchema = new mongoose.Schema({
// 	name: String,
// 	number: String,
// });

// const Person = mongoose.model('person', personSchema);

// Person.find({}).then((persons) => {
// 	persons.forEach((person) => {
// 		console.log(persons);
// 	});
// });

// // const person = new Person({
// // 	name: 'Arto Vihavainen',
// // 	number: '045-1232456',
// // });

// // person
// // 	.save()
// // 	.then((result) => {
// // 		console.log(`added ${person.name} ${person.number} to phonebook`);
// // 		mongoose.connection.close;
// // 	})
// // 	.catch((err) => console.log(err));
