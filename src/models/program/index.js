import Goal from "../../models/goal"
import { types } from "mobx-state-tree"
import { runInAction } from "mobx"

var Program = types.model({
  _chosen: types.maybe(types.model({
    key: types.maybeNull(types.reference(Goal)),
    address: '',
  })),

  goals: types.array(Goal),
})
  .actions(self => ({
    choose: (key) => {
      self._chosen = { key: key }

      var model = self._chosen.key.$treenode.type.name
      var display = self._chosen.key._display
      var address = `src/models/${model}/displays/${display}.js`
      runInAction(() => self._chosen.address = address)
    }
  }))

export default Program
