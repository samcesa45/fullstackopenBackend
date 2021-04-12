const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log(
    'Please provide the password as an argument: node mongo.js <password>'
  )
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://endsars101:${password}@blog.2kxh9.mongodb.net/note?retryWrites=true&w=majority&ssl=true`

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => console.log('connected to db'))
  .catch((err) => console.log(err))

const noteSchema = new mongoose.Schema({
  content: String,
  data: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// const note = new Note({
// 	content: 'HTML is Easy',
// 	date: new Date(),
// 	important: true,
// });

Note.find({}).then((result) => {
  result.forEach((note) => {
    console.log(note)
  })
  mongoose.connection.close()
})

// note
// 	.save()
// 	.then((result) => {
// 		console.log('note saved');
// 		mongoose.connection.close();
// 	})
// 	.catch((err) => console.log(err));
