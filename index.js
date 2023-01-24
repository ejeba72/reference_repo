const express = require('express');
const cookieParser = require('cookie-parser');
const { config } = require('dotenv');
const { mongoDB } = require('./database/connection');
const { router: healthRoute } = require('./routes/healthRoute');
const { router: devRoute } = require('./routes/devRoute');
const { router: blogRoute } = require('./routes/blogRoute');
const { router: postRoute } = require('./routes/postRoute');
const { router: userRoute } = require('./routes/userRoute');

const app = express();
const PORT = process.env.PORT;
const apiV1 = '/api/v1';

// DOTENV CONFIG AND MONGODB CONNECTION
config();
mongoDB();

// MIDDLEWARE
app.use(express.json());
app.use(cookieParser());
app.use('/', healthRoute);
app.use('/api', devRoute);
app.use(`${apiV1}/blogs`, blogRoute);
app.use(`${apiV1}/posts`, postRoute);
app.use(`${apiV1}/users`, userRoute);

app.listen(PORT, () => {
  console.log(`Server is attentively listening for requests at port ${PORT}`);
});
