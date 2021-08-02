import Express from 'express';
import path from 'path';
import router from './routes/index';
import layouts from 'express-ejs-layouts';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import methodOverride from 'method-override';

const config = require("./config/dev");

mongoose.connect(config.DB_URI,{
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

mongoose.Promise = global.Promise;

const app = Express();
const port = 3000;

app.set('view engine','ejs');
app.set('views',path.resolve(__dirname,'views'))

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(methodOverride('_method', {
  methods: ['POST', 'GET']
}));

app.use(layouts);
app.use(Express.static(__dirname + '/public'));
app.use(router);

app.listen(port, () => {
  console.log('server start')
});