import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"

class Playground extends React.Component {
  state = {
    value: null,
  }

  constructor(p) {
    super(p)
    this.setState({ value: p.begin })
  }

  componentWillReceiveProps(p) {
    this.setState({ value: p.begin })
  }

  render = () => (
    <>
      <Area
        lines={(this.state.value || '').split(/\r\n|\r|\n/).length}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
      />
    </>
  )
}

var Area = styled.textarea`
height: ${({ lines }) => lines * 1.15 }em;
width: 100%;
`

export default observer(Playground)
