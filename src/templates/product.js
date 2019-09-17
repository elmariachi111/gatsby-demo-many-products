import React from 'react'
import { graphql, Link } from 'gatsby'
import Layout from '../components/layout'

export default ({ data }) => {
  const product = data.mongodbFakerProducts
  return (
    <Layout>
      <h1><Link to="/">home</Link> &raquo; <Link to={`/category/${product.type}`}>{product.type}</Link> &raquo; {product.name}</h1>
      <h3>
        &euro;{product.price}
      </h3>
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
      type
      adjective
      price
      color
      imageUrl
      description
      mongodb_id
    }
  }
`
