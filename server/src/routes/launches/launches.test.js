const supertest = require("supertest");
const request = supertest('http://localhost:8000');

describe("Test GET /launces", () => {
    test("it should responsd with 200 success", async () => {
        const response = await request.get('/launches');
        expect(response.statusCode).toBe(200);
    });
});