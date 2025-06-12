# 🧪 MongoDB & Mongoose – Übungsaufgaben

Willkommen zu den Mongoose-Übungen!  
Hier lernst du den Umgang mit **Schemas**, **Modellen** und **Referenzen** in **MongoDB** über **Mongoose** – ideal für Einsteiger in die Backend-Entwicklung mit Node.js.

---

## 📦 Voraussetzungen

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/) installiert

1. Führe `npm install` aus.
2. MongoDB via Docker starten:

```bash
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -e MONGO_INITDB_DATABASE=myDatabase \
  mongo
```

3. Skript ausführen

```bash
node 01_books.js
```