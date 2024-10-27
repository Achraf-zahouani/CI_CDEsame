const request = require('supertest');
const { app, server } = require('./app');

beforeAll((done) => {
    // Il server è già avviato in app.js, non serve avviarlo di nuovo
    done();
});

afterAll((done) => {
    server.close(() => {
        console.log("Server chiuso dopo i test");
        done();
    });
});

describe('Test degli endpoint dell\'API libri', () => {
    it('La GET /api/libri dovrebbe restituire tutti i libri', async () => {
        const response = await request(app).get('/api/libri');
        expect(response.statusCode).toBe(200);
        expect(response.body.length).toBeGreaterThan(0); // Verifica che ci siano libri
    });

    it('La POST /api/libri dovrebbe aggiungere un nuovo libro', async () => {
        const nuovoLibro = {
            nome: 'popi',
            descrizione: 'good',
            quantita: 7,
            prezzo: 44.00,
            autore: 'Giovanni'
        };
        const response = await request(app).post('/api/libri').send(nuovoLibro);
        expect(response.statusCode).toBe(201);
        expect(response.body).toMatchObject(nuovoLibro);
    });

    it('La GET /api/libri/:codice dovrebbe restituire un libro specifico', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'Pescra',
        descrizione: 'Bello',
        quantita: 2,
        prezzo: 200.00,
        autore: 'Italia'
        });
        const codice = responsePost.body.codice;

        const response = await request(app).get(`/api/libri/${codice}`);
        expect(response.statusCode).toBe(200);
        expect(response.body).toMatchObject({
            nome: 'Milano',
            descrizione: 'Roma',
            quantita: 4,
            prezzo: 12.99,
            autore: 'Talis'
        });
    });

    it('La DELETE /api/libri/:codice dovrebbe eliminare un libro specifico', async () => {
        const responsePost = await request(app).post('/api/libri').send({
            nome: 'Anas',
        descrizione: 'toop',
        quantita: 3,
        prezzo: 20.88,
        autore: 'myo'
        });
        const codice = responsePost.body.codice;

        const deleteResponse = await request(app).delete(`/api/libri/${codice}`);
        expect(deleteResponse.statusCode).toBe(204);

        const getResponse = await request(app).get(`/api/libri/${codice}`);
        expect(getResponse.statusCode).toBe(404);
    });

    it('La GET /api/libri/:codice/incrementa dovrebbe incrementare la quantità del libro', async () => {
        const responsePost = await request(app).post('/api/libri').send({
         nome: 'Qalm',
        descrizione: 'nice',
        quantita: 2,
        prezzo: 9.99,
        autore: 'kalak'
        });
        const codice = responsePost.body.codice;

        const incrementResponse = await request(app).get(`/api/libri/${codice}/incrementa`);
        expect(incrementResponse.statusCode).toBe(200);
        expect(incrementResponse.body.quantita).toBe(3); // Verifica che la quantità sia aumentata
    });

    it('La GET /api/libri/:codice/decrementa dovrebbe decrementare la quantità del libro', async () => {
        const responsePost = await request(app).post('/api/libri').send({
        nome: 'john',
        descrizione: 'lillw',
        quantita: 8,
        prezzo: 17.50,
        autore: 'halk'
        });
        const codice = responsePost.body.codice;

        const decrementResponse = await request(app).get(`/api/libri/${codice}/decrementa`);
        expect(decrementResponse.statusCode).toBe(200);
        expect(decrementResponse.body.quantita).toBe(1); // Verifica che la quantità sia diminuita
    });
});