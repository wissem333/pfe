import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { email, password } = req.body;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Compare the hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid email or password" });
      }

      // Create a JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

      return res.status(200).json({ message: "Login successful", token });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
