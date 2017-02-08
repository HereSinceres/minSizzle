## 简介
一个简单的类jQuery选择器

## 使用方法
导入dist下的minSizzle.js;或者导入src底下的minSizzle.js(源文件)

## 接口
```
1.返回window对象
console.log(minSizzle(window));
2.返回document对象
console.log(minSizzle(document));
3.Id选择器返回单个dom元素
minSizzle("#js-id") ;
4.类选择器返回数组 
minSizzle(".js-input")) 
5.复杂选择器
minSizzle("div#js-id.js-class ul.js-ul li p") 
```

## 启动Demo
step1：安装http-server  
npm install -g http-server 
step2：  
http-server 
step3:
打开console

##测试
npm install
npm run test

## 开发
npm run watchjs
同时启动demo 查看运行结果

## TODO List
1.优化逻辑代码
