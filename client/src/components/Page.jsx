import React from 'react';

import Review from './Review.jsx';

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: [
      { User: {username: 'Tito61'}, createdAt: "2018-10-19T00:09:42.000Z", id: 1, item_id: 1, stars: 4, text: "Et et omnis odit maiores eaque iusto. Amet non non. Ipsam laborum maiores et ut ut nemo est aliquam.", updatedAt: "2018-10-19T00:09:42.000Z", user_id: 3 },
      { User: {username: 'Tito61'}, createdAt: "2018-10-19T00:09:42.000Z", id: 2, item_id: 1, stars: 4, text: "Et et omnis odit maiores eaque iusto. Amet non non. Ipsam laborum maiores et ut ut nemo est aliquam.", updatedAt: "2018-10-19T00:09:42.000Z", user_id: 3 }],
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