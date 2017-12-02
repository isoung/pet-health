import * as React from 'react';
import * as DOM from 'react-dom';

export class App extends React.Component<any, any> {
  public render() {
    return (
      <div>hi234</div>
    );
  }
}

DOM.render((
  <App/>
), document.getElementById('app-root'));
