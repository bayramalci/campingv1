const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Database = require('./classes/database.js'); 

const app = express();
const PORT = 5000;
const SECRET_KEY = 'your-secret-key';

app.use(cors({ origin: 'http://localhost:8080', methods: ['GET', 'POST', 'PUT'], allowedHeaders: ['Content-Type', 'Authorization'] }));
app.use(bodyParser.json());





app.get('/api/data', async (req, res) => {
  try {
    const db = new Database();
    const rows = await db.getQuery('SELECT * FROM users');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Database query failed', details: error.message });
  }
});

app.post('/api/register', async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    if (!name || !email || !phone || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const db = new Database();
    const existingUser = await db.getQuery('SELECT * FROM users WHERE email = ?', [email]);

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.getQuery('INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)', [name, email, phone, hashedPassword]);

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration Error:', error);
    res.status(500).json({ error: 'Failed to register user', details: error.message });
  }
});


app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = new Database();
    const [user] = await db.getQuery('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});

app.put('/api/user', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const decoded = jwt.verify(token, SECRET_KEY);
    const userId = decoded.id;

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const db = new Database();
    await db.getQuery('UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, userId]);

    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update profile', details: error.message });
  }
});

app.post('/api/change-password', async (req, res) => {
  try {
    const { email, phone, newPassword } = req.body;

    // Ensure that email, phone, and new password are provided
    if (!email || !phone || !newPassword) {
      return res.status(400).json({ error: 'Email, phone number, and new password are required' });
    }

    // Validate the email and phone number
    const db = new Database();
    const userQuery = 'SELECT * FROM users WHERE email = ? AND phone = ?';
    const [user] = await db.getQuery(userQuery, [email, phone]);

    if (!user) {
      return res.status(404).json({ error: 'No user found with the provided email and phone number' });
    }

    // Hash the new password before saving it
    const bcrypt = require('bcryptjs');
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const updateQuery = 'UPDATE users SET password = ? WHERE email = ? AND phone = ?';
    await db.getQuery(updateQuery, [hashedPassword, email, phone]);

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to change password' });
  }
});

// GET endpoint to fetch camping spots
app.get('/api/campingspots', async (req, res) => {
  try {
    const db = new Database();
    const sql = `
      SELECT * 
      FROM campingspots
    `;
    const spots = await db.getQuery(sql);
    res.json(spots);
  } catch (error) {
    console.error('Error fetching camping spots:', error);
    res.status(500).json({ error: 'Failed to fetch camping spots' });
  }
});

app.post('/api/bookings', async (req, res) => {
  console.log('Received booking request:', req.body);

  const db = new Database();
  const { userEmail, spotId, bookingDate, people } = req.body;

  if (!userEmail || !spotId || !bookingDate || !people) {
    console.error('Missing required fields:', req.body);
    return res.status(400).json({ error: 'Missing required fields.' });
  }

  const query = `
    INSERT INTO bookings (user_email, spot_id, booking_date, people_count)
    VALUES (?, ?, ?, ?)
  `;

  try {
    const results = await db.getQuery(query, [userEmail, spotId, bookingDate, people]);
    console.log('Booking successful, inserted ID:', results.insertId); // Log booking success
    res.status(201).json({ message: 'Booking successful!', bookingId: results.insertId });
  } catch (err) {
    console.error('Error inserting into DB:', err.message); // Log database error
    res.status(500).json({ error: 'Failed to book spot.' });
  }
});


// User Login Endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const db = new Database();
    const [user] = await db.getQuery('SELECT * FROM users WHERE email = ?', [email]);

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '1h' });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
});


