import { types } from "mobx-state-tree"
import initializeTemplates from "../../dynamicTemplates"

var Task = types.model('task', {
  label: types.string,
  done: types.boolean,
})
  .actions(self => ({
    afterCreate: () => { initializeTemplates(self)("task") },
  }))
  .views(self => ({
  }))

export default Task
