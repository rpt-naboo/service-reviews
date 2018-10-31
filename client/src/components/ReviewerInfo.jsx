import React from 'react';
import styled from 'styled-components';

const ReviewerWrapper = styled.li`
  font-style: italic;
`;

function ReviewerInfo(props) {
  return (
    <ReviewerWrapper>{props.username}</ReviewerWrapper>
  );
}

export default ReviewerInfo;