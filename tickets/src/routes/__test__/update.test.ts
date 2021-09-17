import { Mongoose } from "mongoose";
import request from "supertest";
import { app } from "../../app";
import { natsWrapper } from "../../nats-wrapper";

it("returns a 404 if the provided id does not exist", async () => {
  const mongoose = new Mongoose();
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "Bohemium", price: 20 })
    .expect(404);
});

it("returns a 401 if the user is not authenticated", async () => {
  const mongoose = new Mongoose();
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "Bohemium", price: 20 })
    .expect(401);
});

it("returns a 401 if the user does not own the ticket", async () => {
  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "Bohemium", price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .send({ title: "Bohemium", price: 203 })
    .expect(401);
});

it("returns a 400 if the user provides an invalid title or price", async () => {
  const cookie = global.signin();

  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Bohemium", price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "", price: 203 })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "Bohemium", price: -203 })
    .expect(400);
});

it("updates the ticket provided valid inputs", async () => {
  const cookie = global.signin();

  const res = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Bohemium", price: 20 });

  await request(app)
    .put(`/api/tickets/${res.body.id}`)
    .set("Cookie", cookie)
    .send({ title: "Bohemium updated", price: 203 })
    .expect(200);

  const updatedTicket = await request(app)
    .get(`/api/tickets/${res.body.id}`)
    .send();

  expect(updatedTicket.body.title).toEqual("Bohemium updated");
  expect(updatedTicket.body.price).toEqual(203);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
