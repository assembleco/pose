import React from 'react';
import { observable } from 'mobx';
import { Observer } from "mobx-react"
import loadable from "@loadable/component"

const templates = observable.map({});

const loadTemplate = (modelName, templateName) => {
  var Component = loadable(() => import(`./models/${modelName}/${templateName}`))

  if (!templates[modelName]) templates.set(modelName, observable.map({}))
  templates.get(modelName).set(templateName, Component)
};

const template = (self, modelName, templateName) => (
  <Observer>{() => {
    let available = false;

    try {
      available = templates.get(modelName).get(templateName)
    } catch (e) {
      available = false;
    }

    return (
      available
      ?
      React.createElement(
        templates.get(modelName).get(templateName),
        { self, key: `${self.$treenode.path}:${templateName}` },
      )

      : null
    )
  }}</Observer>
)

export default (self) => (modelName = null) => {
  if(!modelName)
    modelName = self.$treenode.type.name;

  const templateNames = require
    .context('./models/', true, /\.js$/)
    .keys()
    .map((file) => {
      const module = new RegExp(`^./${modelName}/(.+).js$`).exec(file);
      return module && module[1];
    })
    .filter((file) => file !== 'index')
    .filter((module) => module !== null);

  templateNames.forEach((templateName) => {
    loadTemplate(modelName, templateName);

    Object.defineProperty(self, templateName, {
      get: () => template(self, modelName, templateName),
    });
  });
};
