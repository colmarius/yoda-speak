import React, { Component } from 'react';
import { deepOrange500 } from 'material-ui/styles/colors';
import {
  getMuiTheme,
  MuiThemeProvider
} from 'material-ui/styles';
import {
  Dialog,
  FlatButton,
  RaisedButton,
  TextField,
} from 'material-ui';
import { yodaTranslate } from './client'

const styles = {
  container: {
    textAlign: 'center',
    paddingTop: 200,
  },
};

const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

class Main extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      open: false,
      userText: null,
      yodaText: null,
    };
  }

  handleTextChange = (evt) => {
    const text = evt.target.value;
    const userTextError = text ? null : 'Missing, something is.';

    this.setState({
      userText: text,
      userTextError,
    })
  }

  handleRequestClose = () => {
    this.setState({
      open: false,
    });
  }

  handleTouchTap = () => {
    if (this.validate()) return

    yodaTranslate(this.state.userText, (translated) => {
      this.setState({
        open: true,
        yodaText: translated,
      });
    })
  }

  validate = () => {
    if (this.state.userTextError) return true;
    return false;
  }

  render() {
    const standardActions = (
      <FlatButton
        label="Ok"
        primary={true}
        onTouchTap={this.handleRequestClose}
      />
    );

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div style={styles.container}>
          <Dialog
            open={ this.state.open }
            title="Your answer from Yoda"
            actions={standardActions}
            onRequestClose={this.handleRequestClose}
          >
            { this.state.yodaText }
          </Dialog>
          <h1>Yoda Speak</h1>
          <h2>Me anything my son ask.  Reply at once, will I.</h2>
          <TextField
            hintText="Some text"
            floatingLabelText="Like Yoda speak."
            multiLine={ true }
            onChange={ this.handleTextChange }
            style={{textAlign: 'left'}}
            errorText={ this.state.userTextError }
          />
          <br/>
          <RaisedButton
            label="Ask me son"
            secondary={true}
            onTouchTap={ this.handleTouchTap }
            disabled={ this.state.userTextError ? true : false }
          />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
