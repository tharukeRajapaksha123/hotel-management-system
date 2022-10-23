import React, {  useState } from 'react'
import AddButton from '../../conmmon/AddButton'
import { Container } from '../../conmmon/Contaner'
import { CustomColumn } from "../../conmmon/CustomColumn"
import { CustomRow } from "../../conmmon/CustomRow"
import { Table, Space} from 'antd';
import AddRoomModal from './AddRoomModal'

const columns = [
  {
    title: 'Room Type',
    dataIndex: 'type',
    key: 'type'
  },
  {
    title: 'Cost Per Day',
    dataIndex: 'cost',
    key: 'cost',
  },
  {
    title: 'No of Beds',
    dataIndex: 'bed-count',
    key: 'bed-count',
  },
  {
    title: 'Facilities',
    dataIndex: 'facilities',
    key: 'facilities',
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">

      </Space>
    ),
  },
];

const HotelManagemenrBody = ({ roomData }) => {


  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };


  const handleCancel = () => {
    setIsModalOpen(false);
  };



  return (
    <Container style={{ padding: "16px" }}>
      <CustomColumn>
        <CustomRow style={{ justifyContent: "space-between", height: "50px" }}>
          <h1>Room Management</h1>
          <AddButton onclick={showModal} />
        </CustomRow>
        <Table columns={columns} dataSource={[]} style={{ width: "100%", flex: 1 }} />
      </CustomColumn>
      <AddRoomModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen}/>
    </Container>
  )
}

export default HotelManagemenrBody