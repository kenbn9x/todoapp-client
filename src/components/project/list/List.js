import React, { Component } from 'react';

import { API_ADDRESS } from '../../../constants/AppConfig';
import axios from 'axios';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import {Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button } from '@material-ui/core';
import Main from '../../layouts/Main';
import 'font-awesome/css/font-awesome.min.css';
import './List.css';

const styles = theme => ({
  root: {
    // height: 240,
    // background: "#f00",
    // marginTop: 15,
    [theme.breakpoints.up("lg")]: {
      width: 1170
    },
    [theme.breakpoints.up("sm")]: {
      width: 320
    }
  }
});

class ProjectList extends Component {
  constructor() {
    super();
    this.state = {
      listProjects: []
    };
  }
  componentDidMount() {
    this.getProjects();
  }

  handleMarkProject(id) {
    return () => {
      axios({
        method: 'put',
        url: `${API_ADDRESS}/project/mark/${id}`,
      }).then((res) => {
        ToastsStore.success(res['data']['message']);
        this.getProjects();
      }).catch(function (error) {
        console.log(error);
        ToastsStore.error('Error!');
      });
    }
  }

  getProjects() {
    axios({
      method: 'get',
      url: `${API_ADDRESS}/project/index`,
    }).then((res) => {
      this.setState({ listProjects: res['data']['data'] });
    }).catch(function (error) {
      console.log(error);
      ToastsStore.error('Error!');
    });
  }
  render() {
    const { listProjects } = this.state;
    const { classes } = this.props;
    return (
      <Main title="List Project">
        <Link to={`/add-project`} className="link" >
          <Button variant="contained" color="primary" className={`${classes.button} add-btn`}>
            Add New Project
      </Button>
        </Link>
        <List className={classes.root}>
          {listProjects.map((project, idx) => (

            <ListItem key={idx} dense button>
              <Link to={`/list-task/${project.id}`} >
                <ListItemText primary={project.name} />
              </Link>
              <ListItemSecondaryAction>
              <Button variant="contained" color="primary" className={`${classes.button} add-btn`} onClick={this.handleMarkProject(project.id)}>
                  <i className={project.is_completed ? 'fa fa-check-circle' : 'fa fa-question'} />
                </Button>
              </ListItemSecondaryAction>
            </ListItem>

          ))}
        </List>
        <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
      </Main>
    );
  }
}

export default withStyles(styles)(ProjectList);