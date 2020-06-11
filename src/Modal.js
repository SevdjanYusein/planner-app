import React, { Component } from "react";

import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Button } from 'react-materialize';
import MaterialIcon from 'material-icons-react';

import Firebase from "firebase";

class Modal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    this.getUserData();

    const options = {
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%"
    };

    M.Modal.init(this.Modal, options);
  }

  handleSubmit = event => {
    event.preventDefault();
    let noteTitle = this.refs.noteTitle.value;
    let description = this.refs.description.value;

    if (noteTitle && description) {
      const uid = new Date().getTime().toString();
      const { notes } = this.state;
      notes.push({ uid, noteTitle, description });
      this.setState({ notes });
      this.writeUserData();
    }

    this.refs.noteTitle.value = "";
    this.refs.description.value = "";
    this.refs.uid.value = "";
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  render() {
    return (
      <div>
        {/* <div className="modal-button-possition"> */}
          <a className="btn-floating btn-large red lighten-3 waves-effect waves-light modal-trigger modal-button-possition"
            data-target="modal1"
            href="/"
          >
            <MaterialIcon icon="note_add" />
          </a>
        {/* </div> */}

        <div
          ref={Modal => {
            this.Modal = Modal;
          }}
          id="modal1"
          className="modal"
        >
          {/* If you want Bottom Sheet Modal then add 
          bottom-sheet class to the "modal" div
          If you want Fixed Footer Modal then add
          modal-fixed-footer to the "modal" div*/}
          <div className="modal-content">
            <h4>Add new note</h4>
            <form onSubmit={this.handleSubmit}>
              <div className="form-row">
                <input type="hidden" ref="uid" />
                <div className="input-field col-md-6">
                  <input id="noteTitle"
                    type="text"
                    ref="noteTitle"
                    className="validate"
                  />
                  <label htmlFor="noteTitle">Title</label>
                </div>
                <div className="input-field col-md-6">
                  <input id="description"
                    type="text"
                    ref="description"
                    className="validate"
                  />
                  <label htmlFor="description">Description</label>
                </div>
              </div>
              <div className="modal-footer">
                <Button type="submit"
                  className="modal-close button-margin"
                  waves="green"
                  onClick={this.handleSubmit}
                >
                  Save
                </Button>
                <Button className="modal-close red lighten-2"
                  waves="red"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Modal;
