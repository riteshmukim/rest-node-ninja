const express = require("express");
const router = express.Router();
const Ninja = require("../models/ninja");

/* GET list of ninjas */
router.get("/ninjas", function(req, res, next) {
  // Ninja.find({}).then()
  console.log(parseFloat(req.query.lng), parseFloat(req.query.lat));
  Ninja.aggregate([
    {
      $geoNear: {
        near: {
          type: "Point",
          coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)]
        },

        maxDistance: 100000,
        spherical: true,
        distanceField: "dist.calculated"
      }
    }
  ])
    .then(ninjas => res.json(ninjas))
    .catch(next);
});

/* Add a ninja */
router.post("/ninjas", function(req, res, next) {
  // let ninja = new Ninja(req.body);
  // ninja.save();
  Ninja.create(req.body)
    .then(ninja => res.json(ninja))
    .catch(next);
});

/* Update a ninja */
router.put("/ninjas/:id", function(req, res, next) {
  Ninja.findByIdAndUpdate({ _id: res.params.id }).then(() =>
    Ninja.findOne({ _id: req.params.id })
      .then(ninja => res.json(ninja))
      .catch(next)
  );
});

/* Delete a ninja */
router.delete("/ninjas/:id", function(req, res, next) {
  Ninja.findByIdAndRemove({ _id: req.params.id })
    .then(ninja => res.json(ninja))
    .catch(next);
});

module.exports = router;
