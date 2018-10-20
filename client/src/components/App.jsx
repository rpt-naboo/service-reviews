import React from 'react';
import $ from 'jquery';

import Page from './Page.jsx';
import PageButtons from './PageButtons.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: props.itemID,
      page: 1,
    }
  }

  render() {
    return (
      <div>
        <Page page={this.state.page} />
        <PageButtons />
      </div>
    );
  }
}

export default App;