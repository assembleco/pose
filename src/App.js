import styled from "styled-components"
import { types, onPatch } from "mobx-state-tree"
import { Observer, observer } from "mobx-react"

import replace from "./replace"
import changeable from "./change"
import Task from "./models/task"

var Program = types.model({
  tasks: types.array(changeable(Task, "changing")),
})

window.model = Program.create({
  _chosen: types.maybe(types.reference(Task)),
  tasks: [
    { label: "Have dinner", done: true },
  ],
})

document.addEventListener('keydown', (e) => {
  if(e.code === "Space") {
    replace(window.model, './_chosen', window.model.tasks[0])
  }
})

document.addEventListener('keyup', (e) => {
  if(e.code === "Space") {
    replace(window.model, './_chosen', undefined)
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
          {window.model._chosen
            &&
            <>Hello</>
          }
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
