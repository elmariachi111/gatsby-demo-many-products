import React from 'react'
import { Link, graphql } from 'gatsby'

import Layout from '../components/layout'

class Group extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  render() {
    const group = this.props.group
    return (
      <div>
        <h2
          onClick={() => {
            this.setState({ open: !this.state.open })
          }}
          style={{ cursor: 'pointer' }}
        >
          {group.fieldValue} <small>({group.totalCount})</small>
        </h2>
        {this.state.open &&
          group.edges.slice(0, 40).map(e => (
            <Link
              to={e.node.mongodb_id}
              style={{ marginRight: '1rem' }}
              key={`p-${e.node.mongodb_id}`}
            >
              {e.node.name}
            </Link>
          ))}
      </div>
    )
  }
}

const IndexPage = ({ data }) => (
  <Layout>
    <h1>All the products</h1>
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
        edges {
          node {
            mongodb_id
            name
          }
        }
      }
    }
  }
`

export default IndexPage
