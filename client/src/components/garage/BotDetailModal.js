import React, { Component } from 'react';
import Modal from 'react-modal';

export default class DetailModal extends Component {
  constructor(props) {
    super(props);
    const bot = this.props.bot;
    this.state = {
      editMode: false,
      name: '',
      resourceUrl: '',
      runtime: '',
      description: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleEdit() {
    const bool = this.state.editMode;
    const bot = this.props.bot;
    this.setState({
      editMode: !bool,
      botId: bot.botId,
      name: bot.name,
      resourceUrl: bot.resourceUrl,
      runtime: bot.runtime,
      description: bot.description,
    });
  }

  handleUpdate() {
    const bot = {
      botId: this.state.botId,
      name: this.state.name,
      resourceUrl: this.state.resourceUrl,
      runtime: this.state.runtime,
      description: this.state.description
    }
    this.props.onRequestUpdateBot(bot);
  }

  handleDelete(botId) {
    if(window.confirm("Are you sure?")) {
      alert("This bot is deleted");
      this.props.onRequestDeleteBot(botId);
      setTimeout(this.props.onRequestClose(), 3000)
    }
  }

  render() {
    const { bot } = this.props;
    const { editMode, nameIsEditing } = this.state;
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
          {
            editMode ?
            <div>
              <table className="u-full-width">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>
                      <input name="name" type="text" value={this.state.name}  onChange={this.handleChange}/>
                    </td>
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
                    <td>
                      <input name="resourceUrl" type="url" value={this.state.resourceUrl} onChange={this.handleChange}/>
                    </td>
                  </tr>
                  <tr>
                    <th>Runtime</th>
                    <td>
                      <input required name="runtime" type="radio" value="python3.6" onChange={this.handleChange} style={{'marginRight':10}}/>
                      Python3.6
                      <input required name="runtime" type="radio" value="node--" onChange={this.handleChange} style={{'marginLeft':10, 'marginRight':10}}/>
                      NodeJS
                      <input required name="runtime" type="radio" value="golang1.9" onChange={this.handleChange} style={{'marginLeft':10, 'marginRight':10}}/>
                      Go1.9
                    </td>
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
                  <tr>
                    <th>description</th>
                    <td>
                      <textarea name="description" value={this.state.description} onChange={this.handleChange} className="u-full-width" id="botComment"></textarea>
                    </td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => this.handleUpdate()} className="button-primary">Save</button>
              <button onClick={() => this.handleEdit()} className="button-primary">Cansel</button>
            </div>
            :
            <div>
              <table className="u-full-width">
                <tbody>
                  <tr>
                    <th>Name</th>
                    <td>{bot.name}</td>
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
                  <tr>
                    <th>description</th>
                    <td>{bot.description}</td>
                  </tr>
                </tbody>
              </table>
              <button onClick={() => this.handleEdit()} className="button-primary">Edit</button>
              <button onClick={() => this.handleDelete(bot.botId)} className="button-primary">Delete</button>
            </div>
          }
        </div>
      </Modal>
    )
  }
}
