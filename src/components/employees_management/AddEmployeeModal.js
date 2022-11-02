import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button } from "antd"
import axios from "axios"
import { baseUrl } from "../../config"

const AddEmployeeModal = ({ handleOk, handleCancel, isModalOpen, employeeData }) => {

  const [form] = Form.useForm();


  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [joinedDate, setJoinedDate] = useState("")
  const [address, setAddress] = useState("")
  const [salary, setSalary] = useState("")
  const [nic, setNic] = useState("")
  const [role, setRole] = useState("")

  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };

  useEffect(() => {
    console.log(employeeData)

    if (employeeData != null) {
      console.log("called");
      setName(employeeData["name"]);
      setAge(parseInt(employeeData["age"]))
      setMobileNumber(employeeData["mobileNumber"])
      setJoinedDate(employeeData["transaction_date"].split("T")[0])
      setNic(employeeData["nic_number"])
      setRole(employeeData["role"])
      setAddress(employeeData["address"])
      setSalary(employeeData["salary"])
   
    }
  }, [employeeData]);


  const createFood = async () => {
    const employee = {
      "name": name,
      "address": address,
      "age": age,
      "salary": salary,
      "nic_number": nic,
      "role": role,
      "mobileNumber": mobileNumber,
      "joinedDate": joinedDate
    }

    if (employeeData) {
      await axios.put(`${baseUrl}/employee-manager/update-employee/${employeeData["_id"]}`, employee)
    } else {
      await axios.post(`${baseUrl}/employee-manager/create-employee`, employee)
    }
    handleOk();
  }

  return (
    <Modal title={employeeData ? "Edit Employee" : "Add Employee"} open={isModalOpen} footer={null} width={1000}>
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
            <Form.Item label="Employee name" required tooltip="Employee name is required">
              <Input placeholder="" value={name} onChange={(e) => { setName(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={7}>
            <Form.Item
              required
              label="Role"
              tooltip={{
                title: 'Employee name is required',
              }}
            >
              <Input placeholder="" value={role} onChange={(e) => { setRole(e.target.value) }} />
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
          <Col span={24}>
            <Form.Item
              required
              label="Employees address"
              tooltip={{
                title: 'Employee address',
              }}
            >
              <Input.TextArea value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={7}>
            <Form.Item
              required
              label="Salary"
              tooltip={{
                title: 'Employee salary',
              }}
            >
              <Input value={salary} onChange={(e) => setSalary(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={5}>
            <Form.Item
              required
              label="Joined Date"
              tooltip={{
                title: 'Employee joined date',
              }}
            >
              <Input value={joinedDate} onChange={(e) => setJoinedDate(e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={3}>
            <Form.Item
              required
              label="Age"
              tooltip={{
                title: 'Employee joined date',
              }}
            >
              <Input value={age} onChange={(e) => setAge(parseInt(e.target.value))} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={5}>
            <Form.Item
              required
              label="Mobile Number"
              tooltip={{
                title: 'Employee joined date',
              }}
            >
              <Input value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
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
              <Button type="primary" htmlType='submit' onClick={() => { createFood(); }} style={{ width: "100%", margin: "0 8px" }}>{employeeData ? "Edit" : "Submit"}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddEmployeeModal