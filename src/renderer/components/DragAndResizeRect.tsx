import * as React from 'react';
import {Rect, Group} from 'react-konva';
import * as Konva from 'konva';

interface DragAndResizeRectProps {
  x : number,
  y : number,
  width : number,
  height : number
}
interface DragAndResizeRectState {
  color : 'green',
  rectX : number,
  rectY : number,
  width : number,
  height : number,
  groupX : number,
  groupY : number,
  group : any
}
export default class DragAndResizeRect extends React.Component < DragAndResizeRectProps,
DragAndResizeRectState > {
  public state : DragAndResizeRectState;
  constructor(props : DragAndResizeRectProps) {
    super(props);
    this.state = {
      color: 'green',
      rectX: 0,
      rectY: 0,
      width: props.width,
      height: props.height,
      groupX: props.x,
      groupY: props.y,
      group: {}
    };
  }

  public getRectXRectY = (e : any) => {
    let arr = [];
    let fourDirect = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    let minX = this.state.rectX,
      minY = this.state.rectY;
    fourDirect.map((item, index) => {
      let x = e
        .get("." + item)[0]
        .getX();
      let y = e
        .get("." + item)[0]
        .getY();
      if (index == 0) {
        minX = x;
        minY = y;
      }
      if (minX > x) 
        minX = x;
      if (minY > y) 
        minY = y;
      }
    );
    arr.push(minX);
    arr.push(minY);
    let x1 = e
      .get(".topLeft")[0]
      .getX();
    let y1 = e
      .get(".topLeft")[0]
      .getY();
    let x2 = e
      .get(".bottomRight")[0]
      .getX();
    let y2 = e
      .get(".bottomRight")[0]
      .getY();
    if (x2 - x1 < 0) 
      arr.push(x1 - x2);
    else 
      arr.push(x2 - x1);
    if (y2 - y1 < 0) 
      arr.push(y1 - y2);
    else 
      arr.push(y2 - y1);
    return arr;
  }
  public addAnchor = (group : any, x : number, y : number, _name : string) => {
    let tempCircle = new Konva.Circle({
      x: x,
      y: y,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      name: _name,
      draggable: true
    });
    group.add(tempCircle);
  }

  public groupInfo = (e : any) => {
    e.on("dragmove", () => {
      this.setState({groupX: e.attrs.x,groupY: e.attrs.y});
    });
    let fourDirect = ["topLeft", "topRight", "bottomLeft", "bottomRight"];
    fourDirect.map((item, index) => {
      this.addAnchor(e, this.state.width * Math.floor(index % 2), this.state.height * Math.floor(index / 2), item);
    });
    e
      .get(".topLeft")[0]
      .on("dragmove", () => {
        let newX = e
          .get(".topLeft")[0]
          .getX();
        let newY = e
          .get(".topLeft")[0]
          .getY();
        e
          .get(".topRight")[0]
          .setY(newY);
        e
          .get(".bottomLeft")[0]
          .setX(newX);
        let [minWidthTemp,
          minHeightTemp,
          maxWidthTemp,
          maxHeightTemp] = this.getRectXRectY(e);
        this.setState({rectX: minWidthTemp, rectY: minHeightTemp, width: maxWidthTemp, height: maxHeightTemp});
      });
    e
      .get(".topRight")[0]
      .on("dragmove", () => {
        let newX = e
          .get(".topRight")[0]
          .getX();
        let newY = e
          .get(".topRight")[0]
          .getY();
        e
          .get(".topLeft")[0]
          .setY(newY);
        e
          .get(".bottomRight")[0]
          .setX(newX);
        let [minWidthTemp,
          minHeightTemp,
          maxWidthTemp,
          maxHeightTemp] = this.getRectXRectY(e);
        this.setState({rectX: minWidthTemp, rectY: minHeightTemp, width: maxWidthTemp, height: maxHeightTemp});
      });
    e
      .get(".bottomLeft")[0]
      .on("dragmove", () => {
        let newX = e
          .get(".bottomLeft")[0]
          .getX();
        let newY = e
          .get(".bottomLeft")[0]
          .getY();
        e
          .get(".bottomRight")[0]
          .setY(newY);
        e
          .get(".topLeft")[0]
          .setX(newX);
        let [minWidthTemp,
          minHeightTemp,
          maxWidthTemp,
          maxHeightTemp] = this.getRectXRectY(e);
        this.setState({rectX: minWidthTemp, rectY: minHeightTemp, width: maxWidthTemp, height: maxHeightTemp});
      });
    e
      .get(".bottomRight")[0]
      .on("dragmove", () => {
        let newX = e
          .get(".bottomRight")[0]
          .getX();
        let newY = e
          .get(".bottomRight")[0]
          .getY();
        e
          .get(".bottomLeft")[0]
          .setY(newY);
        e
          .get(".topRight")[0]
          .setX(newX);
        let [minWidthTemp,
          minHeightTemp,
          maxWidthTemp,
          maxHeightTemp] = this.getRectXRectY(e);
        this.setState({rectX: minWidthTemp, rectY: minHeightTemp, width: maxWidthTemp, height: maxHeightTemp});
      });

  }

  render() {
    return (
      <Group
        ref={this.groupInfo}
        draggable={true}
        x={this.state.groupX}
        y={this.state.groupY}>
        <Rect
          x={this.state.rectX}
          y={this.state.rectY}
          width={this.state.width}
          height={this.state.height}
          fill={'green'}/>
      </Group>
    );
  }
}
