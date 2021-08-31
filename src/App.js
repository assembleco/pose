import styled from "styled-components"
import { types, onPatch } from "mobx-state-tree"
import { Observer, observer } from "mobx-react"

import replace from "./replace"
import Task from "./models/task"

var cache = null

var Program = types.model({
  _chosen: types.maybeNull(types.reference(Task)),
  tasks: types.array(Task),
})
  .views(self => ({
    get program() {
      if(self._chosen)
        return "pending."
      else
        return null
    }
  }))

window.model = Program.create({
  tasks: [
    { key: Math.random(), label: "Have dinner", done: true },
  ],
})

document.addEventListener('keydown', (e) => {
  if(e.code === "Space") {
    replace(window.model, './_chosen', window.model.tasks[0].key)
  }
})

document.addEventListener('keyup', (e) => {
  if(e.code === "Space") {
    replace(window.model, './_chosen', null)
  }
})

onPatch(window.model, patch => {
  console.info("Processing change: ", patch)
})

function App() {
  return (
    <>
      {window.model.tasks.map(task => task.display())}

      <Observer>{() => (
        <Sidebar>
          {window.model.program}
        </Sidebar>
      )}</Observer>
    </>
  );
}

var Sidebar = styled.div`
position: absolute;
top: 0;
right: 0;
width: 20rem;
height: 10rem;
border: 1px solid black;
`

export default observer(App);
