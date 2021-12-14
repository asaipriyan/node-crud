const express = require('express');
const bodyParser = require('body-parser');
const customerRoutes = require('./src/routes/customers.route');
const productRoutes = require('./src/routes/products.route');
const productLikeRoutes= require('./src/routes/product-likes.route');
// create express app
const app = express();
// Setup server port
const port = process.env.PORT || 5000;
// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse requests of content-type - application/json
app.use(bodyParser.json())
// define a root route
app.get('/', (req, res) => {
  res.send("Node API service");
});

//---Routes-----
app.use('/api/v1/customers',customerRoutes);
app.use('/api/v1/products',productRoutes);
app.use('/api/v1/product-likes',productLikeRoutes);

// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});