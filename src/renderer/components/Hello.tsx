import * as React from 'react';
import { Stage, Layer, Text } from 'react-konva';
// import * as Konva from 'konva';
// import DragAndResizeRect from './DragAndResizeRect';
// import DragAndResizeCircle from './DragAndResizeCircle';
import DrawStage from './DrawStage';
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
          {/* <DragAndResizeRect x={10} y={10} width={50} height={100}/>
          <DragAndResizeCircle x={100} y={100} radius={20}/> */}
          <DrawStage></DrawStage>
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
