import { types, applyPatch, onPatch } from "mobx-state-tree"
import { values } from "mobx"
import { observer } from "mobx-react"

var Task = types.model({
  label: types.string,
  done: types.boolean,
}).views(self => ({
  get display() {
    return (
      <div>
        <input
          type="checkbox"
          checked={self.done}
          onChange={(e) => applyPatch(self, {
            op: "replace",
            path: `./done`,
            value: !self.done,
          })}
        />
        {self.label}
      </div>
    )
  }
}))

var Agenda = types.model({
  tasks: types.map(Task),
})

window.model = Agenda.create({
  tasks: {
    [Math.random()]: { label: "Have dinner", done: true },
  }
})

// onPatch(window.model, patch => {
//     console.info("Got change: ", patch)
// })

function App() {
  return (
    <>
      {values(window.model.tasks).map(task => task.display)}
    </>
  );
}

export default observer(App);
