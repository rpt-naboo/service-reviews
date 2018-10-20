import React from 'react';

function PageButtons(props) {
  return (
    <div>
      <button onClick={props.decrementPage}>&larr; Previous Page</button>
      <button onClick={props.incrementPage}>Next Page &rarr;</button>
    </div>
  );
}

export default PageButtons;