import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider, connect } from 'react-redux'

// React component
// 展示组件
class Counter extends Component {
  render() {
    const { value, onIncreaseClick } = this.props
    return (
      <div>
        <span>{value}</span>
        <button onClick={onIncreaseClick}>Increase</button>
      </div>
    )
  }
}

Counter.propTypes = {
  value: PropTypes.number.isRequired,
  onIncreaseClick: PropTypes.func.isRequired
}


// Action
const increaseAction = { type: 'increase' }

// Reducer
// 定义如何根据action更新state
function counter(state = { count: 0 }, action) {
  const count = state.count
  switch (action.type) {
    case 'increase':
      return { count: count + 1 }
    default:
      return state
  }
}

// Store 传入根Reducer，当dispach分发action时，调用根reducer，把state和action作为参数传到reducer里，返回一个新的state作为新的state
const store = createStore(counter)

// Map Redux state to component props
// Counter组件想要通过prop获取的state的值。
function mapStateToProps(state) {
  return {
    value: state.count
  }
}

// Count组件想要通过props获取的action
// 将onIncreaseClick和increaseAction关联起来，当onclick时，分发increaseAction，触发state变化。
// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    onIncreaseClick: () => dispatch(increaseAction)
  }
}

// Connected Component
// 将展示组件转化为容器组件 允许从store中指定准确的state，action到组件中
// 可以传递一个对象
// 最好保证只在最顶层使用
const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Counter)

// store应为应用中唯一的Redux Store对象
// 使得组件中的connect方法能够获取store
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
