import { Button, Col, DatePicker, Form, Input, Modal, Row, Select } from 'antd'
import React from 'react'
import { useState } from 'react'
import stringValidator from "../../validators/string_valifator"
import numberValidator from "../../validators/number_validator"
import axios from 'axios'
import { baseUrl } from '../../config'


const hallTypes = [
   "Platinum Hall",
   "Gold Hall",
   "Silver Hall",
   "Normal Hall",
]


const AddWeddingModal = ({ handleOk, handleCancel, isModalOpen, weddingData }) => {

   const [name, setName] = useState("")
   const [email, setEmail] = useState("")
   const [location, setLocation] = useState("")
   const [num_of_guests, setNumOfGuests] = useState(0)
   const [date, setDate] = useState("")
   const [hall_type, setHallType] = useState("")


   const createWedding = async () => {
      if (weddingData) {
         await axios.put(`${baseUrl}/wedding-controller/update-wedding/${weddingData._id}`
            , {
               "customer_id": "tesad",
               "wedding_location": location,
               "num_of_guests": num_of_guests,
               "date": Date(date),
               "customer_name": name,
               hall_type,
               "customer_email": email

            }
         ).catch(err => console.log(`update order failed ${err}`))
      } else {
         await axios.post(`${baseUrl}/wedding-controller/create-wedding`
            , {
               "customer_id": "tesad",
               "wedding_location": location,
               "num_of_guests": num_of_guests,
               "date": Date(date),
               "customer_name": name,
               hall_type,
               "customer_email": email

            }
         ).catch(err => console.log(`create order failed ${err}`))
     
      }
    handleOk()
   }

   return (
      <Modal title={weddingData ? "Edit Wedding" : "Add Wedding"} open={isModalOpen} footer={null} width={1000}>
         <Form
            layout="vertical"
         >
            <Row>
               <Col span={7}>
                  <Form.Item
                     label="Customer name" required tooltip="Customer name is required"
                     rules={[
                        {
                           required: true,
                           message: 'The name is required.',
                        }
                     ]}
                  >
                     <Input placeholder="" value={name} onChange={(e) => { setName(e.target.value) }} />
                  </Form.Item>
               </Col>
               <Col span={1} />
               <Col span={7}>
                  <Form.Item
                     required
                     label="Email"
                     rules={stringValidator("Customer email is required")}
                  >
                     <Input placeholder="" value={email} onChange={(e) => { setEmail(e.target.value) }} />
                  </Form.Item>
               </Col>
               <Col span={1} />
               <Col span={7}>
                  <Form.Item
                     label="Wedding Location"
                     rules={stringValidator("Wedding location is required")}
                  >
                     <Input placeholder="" value={location} onChange={(e) => { setLocation(e.target.value) }} />
                  </Form.Item>
               </Col>
            </Row>

            <Row>
               <Col span={7}>
                  <Form.Item
                     required
                     label="Wedding date"
                     rules={stringValidator("Date is required")}
                  >
                     <DatePicker style={{ width: "100%" }} onChange={(val) => {
                        if (val) {
                           const year = val.year;
                           const month = val.month;
                           const day = val.date;
                           setDate(`${year}-${month}-${day}`)
                        }
                     }} />
                  </Form.Item>
               </Col>
               <Col span={1} />
               <Col span={7} >
                  <Form.Item
                     required
                     label="Num of guests"
                     rules={numberValidator("Enter valid guest count")}
                  >
                     <Input value={num_of_guests} onChange={(e) => setNumOfGuests(parseInt(e.target.value))} />
                  </Form.Item>
               </Col>
               <Col span={1} />
               <Col span={7}>
                  <Form.Item
                     required
                     label="Hall Type"
                     rules={stringValidator("Hall Type is required")}
                  >
                     <Select
                        name="Hall Type"
                        onChange={(val) => {
                           if (val) {
                              setHallType(val)
                              console.log(hall_type)
                           }

                        }}
                     >
                        {
                           hallTypes.map((hall) => <Select.Option
                              value={hall}
                           >

                           </Select.Option>)
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
                  <Button type="primary" htmlType='submit' onClick={() => { createWedding() }} style={{ width: "100%", margin: "0 8px" }}>{weddingData ? "Edit" : "Submit"}</Button>
               </Col>
            </Row>
         </Form>
      </Modal>
   )
}

export default AddWeddingModal