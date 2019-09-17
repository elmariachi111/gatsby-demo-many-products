import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

const Group = ({ group }) => (
  <div>
    <h2>
      <Link to={`/category/${group.fieldValue}`}>
        {group.fieldValue}
      </Link>
      <small>({group.totalCount})</small>
    </h2>
  </div>
)

export default ({ data }) => (
  <Layout>
    <h1>Categories</h1>
    {data.grouped.group.map(g => (
      <Group key={`g-${g.fieldValue}`} group={g} />
    ))}
  </Layout>
)

export const query = graphql`
  {
    grouped: allMongodbFakerProducts {
      group(field: type) {
        fieldValue
        totalCount
      }
    }
  }
`
