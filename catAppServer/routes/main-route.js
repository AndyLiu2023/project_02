const express =require('express');
const router = express.Router();
const foodCtrl = require('../controllers/food.controller');
const catCtrl = require('../controllers/cat.controller');

router.get("/", (req, res) => {
    res.send("Hello From The Server");
})

router.get('/food',  foodCtrl.getAllFoodInfo
  );

router.patch('/food/:id', foodCtrl.markPrefer);

// cat
router.get('/cat', catCtrl.getAllCat);

router.post('/cat', catCtrl.addNewCat);

router.delete('/cat/:id', catCtrl.removeCat);


module.exports = router