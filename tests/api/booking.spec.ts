import { test, expect } from '@playwright/test';

const API_BASE = 'https://restful-booker.herokuapp.com';

const bookingPayload = {
  firstname: 'Ana',
  lastname: 'García',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-08-01',
    checkout: '2026-08-05',
  },
  additionalneeds: 'Desayuno',
};

let authToken: string;
let bookingId: number;

test.describe('API Restful Booker — Reservas', () => {
  test.describe.configure({ mode: 'serial' });

  test.beforeAll(async ({ request }) => {
    const authResponse = await request.post(`${API_BASE}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });

    expect(authResponse.status()).toBe(200);
    const authBody = await authResponse.json();
    expect(authBody).toHaveProperty('token');
    expect(typeof authBody.token).toBe('string');
    expect(authBody.token.length).toBeGreaterThan(0);

    authToken = authBody.token;

    const createResponse = await request.post(`${API_BASE}/booking`, {
      data: bookingPayload,
    });

    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    bookingId = createBody.bookingid;
  });

  test('POST /auth devuelve 200 y un token válido', async ({ request }) => {
    const response = await request.post(`${API_BASE}/auth`, {
      data: { username: 'admin', password: 'password123' },
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('token');
    expect(typeof body.token).toBe('string');
    expect(body.token.length).toBeGreaterThan(0);
  });

  test('POST /booking devuelve 200 y los datos correctos en el cuerpo', async ({ request }) => {
    const response = await request.post(`${API_BASE}/booking`, {
      data: bookingPayload,
    });

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toHaveProperty('bookingid');
    expect(body.booking).toMatchObject({
      firstname: bookingPayload.firstname,
      lastname: bookingPayload.lastname,
      totalprice: bookingPayload.totalprice,
      bookingdates: bookingPayload.bookingdates,
    });
  });

  test('PUT /booking/:id sin token devuelve 403 (acceso denegado)', async ({ request }) => {
    const response = await request.put(`${API_BASE}/booking/${bookingId}`, {
      data: { ...bookingPayload, firstname: 'SinPermiso' },
    });

    expect(response.status()).toBe(403);
  });

  test('GET /booking/:id con id inexistente devuelve 404', async ({ request }) => {
    const response = await request.get(`${API_BASE}/booking/999999999`);

    expect(response.status()).toBe(404);
  });

  test('GET /booking/:id con id válido devuelve 200 y los datos de la reserva', async ({ request }) => {
    const response = await request.get(`${API_BASE}/booking/${bookingId}`);

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      firstname: bookingPayload.firstname,
      lastname: bookingPayload.lastname,
      totalprice: bookingPayload.totalprice,
      bookingdates: bookingPayload.bookingdates,
    });
  });

  test('DELETE /booking/:id con token devuelve 201 y elimina la reserva', async ({ request }) => {
    const deleteResponse = await request.delete(`${API_BASE}/booking/${bookingId}`, {
      headers: { Cookie: `token=${authToken}` },
    });

    expect(deleteResponse.status()).toBe(201);

    const getResponse = await request.get(`${API_BASE}/booking/${bookingId}`);
    expect(getResponse.status()).toBe(404);
  });
});
