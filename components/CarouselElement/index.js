import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';

const DynamicImage = dynamic(() => import("../custom-image"), <div>...loading</div>);

function CustomImageCarousel({ imgData }) {
  if(!imgData) return null;
  return (
    <>
     {
      imgData?.backgroundImage &&  // desktop
        <DynamicImage
          src={imgData.backgroundImage}
          className="w-100 d-none d-sm-block"
          alt={imgData?.altText}
        />
      }
      {
        imgData?.mobileImage && // mobile
          <DynamicImage
            src={imgData?.mobileImage}
            className="w-100 d-block d-sm-none"
            alt={imgData?.mobAltText}
          />
        }
    </>
  );
}

CustomImageCarousel.defaultProps = {
  imgSrc: {}
};


CustomImageCarousel.propTypes = {
  imgSrc: PropTypes.object
};

export default CustomImageCarousel;
