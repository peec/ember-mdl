module.exports = {
  description: 'Add styles',

  afterInstall: function() {
    var _this = this;
    return this.addBowerPackagesToProject(
        [
          {name: 'material-design-lite', target:'1.0.6'},
          {name: 'matchMedia', target: '0.2.0'}
        ]);
  }
};
