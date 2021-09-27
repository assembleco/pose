import { types } from "mobx-state-tree"

import changeable from "../../change"
import loadDisplays from "../../dynamic/displays"

var Task = types.model('task', {
  key: types.identifierNumber,
  label: types.string,
  done: types.string,
})

export default changeable(loadDisplays(Task), 'changing')
