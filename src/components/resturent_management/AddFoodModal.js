import React, { useEffect, useState } from 'react'
import { Modal, Form, Input, Row, Col, Button, Dropdown, Menu } from "antd"
import axios from "axios"
import { baseUrl } from "../../config"

const AddFoodModal = ({ handleOk, handleCancel, isModalOpen, foodData }) => {

  const [form] = Form.useForm();


  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [availability, setAvailability] = useState(1);
  const [imageUrl, setImageUrl] = useState("");

  const [requiredMark, setRequiredMarkType] = useState('optional');
  const onRequiredTypeChange = ({ requiredMarkValue }) => {
    setRequiredMarkType(requiredMarkValue);
  };




  const menu = (
    <Menu
      items={[
        {
          key: '1',
          label: (
            <p onClick={()=>{setAvailability(1)}}>
              In Stock
            </p>
          ),
        },
        {
          key: '2',
          label: (
            <p onClick={()=>{setAvailability(0)}} >
              Out Of Stock
            </p>
          ),
        },
        
      ]}
    />
  );


  useEffect(() => {

    if (foodData != null) {
      console.log("called");
      setName(foodData["name"]);
      setPrice(foodData["price"])

      setImageUrl(foodData["image"])
      setAvailability(foodData["available"])
    }
  }, [foodData]);


  const createFood = async () => {
    const room = {
      "image": imageUrl,
      "name": name,
      "price": price,
      "available": availability,
    }

    if (foodData) {
      await axios.put(`${baseUrl}/food-controller/update-food-item/${foodData["_id"]}`, room)
    } else {
      await axios.post(`${baseUrl}/food-controller/create-food-item/`, room)
    }
    handleOk();
  }

  return (
    <Modal title={foodData ? "Edit Food Item" : "Add Food Item"} open={isModalOpen} footer={null} width={1000}>
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
            <Form.Item label="Food name" required tooltip="Food name is required">
              <Input placeholder="" value={name} onChange={(e) => { setName(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={7}>
            <Form.Item
              required
              label="Price"
              tooltip={{
                title: 'Price for food item is required',
              }}
            >
              <Input placeholder="" value={price} onChange={(e) => { setPrice(e.target.value) }} />
            </Form.Item>
          </Col>
          <Col span={1} />
          <Col span={7}>
            <Form.Item
              required
              label="Availability"
              tooltip={{
                title: 'Price for food item is required',
              }}
            >
              <Dropdown overlay={menu} placement="bottom" arrow >
                <Button style = {{width : "100%"}}>{availability === 1 ? "In Stock" : "Out of Stock"}</Button >
              </Dropdown>
            </Form.Item>
          </Col>
        </Row>
        <Row>

          <Col span={24}>
            <Form.Item
              required
              label="Image url"
              tooltip={{
                title: 'Food image is required',
              }}
            >
              <Input placeholder="" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} />
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
              <Button type="primary" htmlType='submit' onClick={() => { createFood(); }} style={{ width: "100%", margin: "0 8px" }}>{foodData ? "Edit" : "Submit"}</Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  )
}

export default AddFoodModal