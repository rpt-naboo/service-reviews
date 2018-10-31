import React from 'react';
import styled from 'styled-components';

const ButtonWrapper = styled.div`
  margin-bottom: 10px;
`;

function PageButtons(props) {
  return (
    <ButtonWrapper>
      <button onClick={props.decrementPage}>&larr; Previous Page</button>
      <button onClick={props.incrementPage}>Next Page &rarr;</button>
    </ButtonWrapper>
  );
}

export default PageButtons;