# Utilizza un'immagine base di Node.js
FROM node:14

# Imposta la directory di lavoro
WORKDIR /usr/src/app

# Copia i file di package e package-lock
COPY package*.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto del codice
COPY . .

# Espone la porta
EXPOSE 3000

# Comando per avviare l'app
CMD ["node", "app.js"]