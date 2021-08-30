import { types, onPatch } from "mobx-state-tree"
import { observer } from "mobx-react"

import changeable from "./change"
import Task from "./models/task"

var Program = types.model({
  tasks: types.array(changeable(Task, "changing")),
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
      {window.model.tasks.map(task => task.display())}
    </>
  );
}

export default observer(App);
