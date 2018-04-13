import * as React from 'react';
import { Stage, Layer, Text } from 'react-konva';
// import * as Konva from 'konva';
import DragAndResizeRect from './DragAndResizeRect'
export default class Hello extends React.Component<any, any> {
  /**
   * constructor
   */
  public constructor(props: any) {
    super(props);
    this.state = {
      counter: 0,
    };
  }

  public render() {
    return (
      <div>
        <Stage width={window.innerWidth} height={window.innerHeight}>
        <Layer>
          <Text text=" " />
          <DragAndResizeRect x={100} y={50} width={50} height={100}/>
        </Layer>
      </Stage>
      </div>
    );
  }

  // private onIncrement = () => {
  //   this.setState((prevState: any, props: any) => {
  //     return { counter: prevState.counter + 1 };
  //   });
  // };
}
