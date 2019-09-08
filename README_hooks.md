## 1. React Hook/Hooks是什么?
    1). Hook是React 16.8.0版本增加的新特性/新语法
    2). 可以让你在函数组件中使用 state 以及其他的 React 特性

## 2. 常用的几个Hook
    1). State Hook: React.useState()
    2). Effect Hook: React.useEffect()
    3). Ref Hook: React.useRef()

## 3. State Hook
    1). State Hook让函数组件也可以有state状态, 并进行状态数据的读写操作
    2). 语法: const [xxx, setXxx] = React.useState(initValue) 
    3). useState说明:
        参数: 第一次作为初始状态值在内部作缓存
        返回: 2个元素的数组, 第1个为内部当前状态值, 第2个为设置/保存新状态值的函数
    4). setXxx说明:
        setXxx(newValue): 参数为非函数值, 直接指定新的状态值, 内部用其覆盖原来的状态值
        setXxx(value => newValue): 参数为函数, 接收原本的状态值, 返回新的状态值, 内部用其覆盖原来的状态值
    5). 多次调用useState的理解
        内部按第一次执行的顺序依次保存状态数据及其对应的更新函数
        这个顺序/个数在后面更新时不能改变, 否则会抛出异常

## 4. Effect Hook
    1). Effect Hook 可以让你在函数组件中执行副作用操作
    2). React中的副作用操作:
        发ajax请求数据获取
        设置订阅 / 启动定时器
        手动更改真实DOM
    3). 语法和说明: 
        useEffect(() => { // 在每次render()后执行
          // 在此可以执行任何带副作用操作
          
          return () { // 在组件卸载前执行
            // 在此做一些收尾工作, 比如清除定时器/取消订阅等
          }
        }, [stateValue]) // 如果指定的是[], 回调函数只会在第一render()后执行
    4). 补充:
        可以把 useEffect Hook 看做 三个函数的组合
        componentDidMount()
        componentDidUpdate()
        componentWillUnmount() 

## 5. Ref Hook
    1). Ref Hook可以在函数中组件中存储/查找组件内的标签或任意其它数据
    2). 语法: const refContainer = useRef(initialValue)
    3). 作用:
        保存标签对象: 功能与React.createRef()一样
        保存任意数据: 
            保存: refContainer.xxx = value
            读取: refContainer.xxx

## 6. Hook 规则
    1). 只在函数组件的最顶层使用 Hook
    2). 不要在循环，条件或嵌套函数中调用 Hook
    3). 必须保证使用hook的顺序与个数总是不变的