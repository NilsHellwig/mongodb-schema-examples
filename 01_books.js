/**
 * 📝 Aufgabe 1: Bücher-Datenbank
 *
 * Ziel: Erstellt ein einfaches Mongoose-Schema für Bücher.
 *
 * Schritte:
 * 1. Verbindet euch mit MongoDB über Mongoose.
 * 2. Erstellt ein Schema "Book" mit folgenden Feldern:
 *    - title: String, Pflichtfeld
 *    - author: String
 *    - publishedYear: Number
 *    - genres: Array von Strings
 *    - isAvailable: Boolean, Standardwert true
 * 3. Erstellt mindestens 2 Bücher.
 * 4. Gebt alle gespeicherten Bücher in der Konsole aus.
 */

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/uebung1")
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => console.error("❌ Fehler:", err));

/*
 * async markiert eine Funktion als asynchron, die ein Promise zurückgibt.
 * Mit await wird innerhalb einer solchen Funktion gewartet, bis ein Promise erfüllt ist, bevor der Code weiterläuft.
 * So kannst du asynchrone Abläufe einfach und synchron-artig schreiben.
 * .then()/catch(): Ketten-basierter Stil
 * → gut für einfache Fälle, kann bei mehreren Schritten unübersichtlich werden.
 * async/await: Modern, liest sich wie synchroner Code
 * → übersichtlicher bei vielen asynchronen Schritten.
 */
async function run() {
  // await Book.deleteMany({}); // Datenbank aufräumen ohne Filterobjekt: z.B. Book.deleteMany({ author: "Hermann Hesse" }); würde nur Bücher von Hermann Hesse löschen.


  // const books = await Book.find();
  // console.log("📚 Bücher:", books);
  mongoose.connection.close();
}

run();
