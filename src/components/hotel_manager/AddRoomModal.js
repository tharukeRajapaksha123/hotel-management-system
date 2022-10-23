import React,{useEffect,useState} from 'react'
import {Modal, Form, Input, Row, Col, Button } from "antd"
const AddRoomModal = ({ handleOk, handleCancel ,isModalOpen,roomData}) => {

   const [form] = Form.useForm();
 

   const [roomType, setRoomType] = useState("");
   const [costPerDay, setCostPerDay] = useState("");
   const [noOfBeds, setNoOfBeds] = useState("");
   const [imageUrl, setImageUrl] = useState("");
   const [fac, setFac] = useState("");
   const [requiredMark, setRequiredMarkType] = useState('optional');
   const onRequiredTypeChange = ({ requiredMarkValue }) => {
      setRequiredMarkType(requiredMarkValue);
   };
   useEffect(() => {

      if (roomData != null) {
         console.log("called");
         setRoomType(roomData["type"]);
         setCostPerDay(roomData["cost"])
         setFac(roomData["fac"])
         setImageUrl(roomData["image"])
         setNoOfBeds(roomData["no_of_beds"])
      }
   }, [roomData]);


   const createRoom = ()=>{
      
   }

   return (
      <Modal title={roomData ? "Edit Room" : "Add Room"} open={isModalOpen} footer={null} width={1000}>
         <Form
            form={form}
            layout="vertical"
            initialValues={{
               requiredMarkValue: requiredMark,
            }}
            onValuesChange={onRequiredTypeChange}
            requiredMark={requiredMark}
            action={() => { }}
         >
            <Row>
               <Col span={11}>
                  <Form.Item label="Room Type" required tooltip="Room type is required">
                     <Input placeholder="" value={roomType} onChange={(e) => { setRoomType(e.target.value) }} />
                  </Form.Item>
               </Col>
               <Col span={2} />
               <Col span={11}>
                  <Form.Item
                     required
                     label="Cost per day"
                     tooltip={{
                        title: 'Price for room is required',
                     }}
                  >
                     <Input placeholder="" value={costPerDay} onChange={(e) => { setCostPerDay(e.target.value) }} />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={11}>
                  <Form.Item label="No of beds" required tooltip="Room type is required">
                     <Input placeholder="" value={noOfBeds} onChange={(e) => { setNoOfBeds(e.target.value) }} />
                  </Form.Item>
               </Col>
               <Col span={2} />
               <Col span={11}>
                  <Form.Item
                     required
                     label="Image url"
                     tooltip={{
                        title: 'Room image is required',
                     }}
                  >
                     <Input placeholder="" value={imageUrl} onChange={(e) => { setImageUrl(e.target.value) }} />
                  </Form.Item>
               </Col>
            </Row>
            <Row>
               <Col span={24}>
                  <Form.Item label="Facilities" required tooltip="Room facility is required">
                     <Input.TextArea value={fac} onChange={(e) => { setFac(e.target.value) }} />
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
                     <Button type="primary" htmlType='submit' onClick={() => { handleOk() }} style={{ width: "100%", margin: "0 8px" }}>Submit</Button>
                  </Form.Item>
               </Col>
            </Row>
         </Form>
      </Modal>
   )
}

export default AddRoomModal