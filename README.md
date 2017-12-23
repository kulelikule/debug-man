debug-man
==============================
这是一个基于vconsole的手机端的调试工具

## 安装
使用npm安装:

```
npm install debug-man
```

将debug-man导入你的项目:

```
import debugMan from 'debug-man'

debugMan.init()
```

## 使用
### 不传入参数，启动调试方式如下：
```
debugMan.init()
```
手指在屏幕顶部按照以下顺序滑动（中途手指不要离开屏幕，且滑动距离不要太小）：从右到左，再从左到右，重复3次即可，即 左 ---> 右 ---> 左 ---> 右 ---> 左 ---> 右

### 参数为字符串，启动调试方式如下：
```
debugMan.init('123456')
```
手指在屏幕顶部按照以下顺序滑动（中途手指不要离开屏幕，且滑动距离不要太小）：从右到左，再从左到右，重复3次即可，即 左 ---> 右 ---> 左 ---> 右 ---> 左 ---> 右，输入密码（传入的字符串）

### 如果想使用debug-man默认启用方式，且又想定制vconsole的功能，那么可以传入回调函数
```
debugMan.init('123456', (VConsole) => {
    // TODO
})

//另一种形式
debugMan.init({
    password: 'xux', 
    callback(VConsole) {
        // TODO
    }
})

```


