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

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: String,
  publishedYear: Number,
  genres: [String],
  isAvailable: { type: Boolean, default: true },
});

const Book = mongoose.model("Book", bookSchema);

/*
 * async markiert eine Funktion als asynchron, die ein Promise zurückgibt.
 * Mit await wird innerhalb einer solchen Funktion gewartet, bis ein Promise erfüllt ist, bevor der Code weiterläuft.
 * So kannst du asynchrone Abläufe einfach und synchron-artig schreiben.
 */
async function run() {
  await Book.deleteMany({}); // Datenbank aufräumen ohne Filterobjekt: z.B. Book.deleteMany({ author: "Hermann Hesse" }); würde nur Bücher von Hermann Hesse löschen.

  await Book.create([
    { title: "Clean Code", author: "Robert C. Martin", publishedYear: 2008, genres: ["Programming", "Software"] },
    { title: "Der Steppenwolf", author: "Hermann Hesse", publishedYear: 1927, genres: ["Roman"] },
  ]);

  const books = await Book.find();
  console.log("📚 Bücher:", books);
  mongoose.connection.close();
}

run();
