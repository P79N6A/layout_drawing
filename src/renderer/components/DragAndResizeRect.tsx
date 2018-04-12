import * as React from 'react';
import { Rect, Group } from 'react-konva';
import * as Konva from 'konva';

export default class DragAndResizeRect extends React.Component {
  state = {
    color: 'green',
    width: 50,
    height: 50,
    group: {},
  };

  addAnchor(group: any, x: number, y: number) {
    console.log("enter addanchor");
    let tempCircle = new Konva.Circle({
      x: x,
      y: y,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      draggable: true
    });
    group.add(tempCircle);
  }

  groupInfo(e: any) {
    console.log('group:', e);
    var layer = e.getLayer();
    console.log(layer);
    let topLeft = new Konva.Circle({
      x: 0,
      y: 0,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      name: "topLeft",
      draggable: true
    });
    e.add(topLeft);
    let topRight = new Konva.Circle({
      x: 50,
      y: 0,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      name:"topRight",
      draggable: true
    });
    e.add(topRight);
    let bottomLeft = new Konva.Circle({
      x: 0,
      y: 50,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      name:"bottomLeft",
      draggable: true
    });
    e.add(bottomLeft);
    let bottomRight = new Konva.Circle({
      x: 50,
      y: 50,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      name: "bottomRight",
      draggable: true
    });
    e.add(bottomRight);

    topLeft.on("dragmove", ()=>{
      console.log("moveing, new x:",e.get(".topLeft")[0].getX()," new y:",e.get(".topLeft")[0].getY());
      let newX = e.get(".topLeft")[0].getX();
      let newY = e.get(".topLeft")[0].getY();
    });

  }

  

  render() {
    return (
      <Group ref={this.groupInfo} draggable={true} x={50} y={50}>
        <Rect width={this.state.width} height={this.state.height} fill={'green'} />
      </Group>
    );
  }
}
