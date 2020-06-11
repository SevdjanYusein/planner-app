import React from "react";

import Firebase from "firebase";
import firebaseConfig from "./firebaseConfig";

import { Button, Checkbox } from 'react-materialize';
import MaterialIcon from 'material-icons-react';

import Modal from "./Modal";
import Sidenav from "./Sidenav";

class App extends React.Component {
  constructor(props) {
    super(props);
    Firebase.initializeApp(firebaseConfig);

    this.state = {
      notes: []
    };
  }

  componentDidMount() {
    this.getUserData();
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState !== this.state) {
      this.writeUserData();
    }
  }

  writeUserData = () => {
    Firebase.database()
      .ref("/")
      .set(this.state);
    console.log("DATA SAVED");
  };

  getUserData = () => {
    let ref = Firebase.database().ref("/");
    ref.on("value", snapshot => {
      const state = snapshot.val();
      this.setState(state);
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    let noteTitle = this.refs.noteTitle.value;
    let description = this.refs.description.value;
    let uid = this.refs.uid.value;

    if (uid && noteTitle && description) {
      const { notes } = this.state;
      const devIndex = notes.findIndex(data => {
        return data.uid === uid;
      });
      notes[devIndex].noteTitle = noteTitle;
      notes[devIndex].description = description;
      this.setState({ notes });
    } else if (noteTitle && description) {
      const uid = new Date().getTime().toString();
      const { notes } = this.state;
      notes.push({ uid, noteTitle, description });
      this.setState({ notes });
    }

    this.refs.noteTitle.value = "";
    this.refs.description.value = "";
    this.refs.uid.value = "";
  };

  removeData = note => {
    const { notes } = this.state;
    const newState = notes.filter(data => {
      return data.uid !== note.uid;
    });
    this.setState({ notes: newState });
  };

  updateData = note => {
    this.refs.uid.value = note.uid;
    this.refs.noteTitle.value = note.noteTitle;
    this.refs.description.value = note.description;
  };

  render() {
    const { notes } = this.state;

    return (
      <React.Fragment>
        <Sidenav />
        <div className="container" style={{ marginLeft: "350px" }}>
          <h1>Task Planner</h1>
          <div className="row">
            <div className="card card-styles">
              <div className="card-content p-0 pb-1">
                <div className="todo-header">
                  <div className="header-checkbox">
                    <Checkbox type="checkbox" label="" value="" />
                  </div>
                  <div className="list-content"></div>
                </div>
                {notes.map(note => (
                  <div
                    key={note.uid}
                    className="collection"
                  >
                    <div>
                      <p className="card-title">{note.noteTitle}</p>
                      <p className="card-text">{note.description}</p>
                      <div
                        onClick={() => this.removeData(note)}
                        className="btn-flat button-margin"
                      >
                        <MaterialIcon icon="delete" />
                      </div>
                      <div className="btn-flat" waves="red-light"
                        onClick={() => this.updateData(note)}
                      >
                        <MaterialIcon icon="edit" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Modal />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default App;
