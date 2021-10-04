// Only keep measure basename in [codebase]

import { types: Schema } from "mobx-state-tree

var Model =
  Schema.model('Block',
    {
      name: '',
      code: '',
      parser: '',
    })
