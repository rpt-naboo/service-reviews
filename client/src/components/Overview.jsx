import React from 'react';
import $ from 'jquery';

class Overview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      totalReviews: 0,
      averageScore: null,
    }
  }

  componentDidMount() {
    $.ajax({
      url: `/api/items/${this.props.itemID}/stats`,
      method: 'GET',
      dataType: 'JSON',
      success: (data) => {
        this.setState({
          totalReviews: data.totalReviews,
          averageScore: data.averageScore,
        });
        this.props.setPageCount(data.totalReviews);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  render() {
    return (
      <div>
        <p>This product has received an average rating of {this.state.averageScore} from {this.state.totalReviews} users.</p>
      </div>
    );
  }
}

export default Overview;