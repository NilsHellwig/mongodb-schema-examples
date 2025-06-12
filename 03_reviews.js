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

});

const bookSchema = new mongoose.Schema({

});

const reviewSchema = new mongoose.Schema({

});

const User = mongoose.model("User", userSchema);
const Book = mongoose.model("Book", bookSchema);
const Review = mongoose.model("Review", reviewSchema);

async function run() {
  await User.deleteMany({});
  await Book.deleteMany({});
  await Review.deleteMany({});


  const reviews = await Review.find().populate("user").populate("book");
  console.log("📝 Bewertungen:", reviews);
  await mongoose.connection.close();
}

run();
