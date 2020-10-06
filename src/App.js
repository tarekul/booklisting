import React from "react";
import Axios from "axios";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import Book from "./components/book";
import Blueprint from "./components/blueprint";
import Alert from "@material-ui/lab/Alert";
import Pagination from "@material-ui/lab/Pagination";

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
  alertCenter: {
    margin: "10px auto",
  },
  ul: {
    "& > *": {
      justifyContent: "center",
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: "",
      results: null,
      pages: 0,
      page: 1,
      loading: false,
      error: false,
    };
  }

  handleChange(e) {
    this.setState({ term: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    const { term } = this.state;
    const apiUrl = `https://goodreads-server-express--dotdash.repl.co/search/${term}`;
    this.setState({ loading: true });
    Axios.get(apiUrl)
      .then((res) => {
        console.log(res.data.list.length);
        this.setState({
          results: res.data.list,
          pages: Math.ceil(res.data.list.length / 6),
        });
        this.setState({ loading: false, term: "" });
      })
      .catch((err) => {
        console.error(err);
        this.setState({ loading: false, term: "", error: true });
      });
  }
  listing() {
    const { classes } = this.props;
    const { results, page, error } = this.state;
    if (error) {
      return (
        <Alert className={classes.alertCenter} severity="error">
          No books found
        </Alert>
      );
    } else if (results) {
      const show = results.slice(6 * (page - 1), 6 * page);
      return show.map((info, i) => {
        return <Book info={info} key={i} />;
      });
    }
  }

  handlePage(e) {
    console.log(e.target.innerText);
    this.setState({ page: e.target.innerText });
  }

  render() {
    const { classes } = this.props;
    const { term, loading, pages, error, results } = this.state;
    return (
      <Container className={classes.contain} maxWidth="lg">
        <h1>Good Reads</h1>
        <p>Search and find books that you love</p>
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
        {!error && results ? (
          <Pagination
            className={classes.ul}
            count={pages}
            shape="rounded"
            onChange={(e) => this.handlePage(e)}
          />
        ) : null}
      </Container>
    );
  }
}

export default withStyles(styles)(App);
