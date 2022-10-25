import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button } from "antd"
import axios from "axios"
import { baseUrl } from "../../config"

const AddCustomerModal = ({ handleOk, handleCancel, isModalOpen, customerData }) => {

  const [form] = Form.useForm();


  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [nic, setNic] = useState("");


  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  useEffect(() => {

    if (customerData != null) {
      console.log("called");
      setName(customerData["name"]);
      setAddress(customerData["address"])
      setNic(customerData["nic_number"])
    }
  }, [customerData]);


  const createFood = async () => {
    const room = {
      "name": name,
      "address": address,
      "nic_number": nic,
    }

    if (customerData) {
      await axios.put(`${baseUrl}/customer-controller/update-customer/${customerData["_id"]}`, room)
    } else {
      await axios.post(`${baseUrl}/customer-controller/create-customer/`, room)
    }
    handleOk();
  }

  return (
    <Modal title={customerData ? "Edit Customer" : "Add Customer"} open={isModalOpen} footer={null} width={1000}>
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          requiredMarkValue: requiredMark,
        }}
        onValuesChange={onRequiredTypeChange}
        requiredMark={requiredMark}
        action={() => { createFood() }}
      >
        <Row>
          <Col span={7}>
            <Form.Item label="Customer name" required tooltip="Customer name is required">
              <Input placeholder="" value={name} onChange={(e) => { setName(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={7}>
            <Form.Item
              required
              label="Address"
              tooltip={{
                title: 'Customer address is required',
              }}
            >
              <Input placeholder="" value={address} onChange={(e) => { setAddress(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={7}>
            <Form.Item
              required
              label="Nic"
              tooltip={{
                title: 'Nic is required',
              }}
            >
             <Input placeholder="" value={nic} onChange={(e) => { setNic(e.target.value) }} />
            </Form.Item>
          </Col>
        </Row>
     

        <Row>
          <Col span={12} />
          <Col span={4} />
          <Col span={4}>
            <Button onClick={() => { handleCancel() }} style={{ width: "100%", margin: "0 8px" }}>Cancel</Button>
          </Col>
          <Col span={4}>
            <Form.Item>
              <Button type="primary" htmlType='submit' onClick={() => { createFood(); }} style={{ width: "100%", margin: "0 8px" }}>{customerData ? "Edit" : "Submit"}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddCustomerModal