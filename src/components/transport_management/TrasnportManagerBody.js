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
import AddTransportModal from './AddTransportModal'

const TrasnportManagerBody = () => {
   const [transports, setTransports] = useState([])
   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
   const [selectedCustomer, setSelectedCustomer] = useState(null)
   const [isModalOpen, setIsModalOpen] = useState(false)
   const [isEditModalOpen, setEditModalOpen] = useState(false);


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


   const openCloseEditMdal = async () => {
      await refresher();
      setEditModalOpen(!isEditModalOpen)
   }


   const deleteModalCancel = () => {
      setIsDeleteModalOpen(false)
   }



   const deleteModalHandleOk = async () => {
      await axios.delete(`${baseUrl}/transport-controller/delete-transport-tour/${selectedCustomer["_id"]}`);
      await refresher();
      setIsDeleteModalOpen(false)
   }


   const columns = [
      {
         title: 'Customer Name',
         dataIndex: 'customer_name',
         key: 'name'
      },
      {
         title: 'Address',
         dataIndex: 'location_address',
         key: 'address',
      },
      {
         title: 'Mobile Number',
         dataIndex: 'mobile_number',
         key: 'nc-number',
      },
      {
         title: 'Vehicle',
         dataIndex: 'vehicle_type',
         key: 'nc-number',
      },
      {
         title: 'Date',

         key: 'date',
         render: (_, record) => (
            <Space size="middle">
               <p>{record.date.split("T")[0]}</p>
            </Space>
         ),
      },

      {
         title: 'Action',
         key: 'action',
         render: (_, record) => (
            <Space size="middle">
               <Button icon={<EditOutlined />} onClick={() => { setSelectedCustomer(record); openCloseEditMdal(); }}></Button>
               <Button icon={<DeleteOutlined />} onClick={() => { setSelectedCustomer(record); setIsDeleteModalOpen(true); }}></Button>
            </Space>
         ),
      },
   ];


   const refresher = async () => {
      let f = []
      await axios.get(`${baseUrl}/transport-controller/`).then(resul => {
         f = resul.data["Transport_Tours"]
         setTransports([...f])
      }).catch(err => console.log(`error ${err}`))
   }

   useEffect(() => {
      let f = []
      axios.get(`${baseUrl}/transport-controller/`).then(resul => {
         console.log(resul.data)
         f = resul.data["Transport_Tours"]
         setTransports([...f])
      }).catch(err => console.log(`error ${err}`))
   }, [])

   return (
      <Container style={{ padding: "16px" }}>
         <CustomColumn>
            <CustomRow style={{ justifyContent: "space-between", height: "50px" }}>
               <h1>Resturent Management</h1>
               <AddButton onclick={showAddModal} />
            </CustomRow>
            <Table columns={columns} dataSource={transports} style={{ width: "100%", flex: 1 }} />
         </CustomColumn>
         <AddTransportModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} />
         <AddTransportModal handleOk={openCloseEditMdal} handleCancel={openCloseEditMdal} isModalOpen={isEditModalOpen} employeeData={selectedCustomer} />
         <DeleteModal text={"Delete room"} handleCancel={deleteModalCancel} handleOk={deleteModalHandleOk} isModalOpen={isDeleteModalOpen} />
      </Container>
   )
}

export default TrasnportManagerBody

