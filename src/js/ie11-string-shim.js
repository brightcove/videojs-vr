module.exports = function() {
  if (!String.prototype.endsWith) {
    String.prototype.endsWith = function(suffix) { /* For IE11 */
      return this.substr(-suffix.length) === suffix;
    };
  }
};
