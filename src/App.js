import React, { Component } from 'react';
import { of, from, fromEvent, bindCallback, Subject, Observable, merge } from 'rxjs';
import { take, map } from 'rxjs/operators';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/throttleTime';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/pairwise';
import 'rxjs/add/operator/distinct';
import 'rxjs/add/operator/scan';
import 'rxjs/add/operator/distinctUntilChanged';
import { Button, Input } from 'antd';

// import List from './components/List';

const exists = (file, cb) => {
  cb(file + '.js');
};
class App extends Component {
  constructor (props){
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount (){
    const ob1 = of('foo', 'bar');
    const ob2 = from([2, 3, 4]);
    const ob3 = fromEvent(document.querySelector('#increase'), 'click');
    const ob4 = bindCallback(exists);
    const ob5 = Observable.create(observer => {
      observer.next('bar');
      setTimeout(() => observer.next('baz'), 1000);
    });
    const ob6 = fromEvent(document.querySelector('input'), 'keypress');
    const ob7 = fromEvent(document.querySelector('#decrease'), 'click');
    const sb1 = new Subject();
    const ob = ob2.pipe(take(2)).pipe(map(v => v * 2));

    const obIncrease = ob3.map(() => state => Object.assign({}, state, { count: state.count + 1 }));
    const obDecrease = ob7.map(() => state => Object.assign({}, state, { count: state.count - 1 }));
    const obInput = ob6.map(event => state => Object.assign({}, state, { inputValue: event.target.value }));
    const obState = merge(obIncrease, obDecrease, obInput).scan((state, changeFn) => changeFn(state), {
      count: 0,
      inputValue: ''
    });
    let prevState;

    obState.subscribe(({ count, inputValue}) => {
      if (prevState.count !== count){
        document.querySelector('#count').innerHTML = count;
      }
      if (prevState.inputValue !== inputValue){
        document.querySelector('#user').innerHTML = `Hello ${inputValue}`;
      }
      prevState = {
        count,
        inputValue
      };
    });

    /*ob2
      .scan((c, b) => c + b, 0)
      .subscribe(v => console.log(v))

    ob3
      .scan(count => count + 1, 0)
      .subscribe(count => document.querySelector('#count').innerHTML = count)

    ob6
      .pluck('data')
      .distinctUntilChanged()
      .subscribe(val => console.log(val));

    ob6
      .pluck('target', 'value')
      .distinct()
      .subscribe(val => console.log(val));

    ob6
      .pluck('target', 'value')
      .pairwise()
      .subscribe(value => console.log(value));

    ob2
      .map(member => member.name)
      .subscribe(v => console.log(v));

    ob6
      .takeUntil(ob3)
      .map(event => event.target.value)
      .subscribe(v => console.log(v))

    ob6
      .take(3)
      .map(event => event.target.value)
      .subscribe(v => console.log(v));

    ob6
      .debounceTime(2000)
      .map(event => event.target.value)
      .subscribe(v => console.log(v));

    ob6
      .throttleTime(2000)
      .map(event => event.target.value)
      .subscribe(v => console.log(v));

    ob6
      .filter(event => event.target.value.length > 2)
      .map(event => event.target.value)
      .subscribe(v => console.log(v));

    ob6
      .delay(2000)
      .map(event => event.target.value)
      .subscribe(v => console.log(v));*/
  }

  render() {
    return (
      <div>
        <Input placeholder="basic usage" />
        <Button id="increase">increase</Button>
        <Button id="decrease">decrease</Button>
        <div id="count"></div>
        <div id="user"></div>
      </div>
    );
  }
}

export default App;
