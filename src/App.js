import styled from "styled-components"
import { autorun, observable, runInAction } from "mobx"
import { types, onPatch } from "mobx-state-tree"
import { Observer, observer } from "mobx-react"

import Task from "./models/task"
import Playground from "./playground"
import { push } from "./core"

var cache = observable.box(null)

var Program = types.model({
  _chosen: types.maybeNull(types.reference(Task)),
  tasks: types.array(Task),
})
  .actions(self => ({
    choose: (key) => {
      self._chosen = key

      var model = self._chosen.$treenode.type.name
      var display = self._chosen._display
      var address = `src/models/${model}/${display}.js`

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
          <Playground
            begin={cache.get()}
            onRecord={(value) => {
              var model = window.model._chosen.$treenode.type.name
              var display = window.model._chosen._display
              var address = `src/models/${model}/${display}.js`

              push(
                `http://${process.env.REACT_APP_HIERARCH_ADDRESS}/upgrade`,
                { address, upgrades: [
                  { begin: 0, end: cache.get().length, grade: value }
                ] },
              ).then(() => window.model.choose(window.model._chosen.key))
            }}
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
