import { types, onPatch } from "mobx-state-tree"
import { values } from "mobx"
import { observer } from "mobx-react"

import Time from "./time"
import Task from "./models/task"

var Program = types.model({
  tasks: types.map(Task),

  _templates: types.maybe(types.model('templates', {
    task: types.maybe(types.model('task_templates', {
      display: types.maybeNull(Time),
    })),
  })),
})

window.model = Program.create({
  tasks: {
    [Math.random()]: { label: "Have dinner", done: true },
  },
  _templates: { task: { display: null } },
})

onPatch(window.model, patch => {
  console.info("Processing change: ", patch)
})

function App() {
  return (
    <>
      {values(window.model.tasks).map(task => task.display)}
    </>
  );
}

export default observer(App);
