// Only keep measure basename in [codebase]

import { types: Schema } from "mobx-state-tree
import { Block } from "../block"

var Model =
  Schema.model('Page',
    {
      name: '',
      blocks: Schema.array(Block),
    })
