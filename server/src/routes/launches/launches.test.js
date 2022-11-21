const supertest = require("supertest");
const request = supertest('http://localhost:8000');
const { mongoConnect, mongoDisconnect} = require('../../services/mongo');

describe('Launches API', () => {
    beforeAll(async () => {
        await mongoConnect();
    });
    
    describe("Test GET /launces", () => {
        test("it should responsd with 200 success", async () => {
            const response = await request.get('/v1/launches');
            expect(response.statusCode).toBe(200);
        });
    });

    afterAll(async () => {
        await mongoDisconnect();
    });
})