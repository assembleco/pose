import { types } from "mobx-state-tree"
import { values } from "mobx"

var Task = types.model({
  label: types.string,
  done: types.boolean,
})

var Agenda = types.model({
  tasks: types.map(Task),
})

window.model = Agenda.create({
  tasks: {
    [Math.random()]: { label: "Have dinner", done: false },
  }
})

function App() {
  return (
    <>
      {values(window.model.tasks).map(task => (
        <div>
          <checkbox checked={task.done} />
          {task.label}
        </div>
      ))}
    </>
  );
}

export default App;
