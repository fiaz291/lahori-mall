"use client";
import config from "@/app/config";
import { message } from "antd";
import axios from "axios";
import React from "react";
import "./styles.css";

export default function ManageUsersComponent({ users, setReload }) {
  async function handleUpdateUser(props) {
    try {
      await axios.patch(`${config.url}/api/user`, props);
      message.success("User Updated Successfully");
      setReload((prev) => !prev);
    } catch (error) {
      if (error?.response?.data) {
        message.error(error?.response?.data?.error);
      } else {
        message.error("something went wrong!");
      }
    }
  }
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Is Verified</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.firstName}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>
              <select
                value={user.role}
                onChange={(e) => {
                  handleUpdateUser({ id: user.id, role: e.target.value });
                }}
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select>
            </td>
            <td>
              <input
                type="checkbox"
                checked={user.isVerified}
                onChange={(e) => {
                  handleUpdateUser({
                    id: user.id,
                    isVerified: e.target.checked,
                  });
                }}
              />
              {/* <select
                value={user.role}
                onChange={(e) => {
                  handleUpdateUser({id:user.id, isVerified:e.target.value});
                }}
              >
                <option value="admin">Admin</option>
                <option value="customer">Customer</option>
              </select> */}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
