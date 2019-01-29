## React custom hooks

[![Build Status](https://travis-ci.org/alsotang/rhooks.svg?branch=master)](https://travis-ci.org/alsotang/rhooks)

[![Coverage Status](https://coveralls.io/repos/github/alsotang/rhooks/badge.svg?branch=master)](https://coveralls.io/github/alsotang/rhooks?branch=master)

There is a collection of React custom hooks, including lifecycle style hooks simulating `constructor`, `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`

## Install

`npm install rhooks`


## API

### useConstructor(fn)

Like in a constructor. Only run once when the function component init.

```js
function App(props) {
  useConstructor(() => {
    console.log('this should console.log only once when component instance init. Before didMount')
  })

  return (<div></div>);
}
```

### useDidMount(fn)

Like componentDidMount

```js
function App(props) {
  useDidMount(() => {
    console.log('this should console.log only once when the component is mounted. After constructor')
  })

  return (<div></div>);
}
```

### useDidUpdate(fn)

Like componentDidUpdate.

```js
function App(props) {
  useDidUpdate(() => {
    console.log('This should console.log every time when component update. But do not occur in the didMount.')
  })

  return (<div></div>);
}
```

### useWillUnmount(fn)

Like componentWillUnmount

```js
function App(props) {
  useWillUnmount(() => {
    console.log('this should console.log only once when the component is about to unmount')
  })

  return (<div></div>);
}
```

### useForceRender(fn)

Force component rerender

```js
function App(props) {
  const forceRender = useForceRender()

  return (<div onClick="() => forceRender()">{Date.now()}</div>);
}
```

## License

MIT