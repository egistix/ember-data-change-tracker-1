import Mixin from '@ember/object/mixin';

// EmberData does not serialize hasMany relationships by default
export default Mixin.create({
  keepValue(record, key) {
    return record.get('isNew') || record.didChange(key);
  },

  serializeAttribute: function(snapshot, json, key) {
    if (this.keepValue(snapshot.record, key)) {
      return this._super(...arguments);
    }
  },

  serializeBelongsTo: function(snapshot, json, relationship) {
    if (this.keepValue(snapshot.record, relationship.key)) {
      return this._super(...arguments);
    }
  },

  serializeHasMany: function(snapshot, json, relationship) {
    if (this.keepValue(snapshot.record, relationship.key)) {
      return this._super(...arguments);
    }
  }
});
