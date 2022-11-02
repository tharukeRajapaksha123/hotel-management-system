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
import AddEmployeeModal from './AddEmployeeModal'

const EmployeesBody = () => {
   const [foods, setemployees] = useState([])
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
      await axios.delete(`${baseUrl}/employee-manager/delete-employee/${selectedCustomer["_id"]}`);
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
         title: 'Address',
         dataIndex: 'address',
         key: 'address',
      },
      {
         title: 'Nic Number',
         dataIndex: 'nic_number',
         key: 'nc-number',
      },
      {
         title: 'Role',
         dataIndex: 'role',
         key: 'role',
      },
      {
         title: 'Salary',
         dataIndex: 'salary',
         key: 'salary',
      },
      {
         title: 'Joined Date',

         key: 'joinedDate',
         render: (_, record) => (
            <Space size="middle">
               <p>{record.transaction_date.split("T")[0]}</p>
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
      await axios.get(`${baseUrl}/employee-manager/`).then(resul => {
         f = resul.data["employees"]
         setemployees([...f])
      }).catch(err => console.log(`error ${err}`))
   }

   useEffect(() => {
      let f = []
      axios.get(`${baseUrl}/employee-manager/`).then(resul => {
         console.log(resul.data)
         f = resul.data["employees"]
         setemployees([...f])
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
         <AddEmployeeModal handleOk={handleOk} handleCancel={handleCancel} isModalOpen={isModalOpen} />
         <AddEmployeeModal handleOk={openCloseEditMdal} handleCancel={openCloseEditMdal} isModalOpen={isEditModalOpen} employeeData={selectedCustomer} />
         <DeleteModal text={"Delete room"} handleCancel={deleteModalCancel} handleOk={deleteModalHandleOk} isModalOpen={isDeleteModalOpen} />
      </Container>
   )
}

export default EmployeesBody

