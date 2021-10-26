process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../app");
const db = require("../../../db/yammieDB");

describe("POST /orders", () => {
  
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    db.close()
      .then(() => done())
      .catch((err) => done(err));
  });

  it("OK, creating a new order works", (done) => {
    request(app)
      .post("/orders")
      .send({
        customer_name: "Bob",
        details: [
          {
            dish: "Stake",
            quantity: 2,
          },
          {
            dish: "Wine",
            quantity: 1,
          },
        ],
      })
      .then((res) => {
        const order = res.body.order;

        expect(order).to.contain.property("_id");
        expect(order).to.contain.property("created_date");
        expect(order).to.contain.property("customer_name");
        expect(order).to.contain.property("details");
        done();
      })
      .catch((err) => done(err));
  });

  //Customer Name
  it("Fail, order requires customer name", (done) => {
    request(app)
      .post("/orders")
      .send({
        details: [
          {
            dish: "Stake",
            quantity: 2,
          },
          {
            dish: "Wine",
            quantity: 1,
          },
        ],
      })
      .then((res) => {
        const body = res.body;

        expect(body.errors.customer_name.name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, order requires customer name (empty customer name)", (done) => {
    request(app)
      .post("/orders")
      .send({
        customer_name: "",
        details: [
          {
            dish: "Stake",
            quantity: 2,
          },
          {
            dish: "Wine",
            quantity: 1,
          },
        ],
      })
      .then((res) => {
        const body = res.body;

        expect(body.errors.customer_name.name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, customer name requires only letters", (done) => {
    request(app)
      .post("/orders")
      .send({
        customer_name: "Bob4",
        details: [
          {
            dish: "Stake",
            quantity: 2,
          },
          {
            dish: "Wine",
            quantity: 1,
          },
        ],
      })
      .then((res) => {
        const body = res.body;

        expect(body.errors.customer_name.name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });

  //Order Details
  it("Fail, order requires details", (done) => {
    request(app)
      .post("/orders")
      .send({ customer_name: "Bob" })
      .then((res) => {
        const body = res.body;

        expect(body.errors.details.name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, order requires details (empty array)", (done) => {
    request(app)
      .post("/orders")
      .send({ customer_name: "Bob", details: [] })
      .then((res) => {
        const body = res.body;

        expect(body.errors.details.name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });

  //Dish Name
  it("Fail, order details requires dish name", (done) => {
    request(app)
      .post("/orders")
      .send({ customer_name: "Bob", details: [{ quantity: 5 }] })
      .then((res) => {
        const body = res.body;

        expect(body.errors["details.0.dish"].name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, order details requires dish name (empty dish name)", (done) => {
    request(app)
      .post("/orders")
      .send({ customer_name: "Bob", details: [{ dish: "", quantity: 5 }] })
      .then((res) => {
        const body = res.body;

        expect(body.errors["details.0.dish"].name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, dish name requires only letters or numbers", (done) => {
    request(app)
      .post("/orders")
      .send({
        customer_name: "Bob",
        details: [{ dish: "%Pasta%", quantity: 5 }],
      })
      .then((res) => {
        const body = res.body;

        expect(body.errors["details.0.dish"].name).to.equal("ValidatorError");
        done();
      })
      .catch((err) => done(err));
  });

  //Dish Quantity
  it("Fail, order details requires dish quantity", (done) => {
    request(app)
      .post("/orders")
      .send({ customer_name: "Bob", details: [{ dish: "Pasta" }] })
      .then((res) => {
        const body = res.body;

        expect(body.errors["details.0.quantity"].name).to.equal(
          "ValidatorError"
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, order details requires dish quantity (empty quantity)", (done) => {
    request(app)
      .post("/orders")
      .send({
        customer_name: "Bob",
        details: [{ dish: "Pasta", quantity: "" }],
      })
      .then((res) => {
        const body = res.body;

        expect(body.errors["details.0.quantity"].name).to.equal(
          "ValidatorError"
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, dish quantity minimum value is 1", (done) => {
    request(app)
      .post("/orders")
      .send({
        customer_name: "Bob",
        details: [{ dish: "Pasta", quantity: -2 }],
      })
      .then((res) => {
        const body = res.body;

        expect(body.errors["details.0.quantity"].name).to.equal(
          "ValidatorError"
        );
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, order details dish quantity requires numbers", (done) => {
    request(app)
      .post("/orders")
      .send({
        customer_name: "Bob",
        details: [{ dish: "Pasta", quantity: "five" }],
      })
      .then((res) => {
        const body = res.body;

        expect(body.errors["details.0.quantity"].name).to.equal("CastError");
        done();
      })
      .catch((err) => done(err));
  });

  //Path
  it("Fail, path not found", (done) => {
    request(app)
      .post("/ord")
      .send({
        customer_name: "Bob",
        details: [{ dish: "Pasta", quantity: "five" }],
      })
      .then((res) => {
        const body = res.body;
        console.log("body", body);

        expect(body.message).to.equal("Path Not Found");
        done();
      })
      .catch((err) => done(err));
  });
});
