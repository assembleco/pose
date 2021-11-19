import styled from "styled-components"
import { observable } from "mobx"
import { types, onPatch } from "mobx-state-tree"
import { Observer, observer } from "mobx-react"

import Program from "./models/program"
import Playground from "./playground"

import loadModels from "./dynamic/models"
loadModels()

var cache = observable.box(null)

window.program = Program.create({
  goals: [
    { key: Math.random(), label: "Drink coffee", done: 'no' },
    { key: Math.random(), label: "Go outside", done: 'no' },
    { key: Math.random(), label: "Make dinner", done: 'no' },
  ],
})

onPatch(window.program, patch => {
  console.info("Processing change: ", patch)
})

function App() {
  return (
    <>
      {window.program.goals.map(goal => goal.display())}

      <Observer>{() => (
        <Sidebar key="sidebar">
          <Playground
            key="playground"
            address={window.program._chosen && window.program.chosen.address}
          />
        </Sidebar>
      )}</Observer>
    </>
  );
}

var Sidebar = styled.pre`
position: absolute;
top: 0;
right: 0;
width: 40rem;
border: 1px solid black;
`

export default observer(App);
