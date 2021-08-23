import React from 'react';
import { types } from "mobx-state-tree"
import { observable } from 'mobx';
import { Observer } from "mobx-react"
import loadable from "@loadable/component"

const loaded = observable.map({});

const loadDisplay = (model, display) => {
  var Component = loadable(() => import(`./models/${model}/${display}`))

  if (!loaded[model]) loaded.set(model, observable.map({}))
  loaded.get(model).set(display, Component)

  console.log("loaded", model, display)
};

const render = (self, model, display) => (
  <Observer>{() => {
    console.log("Rendering", model, display)

    let available = false;
    try {
      available = loaded.get(model).get(display)
    } catch (e) {
      available = false;
    }

    console.log("Available?", available)

    return (
      available
      ?
      React.createElement(
        loaded.get(model).get(display),
        { self, key: `${self.$treenode.path}:${display}` },
      )

      : null
    )
  }}</Observer>
)

var loadDisplays = (model) => {
  const displays = require
    .context('./models/', true, /\.js$/)
    .keys()
    .map((file) => {
      const module = new RegExp(`^./${model.name}/(.+).js$`).exec(file);
      return module && module[1];
    })
    .filter((file) => file !== 'index')
    .filter((module) => module !== null);

  displays.forEach((display) => loadDisplay(model.name, display));

  var displayable = types
    .model({})
    .views(self => {
      var views = {}

      displays.forEach(display => {
        views[display] = () => render(self, model.name, display)

        // Object.defineProperty(views, display, {
        //   get: function() { return render(self, model.name, display) }
        // })
      })

      return views
    })

  return types.compose(model, displayable)
};

export default loadDisplays
