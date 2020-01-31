const express = require('express');
const app = express();
const morgan = require('morgan');
contactsRoutes = require('./routes/contacts-routes');
usersRoutes = require('./routes/users-routes');
const bodyParser = require('body-parser');
var cors = require("cors");

app.use(cors());
app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/contacts', contactsRoutes);
app.use('/login', usersRoutes)


app.set('port', process.env.PORT || 5000);
app.listen(app.get('port'), function () {
  console.log('App listening on port '+ app.get('port'));
});