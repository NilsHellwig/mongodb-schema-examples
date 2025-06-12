/**
 * 🚗 Aufgabe 4: CRUD-Grundlagen mit Autos
 *
 * Ziel: Grundlagen der Datenbank-Operationen (Create, Read, Update, Delete) in Mongoose üben.
 *
 * Setup: 20 Dummy-Einträge von Autos werden automatisch erzeugt (kein eigener Task).
 * Übungsaufgaben: 8 kleine Aufgaben zu Suchen, Filtern, Updaten und Löschen.
 */

import mongoose from "mongoose";

mongoose
  .connect("mongodb://localhost:27017/uebung4")
  .then(() => console.log("✅ MongoDB verbunden"))
  .catch((err) => console.error("❌ Fehler:", err));

const carSchema = new mongoose.Schema({
  brand: String,
  model: String,
  year: Number,
  fuel: String,
  mileage: Number, //  Kilometer (oder Meilen), die ein Auto bereits gefahren ist.
  electric: Boolean,
});

const Car = mongoose.model("Car", carSchema);

const BRANDS = ["VW", "BMW", "Saab", "Mercedes", "Toyota", "Audi", "Renault"];
const MODELS = ["A1", "X3", "Model 3", "Yaris", "C-Klasse", "Zoe", "Golf"];
const FUELS = ["Benzin", "Diesel", "Elektro", "Hybrid"];

function randomItem(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomCar() {
  return {
    brand: randomItem(BRANDS),
    model: randomItem(MODELS),
    year: Math.floor(Math.random() * 24) + 2000,
    fuel: randomItem(FUELS),
    mileage: Math.floor(Math.random() * 200_000),
    electric: Math.random() < 0.3,
  };
}

async function run() {
  await Car.deleteMany({});

  // Wir initialisieren zunächst Dummydaten: 20 Autos
  const cars = Array.from({ length: 20 }, randomCar);
  await Car.insertMany(cars);
  console.log("🚗 20 Autos eingefügt\n");

  // Aufgabe 1: Finde alle Autos der Marke "Saab"
  const Saabs = await Car.find({ brand: "Saab" });
  console.log("🔍 Saabs:", Saabs);

  // Aufgabe 2: Finde Autos, die vor 2010 gebaut wurden
  const oldCars = await Car.find({ year: { $lt: 2010 } });
  console.log("📅 Autos vor 2010:", oldCars);

  // Aufgabe 3: Finde alle Elektroautos mit weniger als 50.000 km
  const cleanElectrics = await Car.find({ electric: true, mileage: { $lt: 50000 } });
  console.log("⚡️ Saubere E-Autos:", cleanElectrics);

  // Aufgabe 4: Aktualisiere alle BMWs: mileage auf 0 setzen (Service gemacht)
  await Car.updateMany({ brand: "BMW" }, { mileage: 0 });
  console.log("🔧 BMWs zurückgesetzt");

  // Aufgabe 5: Erhöhe die Laufleistung aller Autos aus dem Jahr 2020 um 10.000 km
  await Car.updateMany({ year: 2020 }, { $inc: { mileage: 10000 } });
  console.log("➕ 10.000 km auf 2020er Autos addiert");

  // Aufgabe 6: Lösche alle Dieselautos mit mehr als 150.000 km
  const deleted = await Car.deleteMany({ fuel: "Diesel", mileage: { $gt: 150000 } });
  console.log(`🗑️ Gelöschte Dieselautos: ${deleted.deletedCount}`);

  // Aufgabe 7: Finde ein beliebiges Elektroauto und gib nur Marke & Modell aus
  const electricOne = await Car.findOne({ electric: true }).select("brand model");
  console.log("⚡️ E-Auto gefunden:", electricOne);

  // Aufgabe 8: Zähle, wie viele Autos es pro Marke gibt
  const countPerBrand = await Car.aggregate([{ $group: { _id: "$brand", count: { $sum: 1 } } }]);
  console.log("📊 Autos pro Marke:", countPerBrand);

  await mongoose.connection.close();
  console.log("\n🔚 Verbindung beendet");
}

run();
