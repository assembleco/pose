import { types } from "mobx-state-tree"
import loadDisplays from "../../dynamic_displays"

var Task = types.model('task', {
  label: types.string,
  done: types.boolean,
})

export default loadDisplays(Task)
