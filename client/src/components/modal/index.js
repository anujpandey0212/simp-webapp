import React from 'react';
import SkyLight from 'react-skylight';

class ExampleCustom extends React.Component {
  constructor(props){
    super(props);
  }

  render() {

    var myBigGreenDialog = {
      backgroundColor: '#00897B',
      color: '#ffffff',
      width: '70%',
      height: '600px',
      marginTop: '-300px',
      marginLeft: '-35%',
    };

    return (
      <div>
        <section>
          <button onClick={() => this.customDialog.show()}>Open Modal</button>
        </section>
        <SkyLight dialogStyles={myBigGreenDialog} hideOnOverlayClicked ref={ref => this.customDialog = ref} title="A Custom Modal">
          I'm a custom modal!
        </SkyLight>
      </div>
    )
  }
}

ExampleCustom.displayName = 'ExampleCustom';

export default ExampleCustom;