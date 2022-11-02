import { Button, Space, Table } from 'antd'
import React from 'react'
import AddButton from '../../conmmon/AddButton'
import { Container } from '../../conmmon/Contaner'
import { CustomColumn } from '../../conmmon/CustomColumn'
import { CustomRow } from '../../conmmon/CustomRow'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useState } from 'react'
import DeleteModal from '../../conmmon/DeleteModal'
import { useEffect } from 'react'
import axios from 'axios'
import { baseUrl } from '../../config'
import AddWeddingModal from './AddWeddingModal'
const WeddinManagementBody = () => {

  const [deleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [weddings, setWeddings] = useState([])
  const [selectedWedding, setSelectedWedding] = useState()
  const [addModal, setAddModal] = useState(false)
  const deleteModalCancel = async () => {
    await refresher();
    setIsDeleteModalOpen(false)
  }

  const deleteModalHandleOk = async () => {
    if (selectedWedding) {
      await axios.delete(`${baseUrl}/wedding-controller/delete-wedding/${selectedWedding._id}`)
        .catch(err => console.log(`delete wedding failed ${err}`));
      await refresher();
    }
    setIsDeleteModalOpen(false);
  }


  const columns = [
    {
      title: 'Customers Name',
      dataIndex: 'customer_name',
      key: 'name'
    },
    {
      title: 'Email',
      dataIndex: 'customer_email',
      key: 'customer-email',
    },
    {
      title: 'Wedding Location',
      dataIndex: 'wedding_location',
      key: 'nc-wedding_location',
    },
    {
      title: 'Num of guests',
      dataIndex: 'num_of_guests',
      key: 'num-of-guests',
    },
    {
      title: "Date",
      key: "date",
      render : (_,record)=>(
        <p>{`${record.date.split(" ")[1] + " "+ record.date.split(" ")[2] + " " + record.date.split(" ")[3]}`}</p>
      )
    },
    {
      title: "Hall Type",
      dataIndex: "hall_type",
      key: "hall-type"
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => { setSelectedWedding(record);setAddModal(true) }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => { setSelectedWedding(record); setIsDeleteModalOpen(true); }}></Button>
        </Space>
      ),
    },
  ]


  const refresher = async () => {
    let f = []
    await axios.get(`${baseUrl}/wedding-controller`).then(resul => {
      f = resul.data["Weddings"]
      setWeddings([...f])
    }).catch(err => console.log(`error ${err}`))
  }

  useEffect(() => {
    let f = []
    axios.get(`${baseUrl}/wedding-controller`).then(resul => {
      f = resul.data["Weddings"]
      setWeddings([...f])

    }).catch(err => console.log(`error ${err}`))
  }, [])

  return (
    <Container>
      <CustomColumn>
        <CustomRow style={{ height: "70px", padding: "16px", justifyContent: "space-between" }}>
          <h1>Wedding Management</h1>
          <AddButton onclick={() => { setAddModal(true); }} />
        </CustomRow>
        <Table dataSource={weddings} columns={columns} style={{ width: "100%", height: "100%" }} />
      </CustomColumn>
      <AddWeddingModal isModalOpen={addModal} handleCancel={() => {console.log("{ca}"); setAddModal(false) }} handleOk={() => { refresher();setAddModal(false) }} />
      <AddWeddingModal isModalOpen={addModal} hhandleCancel={() => {  setAddModal(false) }} handleOk={() => { refresher(); setAddModal(false); }} weddingData={selectedWedding} />
      <DeleteModal text={"Delete wedding arrangement"} handleCancel={deleteModalCancel} handleOk={deleteModalHandleOk} isModalOpen={deleteModalOpen} />
    </Container>
  )
}

export default WeddinManagementBody