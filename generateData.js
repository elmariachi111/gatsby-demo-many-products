const faker = require('faker/locale/de')
const MongoClient = require('mongodb').MongoClient
var url = 'mongodb://localhost:27018'

const BATCH = 100
const ROUNDS = 20

MongoClient.connect(url)
  .then(client => {
    const db = client.db('faker')
    const coll = db.collection('products')

    const ps = [...Array(ROUNDS).keys()].map(r => {
      return insertBatch(BATCH, coll)
    })
    Promise.all(ps).then(res => {
      client.close()
    })
  })
  .catch(console.log)

function insertBatch(N, collection) {
  return new Promise((resolve, reject) => {
    const products = []
    for (let i = N; i-- > 0; ) {
      products.push(createProduct())
    }
    collection.insertMany(products).then(resolve)
  })
}

function createProduct() {
  return {
    type: faker.commerce.product(),
    name: faker.commerce.productName(),
    adjective: faker.commerce.productAdjective(),
    color: faker.commerce.color(),
    imageUrl: faker.image.technics(400, 250),
    description: faker.lorem.paragraphs(3),
    price: parseFloat(faker.commerce.price(20, 300, 2)),
  }
}
