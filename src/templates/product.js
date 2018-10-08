import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const product = data.mongodbFakerProducts
  return (
    <Layout>
      <h1>{product.name}</h1>
      <p>
        EUR
        {product.price}
      </p>
      <p>
        <img src={product.imageUrl} />
      </p>
      <p>{product.description}</p>

      <p>
        <b>Adjectives:</b> {product.adjective}
      </p>

      <p>
        <b>Color:</b> {product.color}
      </p>
    </Layout>
  )
}

export const query = graphql`
  query($id: String!) {
    mongodbFakerProducts(mongodb_id: { eq: $id }) {
      name
      adjective
      price
      color
      imageUrl
      description
      mongodb_id
    }
  }
`
