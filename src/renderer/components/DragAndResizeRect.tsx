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
    let tempCircle = new Konva.Circle({
      x: 0,
      y: 0,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      draggable: true
    });
    e.add(tempCircle);
    tempCircle = new Konva.Circle({
      x: 50,
      y: 0,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      draggable: true
    });
    e.add(tempCircle);
    tempCircle = new Konva.Circle({
      x: 0,
      y: 50,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      draggable: true
    });
    e.add(tempCircle);tempCircle = new Konva.Circle({
      x: 50,
      y: 50,
      stroke: '#666',
      fill: '#ddd',
      strokeWidth: 2,
      radius: 8,
      draggable: true
    });
    e.add(tempCircle);

  }

  

  render() {
    return (
      <Group ref={this.groupInfo} draggable={true} x={50} y={50}>
        <Rect width={this.state.width} height={this.state.height} fill={'green'} />
      </Group>
    );
  }
}
