import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, DatePicker, Select } from "antd"
import axios from "axios"
import { baseUrl } from "../../config"
import stringValidator from "../../validators/string_valifator"



const vehicleTypes = [
  "Car",
  "Van",
  "Bus",
  "Jeep",
]


const AddTransportModal = ({ handleOk, handleCancel, isModalOpen, transportData }) => {


  const [name, setName] = useState("");
  const [address, setAddress] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [vehicle, setVehicle] = useState("")
  const [date, setDate] = useState("")


  useEffect(() => {
    console.log(transportData)

    if (transportData != null) {
      console.log("called");
      setName(transportData["name"]);
      setMobileNumber(transportData["mobile_number"])
      setVehicle(transportData["vehicle_type"])
      setMobileNumber(transportData["mobile_number"])
      setDate(transportData["date"].split("T")[0])

    }
  }, [transportData]);


  const createFood = async () => {
    const transport = {
      "customer_name": name,
      "vehicle_type": vehicle,
      "location_address": address,
      "mobile_number": mobileNumber,
      "date": Date(date),
      "transport_id": "sdfsdf"
    }

    if (transportData) {
      await axios.put(`${baseUrl}/transport-controller/update-transport-tour/${transportData["_id"]}`, transport)
    } else {
      await axios.post(`${baseUrl}/transport-controller/create-transport-tour`, transport)
    }
    handleOk();
  }

  return (
    <Modal title={transportData ? "Edit Employee" : "Add Employee"} open={isModalOpen} footer={null} width={1000}>
      <Form

        layout="vertical"

      >
        <Row>
          <Col span={12}>
            <Form.Item
              required
              label="Customer Name"
              tooltip={{
                title: 'Customer name is required',
              }}
            >
              <Input placeholder="" value={name} onChange={(e) => { setName(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={10}>
            <Form.Item
              required
              label="Mobile Number"
              tooltip={{
                title: 'Nic is required',
              }}
            >
              <Input placeholder="" value={mobileNumber} onChange={(e) => { setMobileNumber(e.target.value) }} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item
              required
              label="Address"
              tooltip={{
                title: 'Address',
              }}
            >
              <Input.TextArea value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={10}>
            <Form.Item
              label="Date"
            >
              <DatePicker
                onChange={(val) => {
                  if (val) {
                    const year = val.year;
                    const month = val.month;
                    const day = val.date;
                    setDate(`${year}-${month}-${day}`)
                  }
                }}
              />
            </Form.Item>
          </Col>
          <Col span={2} />
          <Col span={10}>
            <Form.Item
              label="Vehicle Type"
              rules={stringValidator("Vehicle type is required")}
            >
              <Select
                onChange={(val) => {
                  if (val) {
                    setVehicle(val)
                  }
                }}
              >
                {
                  vehicleTypes.map(vehicle => (
                    <Select.Option value={vehicle}>{vehicle}</Select.Option>
                  ))
                }
              </Select>
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
              <Button type="primary" htmlType='submit' onClick={() => { createFood(); }} style={{ width: "100%", margin: "0 8px" }}>{transportData ? "Edit" : "Submit"}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddTransportModal