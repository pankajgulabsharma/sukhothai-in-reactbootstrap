import { Row, Col, Image, Container, Card } from "react-bootstrap";
import dynamic from "next/dynamic";
import ListGroup from "../../components/listgroup";

import styles from "./index.module.scss";

const DynamicImage = dynamic(
  () => import("../../components/custom-image"),
  <div>...loading</div>
);

const BlogPost = ({ post, blogsData, bannerData, activeNav }) => {

    const filterData = bannerData?.data.filter((data) => data.Pages === activeNav);
    
    const date = new Date(post.result.date);
    const dateString = date.getDate() + " " + date.toLocaleDateString('default', { month: "short" });

    return (
        <>
          <picture className="page-banner">
            <source
              media="(min-width: 768px)"
              srcset={filterData[0].bannerImage}
            />
            <DynamicImage
              src={filterData[0].bannerImage}
              className="w-100"
              alt="Sukhothai"
            />
          </picture>
          <main className="main-content contact-us-page">
            <Container>
              <div className="section-block">
                <div className="block-heading-box">
                  <h2 className="block-title block-title--with-border text-center">
                    Sukhothai Blogs
                  </h2>
                </div>
                <Row>
                  <Col lg={8} md={7} xs={12} className="mb-5 mb-md-0">
                    <Card>
                      <div className="card-img-top h-auto">
                        <span className="card__badge">{dateString}</span>
                        <DynamicImage src={post.result.blog[0].blogImage} className="w-100" alt={post.result.title} />
                      </div>
                      <Card.Body>
                        <h3 className="card-title">{post.result.title}</h3>
                        <div 
                          dangerouslySetInnerHTML={{
                              __html: post.result.blog[0].description
                          }}
                        ></div>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col lg={4} md={5} xs={12}>
                    <ListGroup blogUrl="/blogs/" data={blogsData} />
                  </Col>
                </Row>
              </div>
            </Container>
          </main>
        </>
    );
};

export async function getStaticPaths() {
  //1
  const res = await fetch(`http://login.sukhothai.in/route/blogST/blogList`);
  const posts = await res.json();

  const paths = posts.map(post => ({
    params: { landing: encodeURI(post?.title.replace(/\s/g, "-")) }
  }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  //2
  const res = await fetch(
    "http://login.sukhothai.in/route/blogST/getBlogByName/" +
      encodeURI(params.landing.replace(/-/g, " "))
  );

    const res1 = await fetch("http://login.sukhothai.in/route/blogST/blogList");
    
    const bannerRes = await fetch('http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData');
    
    const post = await res.json();
    const blogsData = await res1.json();
    const bannerData = await bannerRes.json();
    
    return {
        props: {
            post,
            blogsData,
            activeNav: "BLOGS",
            bannerData
        }
    };
}

export default BlogPost;
