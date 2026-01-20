import dotenv from "dotenv";
import app from "./src/app.js";
import connectDB from "./src/config/db.js";

dotenv.config();

console.log("ENV PORT:", process.env.PORT);
console.log("ENV MONGO:", process.env.MONGO_URI ? "FOUND" : "MISSING");

connectDB();

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
