const path = require(`path`)

exports.createPages = async ({actions, graphql, reporter}) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    reporter.panicOnBuild("error while running graphql")
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({node}) => {
    createPage({
      path: node.frontmatter.path,
      component: path.resolve(`src/templates/blogTemplate.js`),
      context: {
        path: node.frontmatter.path
      },
    })
  })
}
