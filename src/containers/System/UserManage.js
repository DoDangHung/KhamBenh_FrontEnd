/** @format */

import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import { getAllUsers } from "../../services/userService";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
    };
  }

  async componentDidMount() {
    let response = await getAllUsers("ALL");
    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.users,
      });
    }
    console.log("data", response);
  }

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="title text-center">Manage User</div>
        <div className="user-table mt-3 mx-1">
          <table id="customers">
            <tr>
              <th>Email</th>
              <th>First name</th>
              <th>Last name</th>
              <th>Address</th>
              <th>Action</th>
            </tr>

            {arrUsers.map((item, index) => {
              return (
                <tr>
                  <td>{item.email}</td>
                  <td>{item.firstName}</td>
                  <td>{item.lastName}</td>
                  <td>{item.address}</td>
                  <td>
                    <button className="btn-edit">
                      <i class="fa-solid fa-pencil"></i>
                    </button>
                    <button className="btn-delete">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
