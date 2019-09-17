/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path')

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      products: allMongodbFakerProducts {
        edges {
          node {
            mongodb_id
          }
        }
      }

      categories: allMongodbFakerProducts {
        group(field: type) {
          fieldValue
          totalCount
        }
      }
    }
  `)

  result.data.products.edges.forEach(({ node }) => {
    createPage({
      path: node.mongodb_id,
      component: path.resolve('./src/templates/product.js'),
      context: {
        id: node.mongodb_id
      }
    })
  })

  result.data.categories.group.forEach(({ fieldValue, totalCount }) => {
    createPage({
      path: `/category/${fieldValue}`,
      component: path.resolve('./src/templates/category.js'),
      context: {
        category: fieldValue,
        totalCount
      }
    })
  })
}
