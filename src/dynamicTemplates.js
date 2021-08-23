import React from 'react';
import { observable } from 'mobx';
import { Observer } from "mobx-react"
import loadable from "@loadable/component"

const displays = observable.map({});

const loadDisplay = (model, display) => {
  var Component = loadable(() => import(`./models/${model}/${display}`))

  if (!displays[model]) displays.set(model, observable.map({}))
  displays.get(model).set(display, Component)
};

const render = (self, model, display) => (
  <Observer>{() => {
    let available = false;

    try {
      available = displays.get(model).get(display)
    } catch (e) {
      available = false;
    }

    return (
      available
      ?
      React.createElement(
        displays.get(model).get(display),
        { self, key: `${self.$treenode.path}:${display}` },
      )

      : null
    )
  }}</Observer>
)

export default (self) => (model = null) => {
  if(!model)
    model = self.$treenode.type.name;

  const displayNames = require
    .context('./models/', true, /\.js$/)
    .keys()
    .map((file) => {
      const module = new RegExp(`^./${model}/(.+).js$`).exec(file);
      return module && module[1];
    })
    .filter((file) => file !== 'index')
    .filter((module) => module !== null);

  displayNames.forEach((display) => {
    loadDisplay(model, display);

    Object.defineProperty(self, display, {
      get: () => render(self, model, display),
    });
  });
};
