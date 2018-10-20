import React from 'react';
import $ from 'jquery';

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.formatData = this.formatData.bind(this);
  }

  submit() {
    const review = this.formatData();
    $.ajax({
      url: `http://localhost:3000/api/items/${this.props.itemID}`,
      method: 'POST',
      data: JSON.stringify(review),
      contentType: 'application/json',
      dataType: 'JSON',
      success: (data) => {
        console.log(data, 'success'); // need something to reload the page or component to show new review
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  formatData() {
    let stars = Math.floor($('#new-review-stars').val());
    if (stars > 5) {
      stars = 5;
    }
    if (stars < 1) {
      stars = 1;
    };

    const review = {
      user_id: this.props.userID,
      stars: stars,
      text: $('#new-review-text').val(),
    };

    return review;
  }

  render() {
    return (
      <div>
        <div>Stars: <input type="number" id="new-review-stars"></input></div>
        <div>Review: <textarea id="new-review-text"></textarea></div>
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default SubmissionForm;