import PropTypes from "prop-types";
import Image from "next/image";

const CustomImage = ({ image, image_alt, ...other }) => {
  if (!image || !image.url) return null;

  const cleanTitle =
    (image.title &&
      image.title
        .replace(/.pdf|.svg|.png|.jpg|.jpeg|.gif|.bmp|.apng/gi, "")
        .replace(/@2x|_|-/gi, " ")
        .trim()) ||
    "";
  const altText = image_alt || image.description || cleanTitle || "";

  return <Image src={"aaaa"} alt={altText} {...other} />;
};

CustomImage.defaultProps = {
  image_alt: "",
  image: {
    url: "",
  },
};

CustomImage.propTypes = {
  image: PropTypes.objectOf(
    PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object,
      PropTypes.array,
      PropTypes.bool,
      PropTypes.number,
    ])
  ),
  image_alt: PropTypes.string,
};

export default CustomImage;
