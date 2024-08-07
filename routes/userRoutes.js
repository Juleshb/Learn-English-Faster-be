const express = require('express');
const app = express.Router();
const db = require('../db');
const bcrypt =require("bcrypt");

// Registers a new user in the system
app.post('/register',async (req, res) => { 
  const { username,password, email } = req.body;
  const query = 'INSERT INTO users SET ?';
    const HashPassword= await bcrypt.hash(password,10); 
  const user= { username,password:HashPassword, email };
  db.query(query, user, (error, results) => {
    if (error) throw error;
    res.send(results); 
  });
});

 // User login  
 app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const query = 'SELECT * FROM users WHERE email = ?';

  db.query(query, [email], async (error, results) => {
    if (error) throw error;

    if (results.length > 0) {
      const user = results[0];
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        res.json({message:"Welcome"})
      } else {
        res.status(401).send({ message: 'Wrong username or password' });
      }
    } else {
      res.status(401).send({ message: 'Wrong username or password' });
    }
  });
});


// Retrieve a single user by id
app.get('/user/:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users WHERE user_id=?';

  db.query(query, id, (error, results) => {
    if (error) throw error;
    if(results.length>0){ 
      res.status(200).json(results);
        
    }else{ 
     res.json({message: "User not found"});
    }
    
  });
});
 

// Update a user by id
app.put('/user/:id', (req, res) => {
  const { id } = req.params;
  const{ username,password, email } = req.body;
  const query = 'UPDATE users SET username = ?, password = ?,email=? WHERE user_id = ?';
  db.query(query, [username,password, email,id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Delete a user by id
app.delete('/user/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE user_id = ?';

  db.query(query, id, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});


  //============= Admin===================
  //         ======Books =======
  
// Registers a new book in the system
app.post('/books', (req, res) => {
  const { title,author, description,content } = req.body;
  const query = 'INSERT INTO books SET ?';
  const user = { title,author, description,content};

  db.query(query, user, (error, results) => {
    if (error) throw error;
    res.status(200).json({message:"Book added successfully"});
  });
});
 
// Get all books

app.get('/books', (req, res) => {
  const query = 'SELECT * FROM books';
  db.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Get single  book
app.get('/books:id', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM books WHERE id=?';
  db.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});
 
// Updates single book 
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { title,author, description,content } = req.body;
  const query = 'UPDATE books SET title = ?, author = ?,description=?,content=? WHERE id = ?';
  db.query(query, [title,author, description,content], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});
 
// Delete a Book by id
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM books WHERE id = ?';

  db.query(query, id, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});
 

// Subscription Management User

// Add a subscription
app.post('/subscribe', (req, res) => {
  const { name,price, duration,created_at } = req.body;
  const query = 'INSERT INTO books SET ?';
  const user ={name,price, duration,created_at};

  db.query(query, user, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});
 


// Get all subscriptions
app.get('/subscriptions', (req, res) => {
  const query = 'SELECT * FROM subscriptions';
  db.query(query, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// ========Admin logins and athes Operations==========

// Retrieve a all  user
app.get('/admin/users', (req, res) => {
  const { id } = req.params;
  const query = 'SELECT * FROM users';

  db.query(query, id, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});



// Update a user by id
app.put('/admin/user/:id', (req, res) => {
  const { id } = req.params;
  const{ username,password, email } = req.body;
  const query = 'UPDATE users SET username = ?, password = ?,email=? WHERE id = ?';
  db.query(query, [username,password, email,id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Update a user by id
app.put('/admin/user/:id', (req, res) => {
  const { id } = req.params;
  const{ username,password, email } = req.body;
  const query = 'UPDATE users SET username = ?, password = ?,email=? WHERE id = ?';
  db.query(query, [username,password, email,id], (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Delete a user by id
app.delete('/admin/user/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM users WHERE id = ?';

  db.query(query, id, (error, results) => {
    if (error) throw error;
    res.send(results);
  });
});

// Delete a user by id
app.delete('/admin/analytics', (req, res) => {
  // Authorization: Bearer {admin_token}
});


module.exports = app;
