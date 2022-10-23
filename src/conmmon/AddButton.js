import React from 'react'
import { Button } from 'antd';
import {PlusCircleOutlined }from '@ant-design/icons';

const AddButton = ({onclick}) => {
   return (
      <Button shape='circle' type="dashed" icon={<PlusCircleOutlined />} onClick = {()=>{onclick()}}/>
   )
}

export default AddButton