app.get('/api/bookings', async (req, res) => {
  const userEmail = req.query.userEmail; 
  if (!userEmail) {
    return res.status(400).json({ error: 'User email is required' });
  }

  try {
    const db = new Database(); 
    const sql = `
      SELECT bookings.id, campingspots.name AS spot_name, bookings.booking_date, bookings.people_count
      FROM bookings
      JOIN campingspots ON bookings.spot_id = campingspots.id
      WHERE bookings.user_email = ?`;
    
    const bookings = await db.getQuery(sql, [userEmail]);

    if (bookings.length === 0) {
      return res.status(404).json({ error: 'No bookings found' });
    }

    res.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});


app.delete('/api/bookings/:id', async (req, res) => {
  console.log('DELETE request received for booking ID:', req.params.id); // Debugging log

  const { id } = req.params;  // Booking ID from URL params
  const { userEmail } = req.query; // Get user email from query params

  if (!userEmail) {
    return res.status(400).json({ error: 'User email is required' });
  }

  try {
    const db = new Database();

    // Check if the booking exists for the logged-in user
    const [booking] = await db.getQuery('SELECT * FROM bookings WHERE id = ? AND user_email = ?', [id, userEmail]);

    if (!booking) {
      console.log(`No booking found with ID: ${id} for user: ${userEmail}`);
      return res.status(404).json({ error: 'Booking not found or does not belong to this user' });
    }

    // If booking exists, delete it
    await db.getQuery('DELETE FROM bookings WHERE id = ?', [id]);
    console.log(`Successfully deleted booking with ID: ${id}`); // Success log
    res.json({ success: true, message: 'Booking deleted successfully' });
  } catch (error) {
    console.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

app.get('/api/spots', async (req, res) => {
  const { region, maxPrice } = req.query; 
  let query = `
    SELECT id, name, region, price, address 
    FROM spots 
    WHERE 1=1
  `; 
  const params = [];

  if (region) {
    query += ' AND region = ?';
    params.push(region);
  }

  if (maxPrice) {
    query += ' AND price <= ?';
    params.push(maxPrice);
  }

  try {
    const db = new Database(); 
    const spots = await db.getQuery(query, params); 
    res.json({ spots });
  } catch (error) {
    console.error('Error fetching spots:', error);
    res.status(500).json({ error: 'Failed to fetch spots' });
  }
});

app.post('/api/admin/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = new Database();
    const [admin] = await db.getQuery('SELECT * FROM admins WHERE email = ?', [email]);

    if (!admin || !bcrypt.compareSync(password, admin.password)) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: admin.id, email: admin.email }, SECRET_KEY, { expiresIn: '2h' });
    res.status(200).json({ success: true, token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/admin/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const db = new Database();
    const [existingAdmin] = await db.getQuery('SELECT * FROM admins WHERE email = ?', [email]);

    if (existingAdmin) {
      return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.getQuery('INSERT INTO admins (email, password) VALUES (?, ?)', [email, hashedPassword]);
    res.status(201).json({ message: 'Admin created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create admin' });
  }
});

app.get('/api/admin/spots', async (req, res) => {
  try {
    const db = new Database();
    const spots = await db.getQuery('SELECT * FROM spots');
    res.json({ spots });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch spots' });
  }
});

app.post('/api/admin/spots', async (req, res) => {
  const { name, address, region, price } = req.body;

  if (!name || !address || !region || !price) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = new Database();
    console.log(`Inserting into spots: ${name}, ${address}, ${region}, ${price}`);
    const result = await db.getQuery('INSERT INTO spots (name, address, region, price) VALUES (?, ?, ?, ?)', [name, address, region, price]);

    if (result.affectedRows > 0) {
      res.status(201).json({ message: 'Spot added successfully', spotId: result.insertId });
    } else {
      res.status(500).json({ error: 'Failed to add spot' });
    }
  } catch (error) {
    console.error('Error adding spot:', error);
    res.status(500).json({ error: 'Failed to add spot due to server error' });
  }
});


app.delete('/api/admin/spots/:id', async (req, res) => {
  const spotId = req.params.id;

  try {
    const db = new Database();
    const result = await db.getQuery('DELETE FROM spots WHERE id = ?', [spotId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Spot not found' });
    }

    res.json({ message: 'Spot deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete spot' });
  }
});

app.get('/api/admin/bookings', async (req, res) => {
  try {
    const db = new Database();
    const bookings = await db.getQuery(`
      SELECT bookings.id, users.name AS user_name, campingspots.name AS spot_name, bookings.booking_date, bookings.people_count
      FROM bookings
      JOIN users ON bookings.user_email = users.email
      JOIN campingspots ON bookings.spot_id = campingspots.id
    `);
    res.json({ bookings });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
});

app.delete('/api/admin/bookings/:id', async (req, res) => {
  const bookingId = req.params.id;

  try {
    const db = new Database();
    const result = await db.getQuery('DELETE FROM bookings WHERE id = ?', [bookingId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete booking' });
  }
});

app.get('/api/admin/users', async (req, res) => {
  try {
    const db = new Database();
    const users = await db.getQuery('SELECT id, name, email, phone FROM users');
    res.json({ users });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.put('/api/admin/users/:id', async (req, res) => {
  const userId = req.params.id;
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    const db = new Database();
    const result = await db.getQuery('UPDATE users SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, userId]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User details updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user details' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
