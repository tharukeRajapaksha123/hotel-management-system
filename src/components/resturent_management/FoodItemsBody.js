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
import AddFoodModal from './AddFoodModal'

const FoodItemsBody = () => {
   const [foods, setFoods] = useState([])
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
   const [selectedFood, setSelectedFood] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isEditModalOpen,setEditModalOpen] = useState(false);


   const showAddModal = () => {
      setIsModalOpen(true)
   }

   const handleOk = async () => {
      await refresher()
      setIsModalOpen(false)
   }

   const handleCancel = () => {
      setIsModalOpen(false)
   }


   const openCloseEditMdal = async() => {
      await refresher();
      setEditModalOpen(!isEditModalOpen)
   }


   const deleteModalCancel = () => {
      setIsDeleteModalOpen(false)
   }



   const deleteModalHandleOk = async () => {
      await axios.delete(`${baseUrl}/food-controller/delete-food-item/${selectedFood["_id"]}`);
      await refresher();
      setIsDeleteModalOpen(false)


   }


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


   const refresher = async () => {
      let f = []
      await axios.get(`${baseUrl}/food-controller`).then(resul => {
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
         <AddFoodModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} />
         <AddFoodModal handleOk={openCloseEditMdal} handleCancel={openCloseEditMdal} isModalOpen={isEditModalOpen} foodData={selectedFood} />
         <DeleteModal text={"Delete room"} handleCancel={deleteModalCancel} handleOk={deleteModalHandleOk} isModalOpen={isDeleteModalOpen} />
      </Container>
   )
}

export default FoodItemsBody