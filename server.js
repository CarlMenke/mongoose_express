const express = require('express')
const cors = require('cors')
const logger = require('morgan')
const PORT = process.env.PORT || 3001
const db = require('./db')

const { Product, Brand } = require('./models')

const app = express()

app.use(cors())
app.use(express.json())
app.use(logger('dev'))

app.get('/', (req, res) => {
  res.send('This is root!')
})

app.get('/products', async (req, res) =>{
    const products  = await Product.find()
    res.json(products)
})

app.get( '/products/:id', async (req,res) =>{
    try {
    const { id } = req.params 
    const product = await Product.findById(id)
    res.json(product)
}
catch(e){
    console.log(e)
    res.send('Product Not Found!')
}
})

app.get('/brands', async (req, res) =>{
    const brands = await Brand.find()
    res.json(brands)
})

app.get( '/brands/:id', async (req,res) =>{
    try {
    const { id } = req.params 
    const brand = await Brand.findById(id)
    res.json(brand)
}
catch(e){
    console.log(e)
    res.send('Brand Not Found!')
}
})




app.listen(PORT, () => {
  console.log(`Express server listening on port ${PORT}`)
})