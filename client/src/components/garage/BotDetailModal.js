import React, { Component } from 'react';
import Modal from 'react-modal';

export default class DetailModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      nameIsEditing: false,
      itemEdited: {
        name: ""
      }
    }
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  render() {
    const { bot } = this.props;
    const { itemEdited, nameIsEditing } = this.state;
    return(
      <Modal
        isOpen={this.props.isOpen}
        onRequestClose={this.props.onRequestClose}
        title="Bot's detail"
        description="Botの情報。名前やURLを修正できます。"
        className="modal bot-detail-modal"
        closeTimeoutMS={350}
        overlayClassName="modal-overlay"
      >
        <div className="modal-header">
          <h3>BOT DETAIL</h3>
          <p>This is your bot's detail.</p>
        </div>
        <div className="modal-content">
          <table className="u-full-width">
            <tbody>
              <tr>
                <th>Name</th>
                <td>{nameIsEditing ?
                  <input name="name" type="text" value={itemEdited.name} onChange={this.handleChange}/>
                  : bot.name}
                </td>
                <td>{nameIsEditing ? <a onClick={() => this.toggleEdit('nameIsEditing')}>Cansel</a> : <i onClick={() => this.toggleEdit('nameIsEditing')} className="material-icons edit-icon">mode_edit</i> }</td>
              </tr>
              <tr>
                <th>GameName</th>
                <td>{bot.gameName}</td>
              </tr>
              {/* <tr>
                <th>isPrivate</th>
                {privateIsEditing ?
                  <td>
                    <input type="radio" name="isPrivate" value="private"/>　Private　
                    <input type="radio" name="isPrivate" value="public"/>　Public
                  </td>
                  : <td>{bot.isPrivate ? "Private" : "Public"}</td>
                }
                <td>{privateIsEditing ? "" : <i onClick={() => this.toggleEdit('privateIsEditing')} className="material-icons edit-icon">mode_edit</i>}</td>
              </tr> */}
              <tr>
                <th>URL</th>
                <td>{bot.resourceUrl}</td>
              </tr>
              <tr>
                <th>Runtime</th>
                <td>{bot.runtime}</td>
              </tr>
              <tr>
                <th>GameName</th>
                <td>{bot.gameName}</td>
              </tr>
              <tr>
                <th>GameName</th>
                <td>{bot.gameName}</td>
              </tr>
              {/* <tr>
                <th>Status</th>
                <td>{this.formatStatus(bot)}</td>
              </tr> */}
              <tr>
                <th>Rank</th>
                <td>{bot.rank}</td>
              </tr>
              <tr>
                <th>createdAt</th>
                <td>{bot.createdAt}</td>
              </tr>
              <tr>
                <th>updatedAt</th>
                <td>{bot.updatedAt}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal>
    )
  }
}
