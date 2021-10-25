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

// details: {
//   type: Array,
//   items: {
//     type: Object,
//     properties: {
//       dish: {
//         type: String,
//         required: "Dish is required",
//         errors: "{VALUE} is not a valid Dish",
//         validate: {
//           validator: (value) => {
//             return /^[a-zA-Z0-9\,\s]*$/.test(value);
//           },
//         },
//       },
//       quantity: {
//         type: Number,
//         required: "Dish quantity is required",
//         errors: "Dish quantity is not a number",
//         validate: {
//           validator: (value) => {
//             return /^[0-9]*$/.test(value);
//           },
//         },
//       },
//     },
//     required: true,
//     errors: "Order details is required",
//   },
// },

// details: {
//   type: [
//     {
//       dish: {
//         type: String,
//         required: "Dish is required",
//         errors: "{VALUE} is not a valid Dish",
//         validate: {
//           validator: (value) => {
//             return /^[a-zA-Z0-9\,\s]*$/.test(value);
//           },
//         },
//       },
//       quantity: {
//         type: Number,
//         required: "Dish quantity is required",
//         errors: "Dish quantity is not a number",
//         validate: {
//           validator: (value) => {
//             return /^[0-9]*$/.test(value);
//           },
//         },
//       },
//     },
//   ],
//   required: "Order is required",
//   errors: "Order details is required",
// },

// details: {
//   type: Array,
//   min: 1,
//   contains: {
//     type: Object,
//     properties: {
//       dish: {
//         type: String,
//         required: "Dish is required",
//         errors: "{VALUE} is not a valid Dish",
//         validate: {
//           validator: (value) => {
//             return /^[a-zA-Z0-9\,\s]*$/.test(value);
//           },
//         },
//       },
//       quantity: {
//         type: Number,
//         required: "Dish quantity is required",
//         errors: "Dish quantity is not a number",
//         validate: {
//           validator: (value) => {
//             return /^[0-9]*$/.test(value);
//           },
//         },
//       },
//     },
//     required: true,
//   },
//   items: {
//     type: Object,
//     properties: {
//       dish: {
//         type: String,
//       },
//       quantity: {
//         type: Number,
//       },
//     },
//   },
//   required: true,
//   errors: "Order details is required",
// },

//   location: {
//     city: {
//       type: String,
//       required: "City is required",
//       message: "City is not valid",
//       validate: {
//         validator: (value) => {
//           return /^[a-zA-Z\s]*$/.test(value);
//         },
//       },
//     },
//     address: {
//       type: String,
//       required: "Address is required",
//       message: "Address is not valid",
//       validate: {
//         validator: (value) => {
//           return /^[a-zA-Z0-9\,\s]*$/.test(value);
//         },
//       },
//     },
//   },

//   status: {
//     type: {
//       type: String,
//       enum: ["pending", "ondelivering", "delivered"],
//     },
//     default: "pending",
//   },
