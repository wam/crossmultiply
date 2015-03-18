CrossMultiply = {

  dimensions: {
    a: { field: 'a', val: '', calculate: function () { return CrossMultiply.solve('b', 'c', 'd'); } },
    b: { field: 'b', val: '', calculate: function () { return CrossMultiply.solve('a', 'd', 'c'); } },
    c: { field: 'c', val: '', calculate: function () { return CrossMultiply.solve('a', 'd', 'b'); } },
    d: { field: 'd', val: '', calculate: function () { return CrossMultiply.solve('b', 'c', 'a'); } }
  },

  dimensionCalculated: false,
  isRounded: false,

  isCalculable: function () {
    return _(this.dimensions).chain().select(function (dimension, key) { return !isNaN(parseInt(dimension.val)) }).value().length == 3;
  },

  dimensionToCalculate: function () {
    return _(this.dimensions).chain().reject(function (dimension, key) { return !isNaN(parseInt(dimension.val)) }).first().value().field;
  },

  recalculate: function () {
    if (this.isCalculable()) {
      var dimension = this.dimensionToCalculate();
      var result = this.dimensions[dimension].calculate();
      var roundedResult = Math.round(result);

      this.isRounded = (roundedResult != result);
      this.dimensionCalculated = dimension;
      this.dimensions[dimension].val = roundedResult;
    } else {
      this.dimensionCalculated = false;
    }
  },

  solve: function (x, y, z) {
    return this.crossmultiply(CrossMultiply.dimensions[x].val, CrossMultiply.dimensions[y].val, CrossMultiply.dimensions[z].val);
  },

  crossmultiply: function (x, y, z) {
    return (x * y) / z;
  },

  isNumeric: function (i)
  {
     return (i - 0) == i && i.length > 0;
  },

  currentValue: null
};
