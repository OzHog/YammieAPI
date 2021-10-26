const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
  customer_name: {
    type: String,
    required: [true, "Customer name is requierd"],
    message: "Customer name is requierd",
    validate: {
      validator: (value) => {
        return /^[a-zA-Z\s]*$/.test(value);
      },
      message: "Customer name contain only letters"
    },
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
  details: {
    type: [
      {
        dish: {
          type: String,
          required: [true, "Dish name is requierd"],
          validate: {
            validator: (value) => {
              return /^[a-zA-Z0-9\s]*$/.test(value);
            },
            message: "Dish name contain only letters or numbers"
          },
        },
        quantity: {
          type: Number,
          min: 1,
          required: [true, "dish quantity is requierd"],
        },
      },
    ],
    required: [true, "Order details is requierd"],
    validate: {
      validator: (value) => {
        return value.length > 0;
      },
      message: "Order details is requierd"
    },
  },
});

module.exports = mongoose.model("Orders", OrderSchema);