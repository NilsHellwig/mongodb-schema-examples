/**
 * 📝 Aufgabe 3: Nutzer und Buch-Bewertungen
 *
 * Ziel: Erstellt mehrere miteinander verknüpfte Schemata (User, Book, Review).
 *
 * Schritte:
 * 1. Erstellt ein Schema "User":
 *    - username: String, Pflichtfeld
 *    - email: String, Pflichtfeld
 *    - createdAt: Date, Standardwert: Jetzt
 * 2. Erstellt ein Schema "Book" (vereinfacht):
 *    - title: String, Pflichtfeld
 * 3. Erstellt ein Schema "Review":
 *    - user: ObjectId (Ref zu User), Pflichtfeld
 *    - book: ObjectId (Ref zu Book), Pflichtfeld
 *    - rating: Number (1–5)
 *    - comment: String
 * 4. Erstellt 1 Nutzer, 2 Bücher und 2 Bewertungen.
 * 5. Zeigt alle Bewertungen mit `.populate('user').populate('book')`.
 */

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/uebung3")
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => console.error("❌ Fehler:", err));

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  rating: Number,
  comment: String,
});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);
const Review = mongoose.model("Review", reviewSchema);

async function run() {
  await User.deleteMany({});
  await Book.deleteMany({});
  await Review.deleteMany({});

  const user = await User.create({ username: "max123", email: "max@example.com" });
  const b1 = await Book.create({ title: "JavaScript für Einsteiger" });
  const b2 = await Book.create({ title: "Node.js in Action" });

  await Review.create([
    { user: user._id, book: b1._id, rating: 5, comment: "Sehr hilfreich!" },
    { user: user._id, book: b2._id, rating: 4, comment: "Gut, aber etwas knapp." },
  ]);

  const reviews = await Review.find().populate("user").populate("book");
  console.log("📝 Bewertungen:", reviews);
  await mongoose.connection.close();
}

run();
