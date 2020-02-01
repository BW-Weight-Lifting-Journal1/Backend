const request = require("supertest");
const db = require("../database/dbConfig");
const server = require("./server.js");

beforeEach(async () => {
  await db("exercises").truncate();
  await db("workouts").truncate();
  await db("users").truncate();
  
  await db("users").insert({ username: "sam", password: "supersecret" });
  await db("workouts").insert({	"workout_note": "yee yee", "workout_date": "01/30/2020", "user_id": 1})
  await db("exercises").insert({"exercise_name": "yee yee", "exercise_reps": "5", "exercise_weight": "yee yee", "muscles_targeted": "yeeyeetaeus maximus", "workout_id": 1, "user_id": 1})
});

describe("users model", () => {
  describe("insert()", () => {
    it("should insert the provided users into the db", async () => {
      await db("users").insert({ username: "frodo", password: "supersecret" });
      await db("users").insert({ username: "gandalf", password: "supersecret" });

      const users = await db("users");

      expect(users).toHaveLength(3);
    });

    describe("list()", () => {
      it("should get all users", async () => {
        const users = await db("users");

        expect(users).toHaveLength(1);
      });
    });
  });
});

describe("server.js", () => {
  describe("index route", () => {
    it("should return an OK status code from the index route", async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get("/");

      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object from the index route", async () => {
      const expectedBody = { api: "running" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });

    it("should return a JSON object from the index route", async () => {
      const response = await request(server).get("/");

      expect(response.type).toEqual("application/json");
    });
  });
});

describe("auth-router.js", () => {
  describe("auth route", () => {
    it("should return an Created status code from the auth/register route", async () => {
      const expectedStatusCode = 201;

      const response = await request(server).post("/api/auth/register").send({username: "frodo", password: "supersecret" });

      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object from the auth/register route", async () => {

      const response = await request(server).post("/api/auth/register").send({username: "bilbo", password: "supersecret" });

      expect(response.type).toEqual("application/json")
    });

    it("should return an OK status code from the auth/login route", async () => {
      const expectedStatusCode = 200;
      
      const res = await request(server).post("/api/auth/register").send({username: "frodo", password: "supersecret" });
      const response = await request(server).post("/api/auth/login").send({username: "frodo", password: "supersecret" });
      console.log(response);
      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object from the auth/login route", async () => {

      const response = await request(server).post("/api/auth/login").send({username: "sam", password: "supersecret" });

      expect(response.type).toEqual("application/json")
    });
  });
});

describe("workouts-router.js", () => {
  describe("workouts route", () => {
    it("should return an OK status code from the workouts route", async () => {
      const expectedStatusCode = 200;

      const res = await request(server).post("/api/auth/register").send({username: "frodo", password: "supersecret" });
      const response1 = await (request(server).post("/api/auth/login")).send({username: "frodo", password: "supersecret" });
      const token = response1.body.token
      const response = await (request(server).get("/api/workouts")).set({ Authorization: token });

      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object from the workouts route", async () => {

      const res = await request(server).post("/api/auth/register").send({username: "frodo", password: "supersecret" });
      const response1 = await (request(server).post("/api/auth/login")).send({username: "frodo", password: "supersecret" });
      const token = response1.body.token
      const response = await (request(server).get("/api/workouts")).set({ Authorization: token });

      expect(response.type).toEqual("application/json")
    });

    it("should delete workout", async () => {
        const res = await request(server).post("/api/auth/register").send({username: "frodo", password: "supersecret" });
        const response1 = await (request(server).post("/api/auth/login")).send({username: "frodo", password: "supersecret" });
        const token = response1.body.token
        const response = await (request(server).delete("/api/workouts/1")).set({ Authorization: token });
        const workouts = await db("workouts");
  
        expect(workouts).toHaveLength(0)
      });
  });
});

describe("exercises-router.js", () => {
    describe("exercises route", () => {
      it("should return an OK status code from the exercises route", async () => {
        const expectedStatusCode = 200;
  
        const res = await request(server).post("/api/auth/register").send({username: "frodo", password: "supersecret" });
        const response1 = await (request(server).post("/api/auth/login")).send({username: "frodo", password: "supersecret" });
        const token = response1.body.token
        const response = await (request(server).get("/api/workouts/1")).set({ Authorization: token });
  
        expect(response.status).toEqual(expectedStatusCode);
      });
  
      it("should return a JSON object from the exercises route", async () => {
  
        const res = await request(server).post("/api/auth/register").send({username: "frodo", password: "supersecret" });
        const response1 = await (request(server).post("/api/auth/login")).send({username: "frodo", password: "supersecret" });
        const token = response1.body.token
        const response = await (request(server).get("/api/workouts/exercises")).set({ Authorization: token });

        expect(response.type).toEqual("application/json")
      });
    });
  });
  
