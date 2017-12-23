import './css/index.css'
// 是否启用
let enable = false
// 默认触发方式
function pop(res, rej, opts) {
    // 规定轨迹
    const route = [...''.padEnd(6, 'lr')]
    let routeShadow = []

    // 注册触碰事件
    document.addEventListener('touchstart', touchStart)

    // 界限
    const CRITICAL = 50
    // 区域限制
    const LIMIT_TOP = 150
    // 记录上次触碰初始位置以及当前滑动的距离
    let lastX = 0, distance = 0

    function touchStart(e) {
        if(!enable) {
            lastX = e.touches[0].clientX
            // 用于记录轨迹
            routeShadow = route.slice()
            // 绑定手指移动和离开事件
            document.addEventListener('touchmove', touchMove)
            document.addEventListener('touchend', touchEnd)
        }
    }

    function touchMove(e) {
        if(e.changedTouches[0].clientY > LIMIT_TOP) {
            touchEnd(null, true)
        }else if(routeShadow.length === 0) {
            touchEnd(null, false)
        } else {
            let curX = e.changedTouches[0].clientX
            switch(routeShadow[0]) {
                case 'l': 
                    go(lastX - curX)
                    lastX = curX
                    break
                case 'r': 
                    go(curX - lastX)
                    lastX = curX
                    break
                default: break
            }
        }
    }

    function touchEnd(e, fail) {
        if(!fail && routeShadow.length === 1 && distance > CRITICAL) {
            if(opts.password === '') {
                getVConsoleByFn()
            }else{
                let password = window.prompt("输入密码后进入调试模式","")
                if(password !== null) {
                    if(password.toLocaleLowerCase() === opts.password) {
                        getVConsoleByFn()
                    }else {
                        alert('密码错误，无法进去调试模式')
                    }
                }
            }
        }
        // 清空
        routeShadow = []
        lastX = 0
        distance = 0
        document.removeEventListener('touchmove', touchMove)
        document.removeEventListener('touchend', touchEnd)
    }

    function go(d) {
        if(d > -10) {
            distance += d
        }else {
            if(distance > CRITICAL) {
                distance = 0
                routeShadow.shift()
            }else {
                touchEnd(null, true)
            }
        }
    }

    // 获取VConsole
    async function asyncGetVConsole(fn) {
        try {
            let VConsole = await import('vconsole')
            fn(VConsole)
            res(VConsole)
        }catch(e) {
            rej(e)
        }
    }

    // 根据是否传入回调来进行特殊处理
    function getVConsoleByFn() {
        if(typeof opts.callback === 'function') {
            asyncGetVConsole(opts.callback)
        }else {
            asyncGetVConsole((VConsole) => {
                enable = true
                let vConsole = new VConsole()
                let exitBtn = document.createElement('div')
                exitBtn.className = 'exit-console'
                exitBtn.innerText = 'EXIT'
                document.getElementById('__vconsole').appendChild(exitBtn)
                exitBtn.onclick = () => {
                    vConsole.destroy()
                    enable = false
                }
            })
        }
    }
} 

export default {
    init(params = '', callback) {
        let type = typeof params
        return new Promise((res, rej) => {
            if(type === 'string') {
                pop(res, rej, {
                    password: params,
                    callback
                })
            }else if(type === 'object') {
                pop(res, rej, params)
            }
        })
    },
    getVConsole() {
        return import('vconsole')
    }
}