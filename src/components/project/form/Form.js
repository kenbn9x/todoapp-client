import React, { Component } from 'react';

import { API_ADDRESS } from '../../../constants/AppConfig';
import axios from 'axios';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

import { Grid, Card, CardContent, CardActions, Button, TextField } from '@material-ui/core';

import Main from '../../layouts/Main';

class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(nameInput) {
    return event => {
      this.setState({
        [nameInput]: typeof event.target.value === 'string' ? event.target.value.replace(/</g, '').replace(/>/g, '') : event.target.value
      });
    }
  }

  handleSubmit() {
    const { name, description } = this.state;
    if (name && description) {
      axios({
        method: 'post',
        url: `${API_ADDRESS}/project/add`,
        data: {
          name: this.state.name,
          description: this.state.description
        }
      }).then((res) => {
        ToastsStore.success(res['data']['message']);
        return this.props.history.push({
          pathname: '/',
        });
      }).catch(function (error) {
        console.log(error);
        ToastsStore.error('Error!');
      });
    } else {
      ToastsStore.warning('Fields * is required');
    }
  }

  render() {
    return (
      <Main title="Add new Project">
        <Card className="wrap-card">
          <CardContent>
            <Grid className="wrap-form" container spacing={40}>
              <form noValidate autoComplete="off">
                <Grid item xs={12}>
                  <TextField
                    id="outlined-name"
                    label="Project Name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange('name')}
                    margin="normal"
                    variant="outlined"
                    fullWidth
                    required
                    inputProps={{
                      maxLength: 255,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="outlined-description-input"
                    label="Project Description"
                    type="text"
                    value={this.state.description}
                    onChange={this.handleChange('description')}
                    margin="normal"
                    multiline
                    rows="5"
                    variant="outlined"
                    fullWidth
                    required
                    inputProps={{
                      maxLength: 255,
                    }}
                  />
                </Grid>
              </form>
            </Grid>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={this.handleSubmit}>Save</Button>
          </CardActions>
        </Card>
        <ToastsContainer position={ToastsContainerPosition.BOTTOM_CENTER} store={ToastsStore} />
      </Main>
    );
  }
}

export default (ProjectForm);