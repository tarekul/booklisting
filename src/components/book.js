import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export default class Book extends Component {
  render() {
    const {
      info: { authorName, imageUrl, title },
    } = this.props;
    return (
      <Card
        style={{
          margin: "0.5rem",
          width: "390px",
          backgroundColor: "cadetblue",
        }}
      >
        <CardContent>
          <Typography variant="body1">{title}</Typography>
          <Typography variant="body2">{authorName}</Typography>
        </CardContent>
        <img src={imageUrl} alt="pic" />
      </Card>
    );
  }
}
