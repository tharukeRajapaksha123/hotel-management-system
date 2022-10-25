import React, { useState } from 'react'
import { CustomColumn } from '../../conmmon/CustomColumn'
import { CustomRow } from '../../conmmon/CustomRow'
import CustomerManagementBody from '../customer_management/CustomerManagementBody'
import EmployeesBody from '../employees_management/EmployeesBody'
import HotelManagemenrBody from '../hotel_manager/HotelManagemenrBody'
import InventoryBody from '../inventory/InventoryBody'
import FoodItemsBody from '../resturent_management/FoodItemsBody'
import RoomReservationBody from '../room_reservation/RoomReservationBody'
import ServoceManagerBody from '../services_management/ServoceManagerBody'
import TrasnportManagerBody from '../transport_management/TrasnportManagerBody'
import WeddinManagementBody from '../weddin_management/WeddinManagementBody'
import LeftNavBar from './LeftNavBar'
import TopNavbar from './TopNavbar'

const Dashboard = () => {
   const [activeIndex, setActiveIndex] = useState(1)
   const dashboardManager = () => {
      switch (activeIndex) {
         case 1:
            return <InventoryBody />;
         case 2:
            return <RoomReservationBody />;
         case 3:
            return <HotelManagemenrBody />;
         case 4:
            return <WeddinManagementBody />;
         case 5:
            return <EmployeesBody />;
         case 6:
            return <ServoceManagerBody />;
         case 7:
            return <FoodItemsBody />;
         case 8:
            return <div />;
         case 9:
            return <CustomerManagementBody />;
         case 10:
            return <TrasnportManagerBody />;
         default:
            return <div />
         // code block
      }
   }

   function bodyIndexChanger(i) {
      const index = parseInt(i)
      setActiveIndex(index)
   }

   return (
      <CustomColumn>
         <TopNavbar  />
         <CustomRow>
            <LeftNavBar bodyIndexChanger={bodyIndexChanger}/>
            {dashboardManager()}
         </CustomRow>
      </CustomColumn>
   )
}

export default Dashboard