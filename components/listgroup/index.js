import React from "react";
import Link from "next/link";
import dynamic from 'next/dynamic';

const DynamicImage = dynamic(() => import("../custom-image"), <div>...loading</div>);

const ListGroupBlog = ({ data, blogUrl }) => {
  
  return (
    <div className="popular-blog">
      <h3 className="popular-blog__title">Popular Post</h3>
      <ul className="popular-blog-lists vertical-scroll list-unstyled">
        {data.map((listgroupData, index) => {
          return (
            <li key={index}>
                <Link
                  href={`${blogUrl}${listgroupData.title.replace(/ /g, "-")}`}
                >
                  <a className="d-flex">
                    <span className="popular-blog-lists__img-box">
                      <DynamicImage
                        src={listgroupData.image}
                        alt={listgroupData.title}
                        className="w-100"
                      />
                    </span>
                    <span className="popular-blog-lists__content">
                      <span className="popular-blog-lists__title d-block mb-3">{listgroupData.title}</span>
                      <span className="popular-blog-lists__date">August 17, 2018</span>
                    </span>
                  </a>
                </Link>
              </li>
            );
          })}
        </ul>
    </div>
  );
};

export default ListGroupBlog;
