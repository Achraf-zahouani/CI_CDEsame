const express = require('express');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let libri = [
    {
        codice: uuidv4(),
        nome: 'tito',
        descrizione: 'bello',
        quantita: 10,
        prezzo: 15.00,
        autore: 'Achraf'
    },
    {
        codice: uuidv4(),
        nome: 'popi',
        descrizione: 'good',
        quantita: 7,
        prezzo: 44.00,
        autore: 'Giovanni'
    },
    {
        codice: uuidv4(),
        nome: 'lolo',
        descrizione: 'totto',
        quantita: 9,
        prezzo: 300.00,
        autore: 'Marocco'
    },
    {
        codice: uuidv4(),
        nome: 'Pescra',
        descrizione: 'Bello',
        quantita: 2,
        prezzo: 200.00,
        autore: 'Italia'
    },
    
    {
        codice: uuidv4(),
        nome: 'IO',
        descrizione: 'Bello',
        quantita: 3,
        prezzo: 8.99,
        autore: 'popoo'
    },
    {
        codice: uuidv4(),
        nome: 'Milano',
        descrizione: 'Roma',
        quantita: 4,
        prezzo: 12.99,
        autore: 'Talis'
    },
    {
        codice: uuidv4(),
        nome: 'Anas',
        descrizione: 'toop',
        quantita: 3,
        prezzo: 20.88,
        autore: 'myo'
    },
    {
        codice: uuidv4(),
        nome: 'Qalm',
        descrizione: 'nice',
        quantita: 2,
        prezzo: 9.99,
        autore: 'kalak'
    },
    {
        codice: uuidv4(),
        nome: 'john',
        descrizione: 'lillw',
        quantita: 8,
        prezzo: 17.50,
        autore: 'halk'
    },
]

app.get('/api/libri', (req, res) => res.json(libri));

app.get('/api/libri/:codice', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    libro ? res.json(libro) : res.status(404).json({ error : "Libro non trovato" });
});

app.post('/api/libri', (req, res) => {
    const { nome, descrizione, quantita, prezzo, autore } = req.body;
    const nuovoLibro = { codice : uuidv4(), nome, descrizione, quantita, prezzo, autore };
    libri.push(nuovoLibro);
    res.status(201).json(nuovoLibro);
});

app.delete('/api/libri/:codice', (req, res) => {
    const index = libri.findIndex(l => l.codice === req.params.codice);
    if (index !== -1) {
      libri.splice(index, 1);
      res.status(204).end();
    } else {
      res.status(404).json({ error : "Libro non trovato" });
    }
});

app.get('/api/libri/:codice/incrementa', (req, res) => {
    const libro = libri.find(l => l.codice === req.params.codice);
    if (libro) {
      libro.quantita += 1;
      res.json(libro);
    } else {
      res.status(404).json({ error : "Libro non trovato" });
    }
});

app.get('/api/libri/:codice/decrementa', (req, res) => {
   const libro = libri.find(l => l.codice === req.params.codice);
   if (libro) {
      libro.quantita = Math.max(libro.quantita - 1, 0);
      res.json(libro);
   } else {
      res.status(404).json({ error : "Libro non trovato" });
   }
});

const server = app.listen(PORT, () => console.log(`Server avviato sulla porta ${PORT}`));

module.exports = { app, server };