import { Container, Col, Row, Image } from "react-bootstrap";
import dynamic from 'next/dynamic';
import BlogCard from "../../components/blog-card";
import ListGroup from "../../components/listgroup";

import styles from "./index.module.scss";

const DynamicImage = dynamic(() => import("../../components/custom-image"), <div>...loading</div>);

const Blogs = ({ blogData, bannerData, activeNav }) => {

    const filterData = bannerData?.data.filter((data) => data.Pages === activeNav);
    
    return (
        <>
          <picture className="page-banner">
            <source
              media="(min-width: 768px)"
              srcSet={filterData[0].bannerImage}
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
              </div>
              <Row>
                <Col lg={8} md={7} xs={12}>
                  <BlogCard data={blogData} />
                </Col>
                <Col lg={4} md={5} xs={12}>
                  <ListGroup blogUrl="/blogs/" data={blogData} />
                </Col>
              </Row>
            </Container>
          </main>
        </>
    );
};

export async function getStaticProps() {
    const res = await fetch("http://login.sukhothai.in/route/blogST/blogList");
    const blogData = await res.json();

    const bannerRes = await fetch('http://login.sukhothai.in/route/webBannerST/getAllWebPagesBannerData');
    const bannerData = await bannerRes.json();
    
    return {
        props: {
            blogData,
            activeNav: "BLOGS",
            bannerData
        }
    };
}

export default Blogs;
