

rely.modules = {};

// 注册模块
rely.define = function(path, fn) {
  rely.modules[path] = fn;
}

// 获取模块
rely.getPath = function(mid) {
  var orig = mid;
  var reg = mid + '.js';
  var index = mid + '/index.js';
  return rely.modules[reg] && reg || rely.modules[index] && index || orig;
}

// 
rely.relative = function(parent) {
  return function(mid) {
    if ('.' != mid.charAt(0)) {
      return rely(mid);
    }

    var path = parent.split('/');
    var segs = mid.split('/');
    path.pop();

    for (var i = 0; i < segs.length; i++) {
      var seg = segs[i];
      if (seg == '..') {
        path.pop();
      } else if (seg != '.') {
        path.push(seg);
      }
    }

    return rely(path.join('/'));
  }
}

// 引用模块
function rely(mid) {
  var path = rely.getPath(mid);
  var mod = rely.modules[path];
  if (!mod) {
    throw new Error('failed to rely "' + mid + '"');
  };

  if (!mod.exports) {
    mod.exports = {};
    mod.call(mod.exports, mod, mod.exports, rely.relative(path));
  }

  return mod.exports;
}