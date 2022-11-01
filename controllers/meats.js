const express = require('express')
const Meat = require('../models/meat')
const upload = require('../middlewares/upload')
const router = express.Router()


//Index Page
router.get('/api/butcher', async (req, res) => {
    const meats = await Meat.find()
    res.json(meats)
})

//Search Route
router.get('/api/butcher/search/', async (req, res) => {
  console.log(req.query)
  const { query } = req.query
  let meats
  if ( query ) {
    meats = await Meat.aggregate(
      [
        {
          "$search": {
            "index": "default",
            "text": {
              "query": query,
              "path": {
                "wildcard": "*"
              }
            }
          }
        }
      ]
    )
  } else {
    meats = await Meat.find()
  }
  res.json(meats)
})

//Show Page - Display individual Meat
router.get('/api/butcher/:id', async (req, res) => {
    let meats = await Meat.findById(req.params.id)
    res.json(meats)
})


// POST Request / Create new Meat
router.post('/api/butcher', upload.single('image'), async (req, res) => {
    let meat = {
      ...req.body,
      imageURL: req.file?.path,
    }
    meat = await Meat.create(meat)
    res.json(meat)
  })

// PUT Request / Update Meat
  router.put('/api/butcher/edit/:id', upload.single('image'), async (req, res) => {
    let meats = await Meat.findById(req.params.id)
    req.body.imageURL = req.file?.path

    meats = await Meat.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )
    res.json(meats)

})
// DELETE Request / Delete Meat
  router.delete('/api/butcher/:id', async (req, res) => {
    let meats = await Meat.findById(req.params.id)
    meats = await meats.remove()
    res.json(meats)
  })




module.exports = router