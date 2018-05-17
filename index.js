const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const bodyParser = require('body-parser');
const indexRouter = require('./api/routers/indexRouter');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
indexRouter(app);
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');

app.listen(port, () => console.log("server running on port " + port));