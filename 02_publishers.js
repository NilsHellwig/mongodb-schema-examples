/**
 * 📝 Aufgabe 2: Verlage & Referenzen
 *
 * Ziel: Arbeitet mit Referenzen zwischen zwei Collections: Books & Publishers.
 *
 * Schritte:
 * 1. Erstellt ein separates Schema "Publisher":
 *    - name: String, Pflichtfeld
 *    - location: String
 *    - founded: Number
 * 2. Erweitert das "Book"-Schema:
 *    - publisher: ObjectId (Verweis auf Publisher), Pflichtfeld
 * 3. Erstellt 2 Publisher und 2 Bücher, die auf je einen Publisher verweisen.
 * 4. Gebt die Bücher inkl. Publisher-Daten über `.populate()` aus.
 */

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/uebung2")
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => console.error("❌ Fehler:", err));

const publisherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  founded: Number,
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: "Publisher", required: true },
});

const Publisher = mongoose.model("Publisher", publisherSchema);
const Book = mongoose.model("Book", bookSchema);

async function run() {
  await Publisher.deleteMany({});
  await Book.deleteMany({});

  const p1 = await Publisher.create({ name: "Penguin Books", location: "UK", founded: 1935 });
  const p2 = await Publisher.create({ name: "Springer", location: "Germany", founded: 1842 });

  await Book.create([
    { title: "Data Science Handbook", publisher: p1._id },
    { title: "Wissenschaft und Forschung", publisher: p2._id },
  ]);

  /*
   * populate sorgt dafür, dass bei einer Abfrage mit Referenzen (ObjectId-Feldern) die verknüpften Dokumente vollständig geladen
   * und eingebettet werden — anstatt nur die IDs zurückzugeben.
   */
  const books = await Book.find().populate("publisher");
  console.log("📚 Bücher mit Publisher:", books);
  await mongoose.connection.close();
}

run();
