import React from 'react';
import { applyPatch } from 'mobx-state-tree';
import { observable, runInAction } from 'mobx';
import { Observer } from "mobx-react"
import moment from 'moment-timezone';

const templates = observable.map({});
const timestamps = observable.map({})

const loadTemplate = (modelName, templateName) => {

  import(`./models/${modelName}/${templateName}`)
    .then((module) => {
        if (!templates[modelName]) templates.set(modelName, observable.map({}))
        templates.get(modelName).set(templateName, module.default)

        if(!timestamps[modelName]) timestamps.set(modelName, observable.map({}))
        timestamps.get(modelName).set(templateName, moment().toString())
    });
};

const template = (self, templateName) => {
  const modelName = self.$treenode.type.name;

  return (
    <Observer>{() => {
      let available = false;

      try {
        var timestamp = moment(timestamps.get(modelName).get(templateName))

        available = (
          timestamp
          && !timestamp.invalid
          && templates.get(modelName).get(templateName)
        );
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
};

export default (self) => () => {
  const modelName = self.$treenode.type.name;

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
      get: () => template(self, templateName),
    });
  });
};
