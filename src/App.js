import styled from "styled-components"
import { onPatch } from "mobx-state-tree"
import { Observer, observer } from "mobx-react"
import { runInAction } from "mobx"

import Program from "./models/program"
import Playground from "./playground"

import loadModels from "./dynamic/models"
loadModels()

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
    <Page>
      {window.program.goals.map(goal => goal.display())}

      <Observer>{() => (
        window.program._chosen
        ? <Sidebar>
            <Playground
            address={window.program._chosen.address}
            onClose={() => window.program.choose(null)}
            />
          </Sidebar>
        : null
      )}</Observer>
    </Page>
  );
}

var Sidebar = styled.pre`
position: absolute;
top: 0;
right: 0;
width: 32rem;
border: 1px solid black;
`

var Page = styled.div`
background: #bbe4c6;
color: #3d3b11;
height: 100vh;
`

export default observer(App);
