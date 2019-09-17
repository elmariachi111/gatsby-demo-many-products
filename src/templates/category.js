import React, { useState } from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const Product = ({ product }) => (
  <div>
    <Link
      to={`/${product.mongodb_id}`}
      style={{ marginRight: '1rem' }}
    >
      {product.name}
    </Link>
    <span style={{ marginRight: '1rem' }}>
      Color: {product.color}
    </span>
    &euro;{product.price}

  </div>
)

const Filters = ({ colors, toggle }) => {

  return <ul style={{ listStyleType: "none", margin: 0 }}>
    {Object.keys(colors).map(color => (
      <li onClick={() => toggle(color)}
        key={`filter-${color}`}
        style={{
          display: 'inline',
          marginRight: "1rem",
          fontWeight: colors[color].active == true ? '900' : 'normal'
        }}
      >
        {color}({colors[color].count})
    </li>))
    }
  </ul >
}

const initialFilters = products => {
  const colors = {}
  products.edges.forEach(({ node }) => {
    if (!colors[node.color]) {
      colors[node.color] = { count: 1, active: false };
    } else {
      colors[node.color].count++;
    }
  });
  return colors
}
export default ({ pageContext, data: { products } }) => {

  const [colors, setColors] = useState(initialFilters(products))
  const [allActive, setAllActive] = useState(true)
  const toggleFilter = (color => {
    setColors(oldColors => {
      oldColors[color].active = !oldColors[color].active
      return {
        ...oldColors
      }

    });

  })

  return <Layout>
    <h1><Link to="/">home</Link> &raquo; {pageContext.category} ({pageContext.totalCount})</h1>
    <Filters
      colors={colors}
      toggle={color => toggleFilter(color)}
    />
    {products.edges.map(({ node }) => {
      if (Object.values(colors).filter(c => c.active).length == 0 || colors[node.color].active)
        return <Product product={node} key={`p-${node.mongodb_id}`} />
      else
        return '';
    })
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
        color
      }
    }
  }
}

`
