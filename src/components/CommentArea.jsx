import { Component } from "react";
import CommentsList from "./CommentsList";
import { Form, InputGroup, FormControl, Button, Alert } from "react-bootstrap";

class CommentArea extends Component {
  state = {
    comments: [],
    error: false,
    newComment: {
      comment: "",
      rate: "3",
      elementId: this.props.movieId,
    },
  };

  componentDidUpdate = (prevProps) => {
    if (prevProps.movieId !== this.props.movieId) {
      this.setState(
        {
          newComment: {
            ...this.state.newComment,
            elementId: this.props.movieId,
          },
        },
        async () => {
          try {
            let response = await fetch(
              "https://striveschool-api.herokuapp.com/api/comments/" +
              this.props.movieId,
              {
                headers: {
                  Authorization:
                    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZhNjY0ZTgyZWExZDAwMTViYjAzZWMiLCJpYXQiOjE2NDQ4NDQ3NjcsImV4cCI6MTY0NjA1NDM2N30.CQYFhS63KiJkhKeofDb51p2dfzSam4dCH8rml61wZKE',
                },
              }
            );
            if (response.ok) {
              let comments = await response.json();
              this.setState({
                comments: comments,
                error: false,
              });
            } else {
              console.log("error");
              this.setState({ error: true });
            }
          } catch (error) {
            console.log(error);
            this.setState({ error: true });
          }
        }
      );
    }
  };

  submitComment = async (e) => {
    e.preventDefault();
    const COMMENTS_URL = "https://striveschool-api.herokuapp.com/api/comments/";
    try {
      const response = await fetch(COMMENTS_URL, {
        method: "POST",
        body: JSON.stringify(this.state.newComment),
        headers: {
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MWZhNjY0ZTgyZWExZDAwMTViYjAzZWMiLCJpYXQiOjE2NDQ4NDQ3NjcsImV4cCI6MTY0NjA1NDM2N30.CQYFhS63KiJkhKeofDb51p2dfzSam4dCH8rml61wZKE',
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        alert("Comment added");
        this.setState({
          newComment: {
            comment: "",
            rate: 0,
            elementId: this.props.movieId,
          },
        });
      } else {
        alert("An error has occurred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleRadioChange = (rating) => {
    let newComment = this.state.newComment;
    newComment.rate = rating;
    this.setState({ newComment });
  };

  handleCommentText = (e) => {
    let newComment = this.state.newComment;
    newComment.comment = e.currentTarget.value;
    this.setState({ newComment });
  };

  render() {
    return (
      <div className="my-3">
        {this.state.error && (
          <Alert variant="danger" className="text-center">
            Error fetching comments
          </Alert>
        )}
        {this.state.comments.length > 0 &&
          this.state.comments[0].elementId === this.props.movieId && (
            <CommentsList comments={this.state.comments} />
          )}
        <div className="text-center text-light">
          <h5 className="my-3">Add a comment</h5>
          <Form onSubmit={this.submitComment}>
            <div className="my-3 text-center">
              <Form.Check
                inline
                label="1"
                value="1"
                type="radio"
                name="rating"
                defaultChecked={this.state.newComment.rate === "1"}
                onClick={() => this.handleRadioChange("1")}
              />
              <Form.Check
                inline
                label="2"
                value="2"
                type="radio"
                name="rating"
                defaultChecked={this.state.newComment.rate === "2"}
                onClick={() => this.handleRadioChange("2")}
              />
              <Form.Check
                inline
                label="3"
                value="3"
                type="radio"
                name="rating"
                defaultChecked={this.state.newComment.rate === "3"}
                onClick={() => this.handleRadioChange("3")}
              />
              <Form.Check
                inline
                label="4"
                value="4"
                type="radio"
                name="rating"
                defaultChecked={this.state.newComment.rate === "4"}
                onClick={() => this.handleRadioChange("4")}
              />
              <Form.Check
                inline
                label="5"
                value="5"
                type="radio"
                name="rating"
                defaultChecked={this.state.newComment.rate === "5"}
                onClick={() => this.handleRadioChange("5")}
              />
            </div>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Write your comment"
                aria-label="comment"
                aria-describedby="basic-addon1"
                onChange={this.handleCommentText}
                value={this.state.newComment.comment}
                required
              />
            </InputGroup>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

export default CommentArea;
