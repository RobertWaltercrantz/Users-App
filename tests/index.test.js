// app.test.js
const request = require('supertest');
const {app, server} = require('../index');

let newUserId;

describe('Test the root path', () => {
  test('It should respond with {\"data\":\"Hello IKEA\"}', async () => {
    const response = await request(app).get('/');
    expect(response.text).toBe('{\"data\":\"Hello IKEA\"}');
    expect(response.statusCode).toBe(200);
  });
});

describe('Test the users endpoints', () => {
  test('It should reply with all the users in a JSON payload (200)', async () => {
    const response = await request(app).get('/api/users');
    //expect(response.body).toEqual({ name: 'John Doe', email: 'john.doe@example.com' });
    expect(response.statusCode).toBe(200);
  });

  test('Query for user ID 3 - Should reply "Cate Blanchett" (200)', async () => {
    const response = await request(app).get('/api/users/3');
    expect(response.body.name).toEqual('Cate Blanchett');
    expect(response.statusCode).toBe(200);
  });
 
  test('It should create a new user (200)', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({ name: 'Lyndsy Fonseca', isAdmin: false, car: 'Dodge Charger' });
    expect(response.body.name).toEqual('Lyndsy Fonseca');
    expect(response.statusCode).toBe(200);
    newUserId = response.body.id;
    console.log("newUserId " + newUserId);
  });

  test(`Query for Lyndsy Fonseca's user Id created user (200)`, async () => {
    const response = await request(app).get(`/api/users/${newUserId}`);
    expect(response.body.name).toEqual('Lyndsy Fonseca');
    expect(response.statusCode).toBe(200);
  });

  test("It should delete the previously created user", async () => {
    const response = await request(app).delete(`/api/users/${newUserId}`);
    expect(response.body.data).toEqual(`The user with id of ${newUserId} is removed.`);
    expect(response.statusCode).toBe(200);
  });

});

afterAll(done => {
  // Closing the connection allows Jest to exit successfully.
  server.close()
  done()
})
