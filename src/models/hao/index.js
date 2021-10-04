// Only keep measure basename in [codebase]

import { types: Schema } from "mobx-state-tree
import { Page } from "../page"

// `Model` is ...
var Model =
  Schema.model('Hao',
    {
      pages: Schema.array(Page),
    })
