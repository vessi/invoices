import express from 'express';
import http from 'http';
import path from 'path';
import { json, urlencoded } from 'body-parser';
import 'babel-polyfill';
import configuration from '../package.json';
import db from './db';

const env = process.env.NODE_ENV || 'development';
const config = configuration.config[env];

const dbConnection = new db(path.join(__dirname, `../${config.databaseFile || 'invoices.sqlite'}`));

const publicPath = path.join(__dirname, config.publicPath || 'public');

const app = express();
export default app;

app.set('port', config.port || 8000);
app.use(json());
app.use(urlencoded());
app.use(express.static(publicPath));

const routes = {
  '/api/customers': {
    async get (request, response) {
      const customers = await dbConnection.models.Customer.findAll();
      response.json(customers);
    },
    async post (request, response) {
      const { name, address, phone } = { ...request.body };
      let customer = dbConnection.models.Customer.build({ name, address, phone });
      customer = await customer.save();
      response.json(customer);
    }
  },
  '/api/customers/:customer_id': {
    async get (request, response) {
      const { customer_id } = { ...request.params };
      const customer = await dbConnection.models.Customer.findById(customer_id);
      response.json(customer);
    },
    async put (request, response) {
      const { customer_id } = { ...request.params };
      const { name, address, phone } = { ...request.body };
      let customer = await dbConnection.models.Customer.findById(customer_id);
      customer = await customer.update({ name, address, phone });
      response.json(customer);
    },
    async delete (request, response) {
      const { customer_id } = { ...request.params };
      let customer = await dbConnection.models.Customer.findById(customer_id);
      customer = await customer.destroy();
      response.json(customer);
    }
  },
  '/api/products': {
    async get (request, response) {
      const products = await dbConnection.models.Product.findAll();
      response.json(products);
    },
    async post (request, response) {
      const { name, price } = { ...request.body };
      let product = dbConnection.models.Product.build({ name, price });
      product = await product.save();
      response.json(product);
    }
  },
  '/api/products/:product_id': {
    async get (request, response) {
      const { product_id } = { ...request.params };
      const product = await dbConnection.models.Product.findById(product_id);
      response.json(product);
    },
    async put (request, response) {
      const { product_id } = { ...request.params };
      const { name, price } = { ...request.body };
      let product = await dbConnection.models.Product.findById(product_id);
      product = await product.update({ name, price });
      response.json(product);
    },
    async delete (request, response) {
      const { product_id } = { ...request.params };
      let product = await dbConnection.models.Product.findById(product_id);
      product = await product.destroy();
      response.json(product);
    },
  },
  '/api/invoices': {
    async get (request, response) {
      const invoices = await dbConnection.models.Invoice.findAll();
      response.json(invoices);
    },
    async post (request, response) {
      const { customer_id, discount, total } = { ...request.body };
      let invoice = await dbConnection.models.Invoice.build({ customer_id, discount, total });
      invoice = await invoice.save();
      response.json(invoice);
    },
  },
  '/api/invoices/:invoice_id': {
    async get (request, response) {
      const { invoice_id } = { ...request.params };
      const invoice = await dbConnection.models.Invoice.findById(invoice_id);
      response.json(invoice);
    },
    async put (request, response) {
      const { invoice_id } = { ...request.params };
      const { customer_id, discount, total } = { ...request.body };
      let invoice = await dbConnection.models.Invoice.findById(invoice_id);
      invoice = await invoice.update({ customer_id, discount, total });
      response.json(invoice);
    },
    async delete (request, response) {
      const { invoice_id } = { ...request.params };
      let invoice = await dbConnection.models.Invoice.findById(invoice_id);
      invoice = await invoice.destroy();
      response.json(invoice);
    },
  },
  '/api/invoices/:invoice_id/items': {
    async get (request, response) {
      const { invoice_id } = { ...request.params };
      const invoice_items = await dbConnection.models.InvoiceItem.findAll({ where: { invoice_id } });
      response.json(invoice_items);
    },
    async post (request, response) {
      const { invoice_id } = { ...request.params };
      const { product_id, quantity } = { ...request.body };
      let invoiceItem = await dbConnection.models.InvoiceItem.build({ invoice_id, product_id, quantity });
      invoiceItem = await invoiceItem.save();
      response.json(invoiceItem);
    },
  },
  '/api/invoices/:invoice_id/items/:item_id': {
    async get (request, response) {
      const { item_id } = { ...request.params };
      const invoiceItem = await dbConnection.models.InvoiceItem.findById(item_id);
      response.json(invoiceItem);
    },
    async put (request, response) {
      const { item_id } = { ...request.params };
      const { product_id, quantity } = { ...request.body };
      let invoiceItem = await dbConnection.models.InvoiceItem.findById(item_id);
      invoiceItem = await invoiceItem.update({ product_id, quantity });
      response.json(invoiceItem);
    },
    async delete (request, response) {
      const { item_id } = { ...request.params };
      let invoiceItem = await dbConnection.models.InvoiceItem.findById(item_id);
      invoiceItem = await invoiceItem.destroy();
      response.json(invoiceItem);
    },
  },
  '*': {
    async get (request, response) {
      response.sendFile(`${publicPath}/index.html`);
    },
  },
};

for (var route in routes) {
  if (routes.hasOwnProperty(route)) {
    const methods = routes[route];
    const routeObject = app.route(route);
    for (var method in methods) {
      if (methods.hasOwnProperty(method)) {
        routeObject[method](methods[method]);
      }
    }
  }
}

http.createServer(app).listen(app.get('port'), () => {
  console.log(`Express server listening on port ${app.get('port')}`); // eslint-disable-line no-console
});
