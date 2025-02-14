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
    <table className="w-full border-collapse border border-gray-200 shadow-lg rounded-lg overflow-hidden">
      <thead className="bg-gray-100">
        <tr>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Name</th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Username</th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Email</th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Role</th>
          <th className="px-4 py-3 text-left text-sm font-semibold text-gray-700 border-b">Is Verified</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {users.map((user) => (
          <tr key={user.id} className="hover:bg-gray-50">
            <td className="px-4 py-3 text-gray-800 border-b">{user.firstName}</td>
            <td className="px-4 py-3 text-gray-800 border-b">{user.username}</td>
            <td className="px-4 py-3 text-gray-800 border-b">{user.email}</td>
            <td className="px-4 py-3 text-gray-800 border-b">
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
            <td className="px-4 py-3 text-gray-800 border-b">
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
