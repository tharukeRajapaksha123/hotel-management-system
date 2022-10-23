import React from 'react'
import styled from 'styled-components'
import { CustomRow } from '../../conmmon/CustomRow'
import { ProfileAvatar } from '../../conmmon/ProfileAvatar'


const Container = styled.div`
   width: 100%;
   height: 70px;
   background-color: #05062e;
   padding: 0px 16px;
`

const Title = styled.h1`
   color : white;
`

const TopNavbar = () => {
  return (
    <Container>
      <CustomRow style={{justifyContent : "space-between"}}>
            <Title>Dashboard</Title>
            <ProfileAvatar/>
      </CustomRow>
   </Container>
  )
}

export default TopNavbar