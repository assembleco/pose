import { applyPatch } from "mobx-state-tree"

var replace = (node, path, value) => {
  applyPatch(node, { op: "replace", path, value })
}

export default replace
