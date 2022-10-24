import React, { useState, useEffect } from 'react'
import AddButton from '../../conmmon/AddButton'
import { Container } from '../../conmmon/Contaner'
import { CustomColumn } from "../../conmmon/CustomColumn"
import { CustomRow } from "../../conmmon/CustomRow"
import { Table, Space, Button } from 'antd';

import { baseUrl } from '../../config'
import axios from "axios"
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import DeleteModal from '../../conmmon/DeleteModal'

const FoodItemsBody = () => {
  const [foods, setFoods] = useState([])


  const showAddModal = () => {

  }

  const setSelectedFood = () => {

  }

  const openCloseEditMdal = () => {
  }

  const setIsDeleteModalOpen = () => { }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Available',
      dataIndex: 'available',
      key: 'available',
    },
    {
      title: 'Image',
      key: 'image',
      render: (_, record) => (
        <Space size="middle">
          <img src={`${record["image"]}`} alt="room" width={50} height={50} />
        </Space>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button icon={<EditOutlined />} onClick={() => { setSelectedFood(record); openCloseEditMdal(); }}></Button>
          <Button icon={<DeleteOutlined />} onClick={() => { setSelectedFood(record); setIsDeleteModalOpen(true); }}></Button>
        </Space>
      ),
    },
  ];


  const refresher = () => {
    let f = []
    axios.get(`${baseUrl}/food-controller`).then(resul => {
      f = resul.data["Food_Items"]
      setFoods([...f])
    }).catch(err => console.log(`error ${err}`))
  }

  useEffect(() => {
    let f = []
    axios.get(`${baseUrl}/food-controller`).then(resul => {
      f = resul.data["Food_Items"]
      setFoods([...f])
    }).catch(err => console.log(`error ${err}`))
  }, [])

  return (
    <Container style={{ padding: "16px" }}>
      <CustomColumn>
        <CustomRow style={{ justifyContent: "space-between", height: "50px" }}>
          <h1>Resturent Management</h1>
          <AddButton onclick={showAddModal} />
        </CustomRow>
        <Table columns={columns} dataSource={foods} style={{ width: "100%", flex: 1 }} />
      </CustomColumn>
    </Container>
  )
}

export default FoodItemsBody