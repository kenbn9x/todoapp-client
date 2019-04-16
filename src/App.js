import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography} from '@material-ui/core';
import { BrowserRouter as Router, Route } from "react-router-dom";
import ProjectList from './components/project/list/List';
import ProjectForm from './components/project/form/Form';

import TaskList from './components/task/list/List';

import './App.css';

const styles = {
  root: {
    flexGrow: 1,
  },
};

class App extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" color="inherit">
            Tasksman
          </Typography>
        </Toolbar>
      </AppBar>
      <Router>
        <Route exact path="/" component={ProjectList} />
        <Route exact path="/add-project" component={ProjectForm} />

        <Route exact path="/list-task/:projectId" component={TaskList} />
      </Router>
    </div>
    );
  }
}

export default withStyles(styles)(App);
