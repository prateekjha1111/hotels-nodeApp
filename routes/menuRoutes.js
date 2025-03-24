const express = require('express');
const router = express.Router();
const Menu = require('../models/Menu');

// POST route to add a menu item
router.post('/', async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new Menu(data);
  
      const response = await newMenu.save();
      console.log('menu saved!');
      res.status(200).json(response);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error'});
    }
  });
  
  // to read menu data
  router.get('/', async (req, res) => {
    try {
      const menus = await Menu.find();
      console.log('data fetched!');
      res.status(200).json(menus);
    } catch (error) {
      console.log(error);
      res.status(500).json({error: 'Internal server error'});
    }
  });

  // parameterized request
  router.get('/:category', async (req, res) => {
      try {
          const category = req.params.category;
          if(category == 'starter' || category == 'main course' || category == 'dessert' || category == 'beverage'){
            const response = await Menu.find({category});
            console.log('response fetched');
            res.status(200).json(response);
          }
          else {
            res.status(404).json({error: 'Invalid categoty search!'});
          }
      } catch (error) {
          console.log(error);
          res.status(500).json({ error: 'Internal server error!' });
      }
    });

    router.put('/:id', async (req, res) => {
        try {
          const menuId = req.params.id;
          const newData = req.body;
    
          const response = await Menu.findByIdAndUpdate(menuId, newData, {
            new: true,
            runValidators: true
          })
    
          if(!response) {
            res.status(404).json({error: 'Item not found!'});
          }
          console.log('Item updated!');
          res.status(200).json(response);
          
        } catch (error) {
          console.log(error);
          res.status(500).json({error: 'Internal server error!'});
        }
      });
    
      // delete route
      router.delete('/:id', async (req, res) => {
        try {
          const menuId = req.params.id;
          const response = await Menu.findByIdAndDelete(menuId);
    
          if(!response) {
            res.status(404).json({error: 'Item not found!'});
          }
          console.log('Item deleted!');
          res.status(200).json(response);
        } catch (error) {
          console.log(error);
          res.status(500).json({error: 'Internal server error!'});
        }
      });

  module.exports = router;