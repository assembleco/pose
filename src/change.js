import { types, applySnapshot, getSnapshot } from "mobx-state-tree"

var changeable = (base_model, change_display) => {
  var cloned_model = types
    .model({ _change: types.maybeNull(base_model) })
    .actions(self => ({
      change: () => {
        applySnapshot(self, {
          ...getSnapshot(self),
          _change: getSnapshot(self),
          _display: change_display,
        })
      },
      record: () => {
        applySnapshot(self, getSnapshot(self._change))
      },
      cancel: () => {
        applySnapshot(self, { ...getSnapshot(self), _change: null })
      }
    }))

  return types.compose(base_model.name, base_model, cloned_model)
}

export default changeable
