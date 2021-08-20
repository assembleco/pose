import { types, onPatch } from "mobx-state-tree"
import { values } from "mobx"
import { observer } from "mobx-react"

import Task from "./models/task"

var Program = types.model({
  tasks: types.map(Task),
})

window.model = Program.create({
  tasks: {
    [Math.random()]: { label: "Have dinner", done: true },
  },
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
