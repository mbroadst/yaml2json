// Generated by CoffeeScript 1.8.0
(function() {
  var MULTIDOC_DELIMITER, MULTIDOC_TOKEN, YAML_HASH_TOKEN, YAML_LIST_TOKEN, isMultidoc, isProbablyText, _;

  _ = require('underscore');

  _.str = require('underscore.string');

  _.extend(exports, require('js-yaml'));

  MULTIDOC_TOKEN = '---\n';

  MULTIDOC_DELIMITER = /\n*?\-{3}\n+/;

  YAML_HASH_TOKEN = /^\n*?[a-z0-9_]+\s*?: /;

  YAML_LIST_TOKEN = /^\n*?\- /;

  exports.safeIterate = exports.safeLoadAll;

  exports.safeLoadAll = function(raw) {
    var data, push;
    data = [];
    push = _.bind(data.push, data);
    exports.safeIterate(raw, push);
    if (isMultidoc(raw)) {
      return data;
    } else {
      return data[0];
    }
  };

  exports.isMultidoc = isMultidoc = function(raw) {
    return _.str.startsWith(raw, MULTIDOC_TOKEN);
  };

  exports.isProbablyText = isProbablyText = function(str) {
    return !(YAML_HASH_TOKEN.exec(str)) && !(YAML_LIST_TOKEN.exec(str));
  };

  exports.safeLoadMixed = function(raw) {
    var data, doc, err, _i, _len, _ref;
    if (isMultidoc(raw)) {
      data = [];
      _ref = (raw.split(MULTIDOC_DELIMITER)).slice(1);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        doc = _ref[_i];
        if (isProbablyText(doc)) {
          data.push(doc);
        } else {
          try {
            data.push(exports.safeLoad(doc));
          } catch (_error) {
            err = _error;
            if (err instanceof exports.YAMLException) {
              data.push(doc);
            } else {
              throw err;
            }
          }
        }
      }
      return data;
    } else {
      return exports.safeLoad(raw);
    }
  };

}).call(this);