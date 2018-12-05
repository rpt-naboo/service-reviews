import React from 'react';
import $ from 'jquery';
import styled from 'styled-components';

import Review from './Review.jsx';

const ReviewList = styled.ul`
  list-style-type: none;
`;

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [],
    }
  }

  componentDidMount() {
    $.ajax({
      url: `/api/items/${this.props.itemID}/${this.props.page}`,
      method: 'GET',
      dataType: 'JSON',
      success: (data) => {
        this.setState({ reviews: data });
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  componentDidUpdate(previousProps) {
    if (previousProps.page !== this.props.page) {
      $.ajax({
        url: `/api/items/${this.props.itemID}/${this.props.page}`,
        method: 'GET',
        dataType: 'JSON',
        success: (data) => {
          this.setState({ reviews: data });
        },
        error: (err) => {
          console.error(err);
        },
      });
    }
  }

  render() {
    const reviews = this.state.reviews.map((review) =>
      <Review key={review.id || review._id} review={review}/>
    );
    return (
      <div>
        <ReviewList>
          {reviews}
        </ReviewList>
        Page {this.props.page}
      </div>
    );
  }
}

export default Page;