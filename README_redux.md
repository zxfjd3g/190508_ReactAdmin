# 1. redux理解
	什么?: redux是专门做状态管理的独立第3方库, 不是react插件, 但一般都用在react项目中
	作用?: 对应用中状态进行集中式的管理(写/读)
	开发: 与react-redux, redux-thunk等插件配合使用

# 2. redux相关API
	redux中包含: createStore(), applyMiddleware(), combineReducers()  
	store对象: getState(), dispatch(), subscribe()
	react-redux: 
			<Provider>: 向所有的容器组件提供store
			connect(
				state => ({xxx: state.xxx}),
				{actionCreator1, actionCreator2}
			)(UI组件): 
					产生的就是容器组件, 负责向UI组件传递标签属性, 
					一般属性值从state中获取, 函数属性内部会执行dispatch分发action

# 3. redux核心概念(3个)
	action: 
			默认是对象(同步action), {type: 'xxx', data: value}, 需要通过对应的actionCreator产生, 
			它的值也可以是函数(异步action), 需要引入redux-thunk才可以
	reducer
			根据老的state和指定的action, 返回一个新的state的函数
			不能修改老的state
	store
			redux最核心的管理对象
			内部管理着: state和reducer
			提供方法: getState(), dispatch(action), subscribe(listener)

# 4. redux工作流程

![](D:\work\190508\video\day15\redux流程结构图.JPG)


# 5. 在项目中使用redux
    1). 下载相关的库
				redux
				react-redux
				redux-thunk
				redux-devtools-extension(这个只在开发时需要)
    2). 创建redux文件夹
				action-types.js
				actions.js
				reducers.js
				store.js
    3). store.js
        默认暴露创建的store对象
        指定好reducer
        应用上thunk异步中间件
        应用上redux调试插件
    4). reducer.js
        为头部标题定义reducer函数: headerTitle
        为登陆的用户定义reducer函数: user
        通过combineReducers()来整合多个子reducer, 生成一个总的reducer函数
        总的state的结构: {headerTitle: 'xxx', user: {}}
    5). action-types.js
        同步action对象的type名称常量
    6). actions.js
        定义与type对应的同步action creator函数: 返回action对象
        定义异步action creator函数: 返回action函数
    7). 在需要与redux通信的组件中
        引入connect函数
        引入action creator函数
        通过connect包装UI组件生成容器组件, 并暴露
            export default connect(
                state => ({}),
                {}
            )(UI组件)
