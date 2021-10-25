process.env.NODE_ENV = "test";

const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../app");
const db = require("../../../db/yammieDB");

describe("GET /orders", () => {
  before((done) => {
    db.connect()
      .then(() => done())
      .catch((err) => done(err));
  });

  after((done) => {
    request(app)
      .delete("/orders/")
      .then((res) => {
        db.close().then(() => done());
      })
      .catch((err) => done(err));
  });

  it("OK, getting orders from today (empty array)", (done) => {
    request(app)
      .get("/orders")
      .then((res) => {
        const orders = res.body.orders;

        expect(orders.length).to.equal(0);
        done();
      })
      .catch((err) => done(err));
  });

  it("OK, getting orders from today", (done) => {
    //add new order from today
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
      .then((res) => {})
      .catch((err) => done(err));

    //add  order from 2021-01-01
    request(app)
      .post("/orders")
      .send({
        customer_name: "Martha",
        created_date: "2021-01-01",
        details: [
          {
            dish: "Pasta",
            quantity: 2,
          },
          {
            dish: "Soda",
            quantity: 5,
          },
        ],
      })
      .then((res) => {})
      .catch((err) => done(err));

    request(app)
      .get("/orders")
      .then((res) => {
        const orders = res.body.orders;

        expect(orders.length).to.equal(1);
        done();
      })
      .catch((err) => done(err));
  });

  it("Fail, path not found", (done) => {
    request(app)
      .get("/ord")
      .then((res) => {
        const body = res.body;
        
        expect(body.path).to.equal("/ord not found");
        done();
      })
      .catch((err) => done(err));
  });
});
