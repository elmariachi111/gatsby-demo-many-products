import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const Product = ({ product }) => (
  <div style={{ display: "flex", flexDirection: "row" }}>
    <Link
      to={`/${product.mongodb_id}`}
      style={{ marginRight: '1rem', display: "flex" }}
    >
      {product.name}
    </Link>
    <div style={{ display: "flex", alignSelf: "right" }}>
      &euro;{product.price}
    </div>
  </div>
)

export default ({ pageContext, data: { products } }) => {

  return <Layout>
    <h1><Link to="/">home</Link> &raquo; {pageContext.category} ({pageContext.totalCount})</h1>

    {products.edges.map(({ node }) => (
      <Product product={node} key={`p-${node.mongodb_id}`} />
    ))
    }

  </Layout>
}


export const query = graphql`
query ($category: String) {
  products: allMongodbFakerProducts(filter: {type: {eq: $category}}) {
    edges {
      node {
        type
        name
        mongodb_id
        price
      }
    }
  }
}

`
