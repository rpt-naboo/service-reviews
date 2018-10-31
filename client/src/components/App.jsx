import React from 'react';

import Page from './Page.jsx';
import PageButtons from './PageButtons.jsx';
import SubmissionForm from './SubmissionForm.jsx';
import Overview from './Overview.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: props.userID,
      itemID: props.itemID,
      totalPages: 0,
      page: 1,
    };
    this.incrementPage = this.incrementPage.bind(this);
    this.decrementPage = this.decrementPage.bind(this);
    this.setPageCount = this.setPageCount.bind(this);
  }

  incrementPage() {
    if (this.state.page < this.state.totalPages) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  decrementPage() {
    if (this.state.page > 1) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  setPageCount(reviews) {
    this.setState({ totalPages: Math.ceil(reviews / 10) });
  }

  render() {
    return (
      <div>
        <Overview itemID={this.state.itemID} setPageCount={this.setPageCount} />
        <Page page={this.state.page} itemID={this.state.itemID} />
        <PageButtons incrementPage={this.incrementPage} decrementPage={this.decrementPage} />
        <SubmissionForm itemID={this.state.itemID} userID={this.state.userID} />
      </div>
    );
  }
}

export default App;