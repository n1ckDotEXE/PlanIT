const express = require('express');
const router = express.Router();
const db = require('../models'); 
const bcrypt = require('bcrypt');

router.post('/auth/register', (req,res,) =>{ 
  const name = req.body.name_input;
  const email = req.body.email_input;
  const password = req.body.password_input;


  bcrypt.hash(password, 10, (err, hash) => {
    db.Users.create({   
      name: name,  
      email:email,
      password: hash,
    }).then((user) => { 
      req.session.user = user;
      res.status(201).json(user)
    }); 
  });
});
 
router.post('/auth/login', (req,res) => { 
  const { email, password } = req.body;

  db.Users.findOne({ where: { email } }) 
    .then((user) => {
      bcrypt.compare(password, user.password, (err, match) => { 
        if (match) { 
          req.session.user = user; 
          res.status(200).json(user)
        } else { 
          res.status(401).json({
            error: 'password is incorrect!'
          });
        }
      });
    })
    .catch(() => {
      res.status(401).json({
        error: 'e-mail not found!'
      });
    });
});

router.get('/auth/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({
    message: 'logged out!'
  })
})

router.get('/', (req, res) => {
  db.Users.findAll(
   {
     include: [db.Gardens]
   } 
  )
  .then(users => {
    res.status(200).json(users)
  })
})

router.get('/:id', (req, res) => {
  db.Users.findByPk(
    req.params.id,
   {
     include: [db.Gardens],
     order: [[db.Gardens, "createdAt", "DESC"]]
   } 
  )
  .then(users => {
    res.status(200).json(users)
  })
})



module.exports = router;