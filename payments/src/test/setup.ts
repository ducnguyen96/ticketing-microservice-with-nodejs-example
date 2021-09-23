import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

declare global {
  function signin(id: string): string;
}

let mongo: MongoMemoryServer;

jest.mock("../nats-wrapper");

process.env.STRIPE_KEY =
  "sk_test_51JcWqQHiy6yu1YQbhBFz9jceoAkGu5kTy1oGGvD76KeuVm8FWwb8D3wFOkdCo3StM45pc58LCfHVbUnVIe5PN9aa00L5zpuPko";

beforeAll(async () => {
  process.env.JWT_KEY = "sfvgedged";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongoose.connection.close();
  await mongo.stop();
});

// setup.ts
global.signin = (id: string) => {
  // Build a JWT payload, { id, email }
  const payload = {
    id,
    email: "test@test.com",
  };

  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);

  // Build session Object { jwt: MY_JWT }
  const session = { jwt: token };

  // Turn that session into JSON
  const sessionJSON = JSON.stringify(session);

  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString("base64");

  // return a string thats the cookie with the encoded data
  return `express:sess=${base64}`;
};
