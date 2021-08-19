import moment from 'moment-timezone';
import { types } from 'mobx-state-tree';

const Time = types.custom({
  name: 'Time',

  fromSnapshot(value) { return moment(value); },
  toSnapshot(value) { return value.toString(); },
  isTargetType(value) { return moment.isMoment(value); },

  getValidationMessage(value) {
    return (
      this.isTargetType(value)
        ? ''
        : `'${value}' is not a moment object.`
    );
  },

});

export default Time;
