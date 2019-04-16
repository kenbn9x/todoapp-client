import React, { Component } from 'react';

import { API_ADDRESS } from '../../../constants/AppConfig';
import axios from 'axios';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import { withStyles } from '@material-ui/core/styles';
import { List, ListItem, ListItemText, ListItemSecondaryAction, Button, Typography, TextField, Grid } from '@material-ui/core';
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

class TaskList extends Component {
  constructor() {
    super();
    this.state = {
      projectName: '',
      projectDes: '',
      listTasks: [],
      title: '',
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    axios({
      method: 'get',
      url: `${API_ADDRESS}/task/getTasksByProject/${this.props.match.params['projectId']}`,
    }).then((res) => {
      this.setState({
        listTasks: res['data']['data']['tasks'],
        projectName: res['data']['data']['project']['name'],
        projectDes: res['data']['data']['project']['description']
      });
    }).catch(function (error) {
      console.log(error);
      ToastsStore.error('Error!');
    });
  }

  handleChange() {
    return event => {
      console.log(event.target.value);
      this.setState({
        title: typeof event.target.value === 'string' ? event.target.value.replace(/</g, '').replace(/>/g, '') : event.target.value
      });
    }
  }

  handleSubmit() {
    const { title } = this.state;
    if (title) {
      axios({
        method: 'post',
        url: `${API_ADDRESS}/task/add`,
        data: {
          title: this.state.title,
          project_id: this.props.match.params['projectId']
        }
      }).then((res) => {
        ToastsStore.success(res['data']['message']);
        this.setState({ title: '' });
        this.getTasks();
      }).catch(function (error) {
        console.log(error);
        ToastsStore.error('Error!');
      });
    } else {
      ToastsStore.warning('Fields * is required');
    }
  }

  handleMarkTask(id) {
    return () => {
      axios({
        method: 'put',
        url: `${API_ADDRESS}/task/mark/${id}`,
      }).then((res) => {
        ToastsStore.success(res['data']['message']);
        this.getTasks();
      }).catch(function (error) {
        console.log(error);
        ToastsStore.error('Error!');
      });
    }
  }

  handleMarkProject = () => {
      axios({
        method: 'put',
        url: `${API_ADDRESS}/project/mark/${this.props.match.params['projectId']}`,
      }).then((res) => {
        ToastsStore.success(res['data']['message']);
        this.getTasks();
      }).catch(function (error) {
        console.log(error);
        ToastsStore.error('Error!');
      });
  }


  render() {
    const { projectDes, projectName, listTasks } = this.state;
    const { classes } = this.props;
    return (
      <Main title={projectName}>
        <Typography gutterBottom noWrap>{projectDes}</Typography>
        <Button variant="contained" color="primary" className={`${classes.button} add-btn`} onClick={this.handleMarkProject}>
          Mark as completed Project
      </Button>
        <Grid item xs={12}>
          <TextField
            id="outlined-name"
            label="Title Task"
            type="text"
            value={this.state.title}
            onChange={this.handleChange('title')}
            margin="normal"
            variant="outlined"
            fullWidth
            required
            inputProps={{
              maxLength: 255,
            }}
          />
          <Button variant="contained" color="primary" className={`${classes.button} add-btn`} onClick={this.handleSubmit}>
            Add Task
      </Button>
        </Grid>
        <List className={classes.root}>
          {listTasks.map((task, idx) => (
            <ListItem key={idx} dense button className="task-item">
              <ListItemText primary={task.title} />
              <ListItemSecondaryAction>
                <Button variant="contained" color="primary" className={`${classes.button} add-btn`} onClick={this.handleMarkTask(task.id)}>
                  <i className={task.is_completed ? 'fa fa-check-circle' : 'fa fa-question'} />
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

export default withStyles(styles)(TaskList);