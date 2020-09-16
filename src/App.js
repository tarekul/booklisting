import React from "react";
import Axios from "axios";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Book from "./components/book";
import Blueprint from "./components/blueprint";

const styles = () => ({
  contain: {
    textAlign: "center",
  },
  input: {
    marginRight: "1rem",
  },
  list: {
    display: "flex",
    flexFlow: "row wrap",
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      results: null,
      loading: false,
    };
  }

  componentDidMount() {}
  handleChange(e) {
    this.setState({ term: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { term } = this.state;
    const apiUrl = `https://goodreads-server-express--dotdash.repl.co/search/${term}`;
    this.setState({ loading: true });
    Axios.get(apiUrl).then((res) => {
      this.setState({ results: res.data.list });
      this.setState({ loading: false, term: "" });
    });
  }
  listing() {
    const { results } = this.state;
    if (results)
      return results.map((info, i) => {
        return <Book info={info} key={i} />;
      });
  }

  render() {
    const { classes } = this.props;
    const { term, loading } = this.state;
    return (
      <Container className={classes.contain} maxWidth="lg">
        <Typography variant="h2">Good Reads</Typography>
        <Typography variant="body1">
          Search and find books that you love
        </Typography>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <TextField
            id="outlined-basic"
            label="search titles"
            variant="outlined"
            size="small"
            autoComplete="off"
            className={classes.input}
            onChange={(e) => this.handleChange(e)}
            value={term}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={(e) => this.handleSubmit(e)}
          >
            search
          </Button>
        </form>

        <div className={classes.list}>
          {loading ? <Blueprint /> : this.listing()}
        </div>
      </Container>
    );
  }
}

export default withStyles(styles)(App);
