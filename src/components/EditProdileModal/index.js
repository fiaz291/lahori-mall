import Edit_Form from "@/app/edit-profile/components/edit-form";
import useAuthUser from "@/app/hooks/authUser";
import { COLORS } from "@/constants";
import { Modal } from "antd";
import React from "react";

export default function EditProfileModal({ openModal, setOpenModal }) {
  const { user } = useAuthUser();
  return (
    <Modal
      open={openModal}
      closable={false}
      centered={true}
      title="Edit Profile"
      okText="Edit Profile"
      footer={false}
    >
      <div className="flex flex-col w-full max-w-[1200px]">
        {!!user && <Edit_Form user={user} setOpenModal={setOpenModal} />}
        <button
          className="p-2 text-white mt-4"
          style={{ background: COLORS.green }}
          onClick={() => setOpenModal(false)}
        >
          Close
        </button>
      </div>
    </Modal>
  );
}
