import React from "react"
import styled from "styled-components"

export default ({ model }) => (
  <Border>
    <div>Block</div>
    <code>{model.code}</code>
  </Border>
)

var Border = styled.div`
border: 4px solid #a01824;
border-radius: 4px;
`
