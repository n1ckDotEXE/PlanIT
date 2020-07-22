const express = require('express');
const db = require('../models');
const router = express.Router();

router.use(express.static('./public'));

router.get('/list/:id', (req,res) => {
  db.Gardens.findByPk(
    req.params.id
  )
  .then((garden) => {
    res.status(201).json(garden)
  })
})

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

router.put('/list/:id', (req,res) => {
  const { title, address, description } = req.body;

  if(!title) {res.status(400).json({ error: 'title is required'}) }
  if(!address) {res.status(400).json({ error: 'address is required'}) }
  if(!description) {res.status(400).json({ error: 'description is required'}) }

  db.Gardens.update({
    where: {
      id: req.params.id
    },
    title: title,
    address: address,
    description: description,
    userId: req.session.user.id,
  })
  .then((garden) => {
    res.status(201).json(garden)
  })
})

router.delete('/list/:id', (req,res) => {
  console.log('deleting')
  db.Gardens.destroy({
    where: {
      id: req.params.id
    }})
    .then((garden) => {
      res.status(201).json(garden)
    })
})


module.exports = router;