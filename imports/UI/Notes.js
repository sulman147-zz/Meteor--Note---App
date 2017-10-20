import React from 'react';
import Modal from 'react-modal';
import Editor from './Editor';
import NoteList from './NoteList';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
  }

  handelModelClose() {
    this.setState({isOpen: false});
  }
  render() {
    return (
      <div >
        <button className="button" onClick={() => this.setState({isOpen: true})}>+ Add Notes</button>
        <Modal isOpen={this.state.isOpen}
          contentLabel="Add link"
          onRequestClose={this.handelModelClose.bind(this)}
          className=" note-box-view"
          overlayClassName="boxed-view boxed-view__modal">


          <h1>YOUR NOTES</h1>
          <div className="Note-content">

            <div className="page-content__main">
              <NoteList/>
            </div>
            <div className="page-content__sidebar">
              <Editor/>
            </div>
          </div>

        </Modal>
      </div>
    );
  }
}
