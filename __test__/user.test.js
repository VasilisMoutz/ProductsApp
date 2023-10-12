const mongoose = require("mongoose");
const request = require("supertest");
const app = require('../index');
const helper = require('../helpers/user.helper');

require("dotenv").config()

beforeEach(async() => {
    await mongoose.connect(process.env.MONGO_URI);
});

afterEach(async() => {
    await mongoose.connection.close();
});

describe("Check Users route requests", () => {
    it("Get all users", async() => {
        const res = await request(app)
        .get('/api/users');
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.length).toBeGreaterThan(0);
    }, 10000); 

    it("Get a user", async () => {
        const result = await helper.findLastInsertedUser();
        const res = await request(app)
            .get('/api/users/' + result.username);
        expect(res.statusCode).toBe(200);
        expect(res.body.status).toBeTruthy();
        expect(res.body.data.username).toBe(result.username);
        expect(res.body.data.email).toBe(result.email);
    }, 10000);  

    it("Post create a user", async() => {
        const res = await request(app)
            .post('/api/users')
            .send({
                username: "test5",
                password: "54321",
                name: "name for test 4",
                surname: "surname for test 4",
                email: "test5@aueb.gr"
            });
            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBeTruthy();
    });

    it("Post create user that already exists", async() => {
        const lastUser = await helper.findLastInsertedUser();
        const res = await request(app)
            .post("/api/users")
            .send({
                username: lastUser.username,
                password: "111",
                name: "a Name",
                surname: "a Surname",
                email: "anEmail@aueb.gr"
            });
            expect(res.statusCode).toBe(400);
            expect(res.body.status).toBeFalsy();
    })

    it("Patch update a user", async() => {
        const lastUser = await helper.findLastInsertedUser();
        const res = await request(app)
            .patch('/api/users/' + lastUser.username)
            .send({
                username: lastUser.username,
                name: "updateNamee",
                surname: "update surname",
                email: "updateEmail@aueb.gr",
                address: {
                    area: "xxx",
                    road: "road"
                },
                phone: [
                    {
                        type: "mobile",
                        number: "111"
                    }
                ]
            });

            expect(res.statusCode).toBe(200);
            expect(res.body.status).toBeTruthy();
    })

    it("Delete remove a user", async() => {
        const lastUser = await helper.findLastInsertedUser();
        const res = await request(app)
            .delete('/api/users/' + lastUser.username);
            expect(res.statusCode).toBe(200);
    })
});



