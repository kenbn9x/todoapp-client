import React, { Component } from 'react';

import './Main.css';

class Main extends Component {
  constructor() {
    super();
  }
  render() {
    const { children, title } = this.props;
    return (
      <div className="main">
        <div className="title">
          {title}
        </div>
        {children}
      </div>
    );
  }
}

export default (Main);