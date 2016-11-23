var rely, define;
(function() {
    var list = {};

    // 模块注册
    define = function(path, fn) {
        list[path] = fn;
    };

    // 模块引用
    rely = function(mid) {
        var path = getPath(mid);
        var mod = list[path];

        if (!mod) {
            throw new Error('failed to rely "' + mid + '"');
        };
        if (!mod.exports) {
            mod.exports = {};
            mod.apply(mod.exports, [mod, mod.exports, relative(path)]);
        }
        return mod.exports;
    };

    // 获取模块id
    function getPath(mid) {
        var orig = mid;
        var reg = mid + '.js';
        var index = mid + '/index.js';
        return list[reg] && reg || list[index] && index || orig;
    }

    function relative(parent) {
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
})();
