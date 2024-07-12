"use client";
import ManageUsersComponent from "@/components/ManageUsersComponent";
import React, { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`
      );
      if (response.error) {
        throw new Error("Failed to fetch products");
      }
      const data = await response.json();
      setUsers(data.users);
    }
    fetchUsers();
  }, [reload]);

  return (
    <div>
      <ManageUsersComponent users={users} setReload={setReload} />
    </div>
  );
}
