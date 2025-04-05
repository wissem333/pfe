import bcrypt from 'bcryptjs';
import User from '../../../models/User';
import dbConnect from '../../../utils/dbConnect';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { email, password } = req.body;
      // Check if the user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 12);

      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
      });

      await newUser.save();
      return res.status(201).json({ message: "User created successfully" });
    } catch (error) {
      return res.status(500).json({ message: "Server error" });
    }
  }
  return res.status(405).json({ message: "Method not allowed" });
}
