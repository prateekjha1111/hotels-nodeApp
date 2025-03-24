const express = require('express');
const router = express.Router();
const Person = require('../models/person');
const { route } = require('./menuRoutes');

router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
  
      const response = await newPerson.save();
      console.log('data saved!');
      res.status(200).json(response);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error'});
    }
  });
  
router.get('/', async (req, res) => {
    try {
        const persons = await Person.find();
        console.log('data fetched!');
        res.status(200).json(persons);
        
    } catch (error) {
        res.status(500).json({ error: 'Internal server error!' });
    }
  });

// parameterized request
router.get('/:workType', async (req, res) => {
    try {
        const workType = req.params.workType;
        if(workType == 'chef' || workType == 'waiter' || workType == 'manager'){
          const response = await Person.find({work: workType});
          console.log('response fetched');
          res.status(200).json(response);
        }
        else {
          res.status(404).json({error: 'Invalid work type search!'});
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error!' });
    }
  });

   // update route
   router.put('/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const newData = req.body;

      const response = await Person.findByIdAndUpdate(personId, newData, {
        new: true,
        runValidators: true
      })

      if(!response) {
        res.status(404).json({error: 'Person not found!'});
      }
      console.log('Person updated!');
      res.status(200).json(response);
      
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error!'});
    }
  });

  // delete route
  router.delete('/:id', async (req, res) => {
    try {
      const personId = req.params.id;
      const response = await Person.findByIdAndDelete(personId);

      if(!response) {
        res.status(404).json({error: 'Person not found!'});
      }
      console.log('Person deleted!');
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error!'});
    }
  });

  module.exports = router;