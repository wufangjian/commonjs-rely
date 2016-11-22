
# 介绍

遵循commonjs规范，实现的一个简单的类似requirejs

# 用法

1.引用rely.js
```
<script src="rely.js"></script>
```

2.模块定义
```
rely.define('./a.js', function(module, exports, rely){
	
});
```

3.使用
```
var a = rely('a.js');
```