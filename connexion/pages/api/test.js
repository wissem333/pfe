// pages/api/testDb.js
import dbConnect from '../../utils/dbConnect';

export default async function handler(_req, res) {
  try {
    await dbConnect();
    return res.status(200).json({ message: "Database is connected!" });
  } catch (error) {
    return res.status(500).json({ message: "Failed to connect to database.", error: error.message });
  }
}