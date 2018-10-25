import React from 'react';
import $ from 'jquery';

class SubmissionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stars: 0,
      text: '',
    };
    this.submit = this.submit.bind(this);
    this.formatData = this.formatData.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  submit() {
    const review = this.formatData();
    $.ajax({
      url: `/api/items/${this.props.itemID}`,
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
    let stars = Math.floor(this.state.stars);
    if (stars > 5) {
      stars = 5;
    }
    if (stars < 1) {
      stars = 1;
    };

    const review = {
      user_id: this.props.userID,
      stars: stars,
      text: this.state.text,
    };

    return review;
  }

  handleChange(event) {
    const key = event.target.name;
    const value = event.target.value;
    this.setState({ [key]: value });
  }

  render() {
    return (
      <div>
        <div>Stars: <input name="stars" type="number" onChange={this.handleChange}></input></div>
        <div>Review: <textarea name="text" onChange={this.handleChange}></textarea></div>
        <button onClick={this.submit}>Submit</button>
      </div>
    );
  }
}

export default SubmissionForm;