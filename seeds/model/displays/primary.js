import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

import ReactMarkdown from 'react-markdown'

export default observer(({ model }) => {
  return (
    <Bin>
      <ReactMarkdown>
        {model.label}
      </ReactMarkdown>
    </Bin>
  )
})

var Bin = styled.div`
display: inline-block;
background: #f8f6bb;
margin: 0.2rem;
widtH: 12rem;
`
