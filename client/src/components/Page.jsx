import React from 'react';
import $ from 'jquery';

import Review from './Review.jsx';

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
      <Review key={review.id} review={review}/>
    );
    return (
      <div>
        <ul>
          {reviews}
        </ul>
        Page {this.props.page}
      </div>
    );
  }
}

export default Page;