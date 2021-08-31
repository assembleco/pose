import { types } from "mobx-state-tree"

import changeable from "../../change"
import loadDisplays from "../../dynamic_displays"

var Task = types.model('task', {
  key: types.identifierNumber,
  label: types.string,
  done: types.boolean,
})

export default changeable(loadDisplays(Task), 'changing')
