import React from 'react';

import ReviewerInfo from './ReviewerInfo.jsx';
import ReviewText from './ReviewText.jsx';
import Stars from './Stars.jsx';

function Review(props) {
  return (
    <li>
      <Stars stars={props.review.stars}/>
      <ReviewerInfo username={props.review.User.username}/>
      <ReviewText text={props.review.text}/>
    </li>
  );
}

export default Review;