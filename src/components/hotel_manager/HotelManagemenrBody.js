import React, { useState, useEffect } from 'react'
import AddButton from '../../conmmon/AddButton'
import { Container } from '../../conmmon/Contaner'
import { CustomColumn } from "../../conmmon/CustomColumn"
import { CustomRow } from "../../conmmon/CustomRow"
import { Table, Space, Button } from 'antd';
import AddRoomModal from './AddRoomModal'
import { baseUrl } from '../../config'
import axios from "axios"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteModal from '../../conmmon/DeleteModal'


const HotelManagemenrBody = ({ roomData }) => {

  const [selectedRoomData, setSelectedRoomData] = useState(null)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rooms, setRooms] = useState([])
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = async () => {
    await refresher();
    setIsModalOpen(false);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const openCloseEditMdal = async () => {
    await refresher();
    setIsEditModalOpen(!isEditModalOpen)
  }

  const deleteModalCancel = () => {
    setIsDeleteModalOpen(false);
  }

  const deleteModalHandleOk = async () => {
    await axios.delete(`${baseUrl}/room-controller/delete-room/${selectedRoomData["_id"]}`)
    await refresher();
    setIsDeleteModalOpen(false);


  }

  const columns = [
    {
      title: 'Room Type',
      dataIndex: 'type',
      key: 'type'
    },
    {
      title: 'Cost Per Day',
      dataIndex: 'cost_per_day',
      key: 'cost',
    },
    {
      title: 'No of Beds',
      dataIndex: 'no_of_beds',
      key: 'bed-count',
    },
    {
      title: 'Facilities',
      key: 'facilities',
      render: (_, record) => (
        <Space size="middle">
          <p>{`${record["facilities"].substring(0, 25)} ...`},</p>
        </Space>
      )
    },
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <Space size="middle">
          <img src={`${record["image_url"]}`} alt="room" width={50} height={50} />
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => { setSelectedRoomData(record); openCloseEditMdal(); }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => { setSelectedRoomData(record); setIsDeleteModalOpen(true); }}></Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    let r = []
    axios.get(`${baseUrl}/room-controller/`).then((result) => {
      r = result.data["Rooms"]
      setRooms([...r])
    })
  }, [setRooms])


  const refresher = async () => {
    let r = []
    await axios.get(`${baseUrl}/room-controller/`).then((result) => {
      r = result.data["Rooms"]
      setRooms([...r])
    })
  }

  return (
    <Container style={{ padding: "16px" }}>
      <CustomColumn>
        <CustomRow style={{ justifyContent: "space-between", height: "50px" }}>
          <h1>Room Management</h1>
          <AddButton onclick={showModal} />
        </CustomRow>
        <Table columns={columns} dataSource={rooms} style={{ width: "100%", flex: 1 }} />
      </CustomColumn>
      <AddRoomModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} />
      <AddRoomModal handleOk={openCloseEditMdal} handleCancel={openCloseEditMdal} isModalOpen={isEditModalOpen} roomData={selectedRoomData} />
      <DeleteModal text={"Delete room"} handleCancel={deleteModalCancel} handleOk={deleteModalHandleOk} isModalOpen={isDeleteModalOpen} />
    </Container>
  )
}

export default HotelManagemenrBody