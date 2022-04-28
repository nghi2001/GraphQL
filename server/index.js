const express = require('express');
const app = express();
const PORT = 3500;
const mongoose = require('mongoose');
const userData = require('./MOCK_DATA.json');
const {graphqlHTTP} = require('express-graphql');
const cors = require('cors');

mongoose.connect("mongodb+srv://nghi:nguyenduynghi@cluster0.q3bs9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority")
mongoose.connection.once('open', () => {
    console.log('Connect to database');
})
const schema = require('./Schemas/schema');
// const schema = require('./Schemas/index');
app.use(cors())
app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => console.log('server running'))