import styled from "styled-components"
import { observable, runInAction } from "mobx"
import { types, onPatch } from "mobx-state-tree"
import { Observer, observer } from "mobx-react"
import makeInspectable from 'mobx-devtools-mst';

import Hao from "./models/hao"
import Record from "./models/record"
import Queue from "./models/queue"

import { push } from "./core"

var Schema = types

var Program = Schema.model({
  hao: Hao,
  // record: Record,
  // queue: Queue,
})

Program.make = Program.create

var record_key = Math.random()
window.model = Program.make({
  // queue: { key: Math.random(), source: 'https://twitter.com/AssembleCompany/' },
  hao: {},
  // record: {
    // key: record_key,
    // pages: [ {
      // record: record_key,
      // key: Math.random(),
      // blocks: [ { name: 'begin', code: 'Hello', parser: 'plain' } ]
    // } ]
  // }
})

makeInspectable(window.model)

onPatch(window.model, patch => {
  console.info("Processing change: ", patch)
})

function App() {
  return (
    <Color>
      {window.model.hao.display()}
    {/*.blocks.map(block => block.display())*/}
    </Color>
  );
}

var Color = styled.div`
background: #f8f6bb;
height: 100vh;
width: 100vw;
`

var Sidebar = styled.pre`
position: absolute;
top: 0;
right: 0;
width: 40rem;
border: 1px solid black;
`

export default observer(App);
