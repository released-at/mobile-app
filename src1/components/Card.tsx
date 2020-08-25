import React from 'react'
import styled from 'styled-components/native'

const Container = styled.View`
  background-color: #fff;
  width: 315px;
  height: 200px;
  border-radius: 14px;
  box-shadow: 0 5px 15px rgba(255, 255, 255, 0.25);
  margin-left: 20px;
  margin-top: 20px;
`

function Card() {
  return <Container></Container>
}

export default Card
