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

  componentDidUpdate(prev) {
    if(this.props.address && prev.address !== this.props.address) {
      fetch(`http://${process.env.REACT_APP_HIERARCH_ADDRESS}/source?address=${this.props.address}`)
      .then(response => response.text())
      .then(response => this.setState({ value: response }))
    }
  }

  render = () => (
    <>
      <Area
        lines={(this.state.value || '').split(/\r\n|\r|\n/).length}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
        onKeyDown={e => {
          if(e.code === "Space")
            e.stopPropagation()
        }}
      />
      <Clickable onClick={() => this.props.onRecord(this.state.value)} >
        Record and Reload
      </Clickable>
    </>
  )
}

var Area = styled.textarea`
height: ${({ lines }) => lines * 1.15 }em;
width: 100%;
`

var Clickable = styled.button`
display: block;
color: #fffefe;
background: #6fa7ec;
border-radius: 0.8rem;
height: 1.6rem;
`

export default observer(Playground)
