import { types, onPatch, applySnapshot, getSnapshot } from "mobx-state-tree"
import { observer } from "mobx-react"

import Task from "./models/task"

var changeable = (base_model, change_display) => {
  var cloned_model = types
    .model({ _change: types.maybeNull(base_model) })
    .actions(self => ({
      change: () => {
        applySnapshot(self, { ...getSnapshot(self), _change: getSnapshot(self) })
      },
      record: () => {
        applySnapshot(self, getSnapshot(self._change))
      },
      cancel: () => {
        applySnapshot(self, { ...getSnapshot(self), _change: null })
      }
    }))

  var composed = types.compose(base_model, cloned_model)

  return composed
}

var Program = types.model({
  tasks: types.array(changeable(Task, "change")),
})

window.model = Program.create({
  tasks: [
    { label: "Have dinner", done: true },
  ],
})

onPatch(window.model, patch => {
  console.info("Processing change: ", patch)
})

function App() {
  return (
    <>
      {window.model.tasks.map(task =>
        task._change
        ? task.changing()
        : task.display()
      )}
    </>
  );
}

export default observer(App);
