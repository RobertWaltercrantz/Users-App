test('It should not find any users (404)', async () => {
    const response = await request(app).get('/api/users');
    expect(response.statusCode).toBe(404);
  });

  test('It should update a user (200)', async () => {
    const response = await request(app)
      .put('/api/users/123')
      .send({ name: 'Jane Doe', email: 'jane.doe@example.com' });
    expect(response.body).toEqual({ id: '123', name: 'Jane Doe', email: 'jane.doe@example.com' });
    expect(response.statusCode).toBe(200);
  });

  test('It should delete a user (200)', async () => {
    const response = await request(app).delete('/api/users/123');
    expect(response.body).toEqual({ id: '123' });
    expect(response.statusCode).toBe(200);
  });