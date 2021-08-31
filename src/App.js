import styled from "styled-components"
import { autorun, observable, runInAction } from "mobx"
import { types, onPatch } from "mobx-state-tree"
import { Observer, observer } from "mobx-react"

import Task from "./models/task"

var cache = observable.box(null)

autorun(() => {
  console.log("Cache:", cache.get())
})

console.log(process.env.REACT_APP_HIERARCH_ADDRESS)

var Program = types.model({
  _chosen: types.maybeNull(types.reference(Task)),
  tasks: types.array(Task),
})
  .actions(self => ({
    choose: (key) => {
      self._chosen = key

      // TODO change
      var address = 'src/models/task/primary.js'

      fetch(`http://${process.env.REACT_APP_HIERARCH_ADDRESS}/source?address=${address}`)
      .then(response => response.text())
      .then(response => runInAction(() => cache.set(response)))
    }
  }))

window.model = Program.create({
  tasks: [
    { key: Math.random(), label: "Have dinner", done: true },
  ],
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
          {cache.get()}
        </Sidebar>
      )}</Observer>
    </>
  );
}

var Sidebar = styled.pre`
position: absolute;
top: 0;
right: 0;
width: 20rem;
height: 10rem;
border: 1px solid black;
`

export default observer(App);
