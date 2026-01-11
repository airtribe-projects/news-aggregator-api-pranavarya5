const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Using an in-memory array as a mock database
const users = [];

exports.register = async (req, res) => {
    try {
        const { name, email, password, preferences } = req.body;
        if (!email || !password) return res.status(400).json({ message: "Email and password required" });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = { id: Date.now(), name, email, password: hashedPassword, preferences: preferences || [] };
        
        users.push(newUser);
        res.status(201).json({ message: "User created successfully" });
    } catch (err) {
        res.status(500).json({ message: "Error registering user" });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);

    if (user && await bcrypt.compare(password, user.password)) {
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.json({ token });
    }
    res.status(401).json({ message: "Invalid credentials" });
};

// Exporting users so newsController can access preferences
exports.users = users;