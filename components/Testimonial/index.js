import { Card } from 'react-bootstrap';
import ReactStars from 'react-rating-stars-component';
import PropTypes from 'prop-types';

import styles from './index.module.scss';

function Testimonial({data}){
  const {guest_name, star_rating, testimonials} = data || {};
    return (
      <>
        <Card className="card card--testimonial">
          <span className="card-img-top"></span>
          <Card.Body>
            <div className="d-flex justify-content-center">
              <ReactStars
                size={20}
                value={parseInt(star_rating)}
                count={5}
                isHalf={true}
                color="#ffffff"
                activeColor="#eaad4d"
                edit={false}
              />
            </div>
            <Card.Title className="text-primary" dangerouslySetInnerHTML={{__html: testimonials}} />
          </Card.Body>
          <Card.Footer>{guest_name}</Card.Footer>
        </Card>
      </>
    );
}

Testimonial.propTypes = {
    name: PropTypes.string,
    rating: PropTypes.number,
    comment: PropTypes.string
};

Testimonial.defaultProps = {
    name: "",
    rating: 0,
    comment: ""
};

export default Testimonial;
