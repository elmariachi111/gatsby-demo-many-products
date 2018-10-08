/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allMongodbFakerProducts(limit: 10) {
          edges {
            node {
              mongodb_id
            }
          }
        }
      }
    `).then(result => {
      result.data.allMongodbFakerProducts.edges.forEach(({ node }) => {
        createPage({
          path: node.mongodb_id,
          component: path.resolve(`./src/templates/product.js`),
          context: {
            id: node.mongodb_id,
          },
        })
      })
      resolve()
    })
  })
}
