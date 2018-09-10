import React, { Component } from 'react';
import { of, from, fromEvent } from 'rxjs';
import { take, map } from 'rxjs/operators';
import { Button } from 'antd';


class App extends Component {
  constructor (props){
    super(props);
    this.textInput = React.createRef();
  }

  componentDidMount (){
    const ob1 = of('foo', 'bar');
    const ob2 = from([1, 2, 3]);
    const ob3 = fromEvent(document.querySelector('button'), 'click');
    const ob = ob2.pipe(take(2)).pipe(map(v => v * 2));

    ob3.subscribe(v => console.log(v))
  }

  render() {
    return (
      <div>
        <Button>click</Button>
      </div>
    );
  }
}

export default App;
