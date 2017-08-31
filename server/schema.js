import { INTEGER, STRING, DECIMAL } from 'sequelize';

const PRIMARY_KEY = { type: INTEGER, primaryKey: true, autoIncrement: true };

export default {
  customers: {
    id: PRIMARY_KEY,
    name: { type: STRING },
    address: { type: STRING },
    phone: { type: STRING },
  },
  products: {
    id: PRIMARY_KEY,
    name: { type: STRING },
    price: { type: DECIMAL },
  },
  invoices: {
    id: PRIMARY_KEY,
    customer_id: { type: INTEGER },
    discount: { type: DECIMAL },
    total: { type: DECIMAL },
  },
  invoice_items: {
    id: PRIMARY_KEY,
    invoice_id: { type: INTEGER },
    product_id: { type: INTEGER },
    quantity: { type: DECIMAL },
  }
};
