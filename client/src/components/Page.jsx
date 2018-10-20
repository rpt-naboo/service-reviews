import React from 'react';

import Review from './Review.jsx';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [{id: 0}, {id: 1}, {id: 2}],
    }
  }

  componentDidMount() {
    // get reviews for item page
  }

  componentDidUpdate() {
    // get reviews for item page
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