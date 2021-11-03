import React from "react"
import styled from "styled-components"

export default ({ model }) => (
  <Border>
    <div>Hao</div>
    <div>
    {model.pages.map((page) =>
      page.display()
    )}
    </div>
  </Border>
)

var Border = styled.div`
border: 4px solid #a01824;
border-radius: 4px;
`
