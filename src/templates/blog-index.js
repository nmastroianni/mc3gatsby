import * as React from "react";
import { graphql } from "gatsby";
import Seo from "../components/seo";
import Layout from "../components/layout";
import BlogCard from "../components/blog-card";
import Pagination from "../components/pagination";
import PageTitle from "../components/page-title";
import { HiNewspaper } from "react-icons/hi";

export default function Blog({
  path,
  pageContext: { currentPage, limit, numPages, totalPosts },
  data: {
    allGoogleDocs: { nodes },
  },
}) {
  return (
    <Layout>
      <Seo title="Blog" />
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <header className="mb-2 sm:mb-4 lg:mb-6 flex flex-col items-center">
          <PageTitle title="Blog">
            Discover great things happening in districts near you.
          </PageTitle>
          <HiNewspaper className="text-3xl sm:text-5xl lg:text-6xl text-blue-700 mt-3" />
        </header>
        <section className="grid grid-cols-1 gap-y-8 md:gap-y-10 max-w-2xl mx-auto my-2 sm:my-4 lg:my-6 ">
          {nodes.map((post) => {
            return <BlogCard key={post.id} postData={post} />;
          })}
        </section>

        <Pagination
          path={path}
          numPages={numPages}
          currentPage={currentPage}
          limit={nodes.length}
          totalPosts={totalPosts}
        />
      </div>
    </Layout>
  );
}

export const data = graphql`
  query($skip: Int!, $limit: Int!) {
    allGoogleDocs(
      filter: { template: { eq: "post" } }
      sort: { fields: date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
      nodes {
        childMdx {
          excerpt
          timeToRead
        }
        id
        modifiedTime
        name
        slug
        cover {
          alt
          title
          image {
            childImageSharp {
              gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED)
            }
          }
        }
        tags
      }
    }
  }
`;