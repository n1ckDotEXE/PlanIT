const express = require('express');
const db = require('../models');
const router = express.Router();

router.use(express.static('./public'));

router.post('/list', (req,res) => {
  const { title, address, description } = req.body;

  if(!title) { res.status(400).json({ error: 'title is required'}) }
  if(!address) { res.status(400).json({ error: 'address is required'}) }
  if(!description) { res.status(400).json({ error: 'description is required'}) }
  
  db.Gardens.create({
    title: title,
    address: address,
    description: description,
    userId: req.session.user.id,
  })
  .then((garden) => {
    res.status(201).json(garden)
  })
})

module.exports = router;