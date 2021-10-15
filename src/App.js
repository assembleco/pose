import styled from "styled-components"
import { autorun, observable, runInAction } from "mobx"
import { types, onPatch } from "mobx-state-tree"
import { Observer, observer } from "mobx-react"

import Hao from "./models/hao"
import Record from "./models/record"

import Playground from "./playground"
import { push } from "./core"

var Schema = types
var cache = observable.box(null)

var Program = Schema.model({
  hao: Hao,
  record: Record,
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

Program.make = Program.create

var record_key = Math.random()
window.model = Program.make({
  hao: {},
  record: {
    key: record_key,
    pages: [ {
      record: record_key,
      key: Math.random(),
      blocks: [ { name: 'begin', code: 'Hello', parser: 'plain' } ]
    } ]
  }
})

onPatch(window.model, patch => {
  console.info("Processing change: ", patch)
})

function App() {
  return (
    <Color>
      {window.model.record.display()}
    {/*.blocks.map(block => block.display())*/}

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
