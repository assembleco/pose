import React from "react"
import styled from "styled-components"
import { observer } from "mobx-react"
import { push } from "./core"

import { EditorView, keymap } from "@codemirror/view"
import { EditorState, basicSetup } from "@codemirror/basic-setup"
import { defaultKeymap } from "@codemirror/commands"

class Playground extends React.Component {
  state = {
    code: '',
    errors: [],
  }

  constructor(p) {
    super(p)
    this.playgroundNode = React.createRef()
    this.onRecord = this.onRecord.bind(this)
    this.grabCode()

    this.playgroundModel = EditorState.create({
      doc: this.state.code,
      extensions: []
    })

    window.playgroundModel = this.playgroundModel
  }

  componentDidMount() {
    this.playgroundDisplay = new EditorView({
      state: this.playgroundModel,
      parent: this.playgroundNode.current,
    })
  }

  componentDidUpdate(prev) {
    if(prev.address !== this.props.address)
      this.grabCode()
  }

  grabCode() {
    if(!this.props.address) return null

    fetch(`http://${process.env.REACT_APP_HIERARCH_ADDRESS}/source?address=${this.props.address}`)
    .then(response => response.text())
    .then(response => {
      this.setState({ code: response })

      var change = this.playgroundModel.update({changes: {
        from: 0,
        to: this.playgroundModel.doc.length,
        insert: response,
      }})

      if(this.playgroundDisplay) this.playgroundDisplay.dispatch(change)
    })
  }

  onRecord() {
    // check code for errors

    push(
      `http://${process.env.REACT_APP_HIERARCH_ADDRESS}/upgrade`,
      {
        address: this.props.address,
        upgrades: [ { begin: 0, end: -1, grade: this.state.code } ]
      },
    )
  }

  render = () => (
    <>
      <div ref={this.playgroundNode} />

    {/*
      <Area
        lines={(this.state.code || '').split(/\r\n|\r|\n/).length}
        value={this.state.code}
        onChange={e => this.setState({ code: e.target.value })}
        onKeyDown={e => {
          if(e.code === "Space")
            e.stopPropagation()
        }}
      />
    */}

      <Clickable onClick={this.onRecord} >
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
