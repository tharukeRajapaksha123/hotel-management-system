

import React from 'react'

import { Menu } from 'antd';


function getItem(label, key,  onclick) {
   return {
      key,
      label,
      onClick: () => { onclick() }
   };
}


const LeftNavBar = ({ bodyIndexChanger }) => {
   const items = [
      getItem('Inventory', '1', () => {bodyIndexChanger(1)},),
      getItem('Room Reservation', '2', () => bodyIndexChanger(2)),
      getItem('Hotel Room Management', '3',() => bodyIndexChanger(3)),
      getItem('Wedding &  Hall Banquets', '5',() => bodyIndexChanger(4)),
      getItem('Employees Management', '6',() => bodyIndexChanger(5)),
      getItem('Services Management', '7',() => bodyIndexChanger(6)),
      getItem('Resturant Management', '8',() => bodyIndexChanger(7)),
      getItem('Transport Management', '9',() => bodyIndexChanger(8)),
   ];
   return (
      <div
         style={{
            width: 200,
            height: "100%",
            backgroundColor: "#05062e"
         }}
      >
         <Menu
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            theme="dark"
            inlineCollapsed={false}
            items={items}
         />


      </div>
   )
}

export default LeftNavBar