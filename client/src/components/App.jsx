import React from 'react';

import Page from './Page.jsx';
import PageButtons from './PageButtons.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      itemID: props.itemID,
      page: 1,
    };
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
  }

  incrementPage() {
    this.setState({ page: this.state.page + 1 })
  }

  decrementPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 })
    }
  }

  render() {
    return (
      <div>
        <Page page={this.state.page} itemID={this.state.itemID} />
        <PageButtons incrementPage={this.incrementPage} decrementPage={this.decrementPage}/>
      </div>
    );
  }
}

export default App;