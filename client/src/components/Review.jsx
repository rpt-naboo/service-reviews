import React from 'react';
import styled from 'styled-components';

import ReviewerInfo from './ReviewerInfo.jsx';
import ReviewText from './ReviewText.jsx';
import Stars from './Stars.jsx';

const ReviewWrapper = styled.li`
  margin-bottom: 10px;
`;

function Review(props) {
  return (
    <ReviewWrapper>
      <Stars stars={props.review.stars}/>
      <ReviewerInfo username={props.review.User.username}/>
      <ReviewText text={props.review.text}/>
    </ReviewWrapper>
  );
}

export default Review;