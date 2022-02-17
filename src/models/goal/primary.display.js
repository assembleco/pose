import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { Icon } from "@iconify/react"

import replace from "../../replace"

export default observer(({ model }) => {
  return (
    <Bin>
      <input
        type="checkbox"
        checked={model.done === 'yes'}
        onChange={(e) => replace(model, './done',
          model.done === 'yes'
          ? 'no'
          : 'yes'
        )}
      />

      {model.label}

      <Icon
        icon="ci:edit"
        onClick={model.change}
      />
    </Bin>
  )
})

var Bin = styled.div`
background: #f8f6bb;
margin: 0.2rem;
widtH: 12rem;
`
