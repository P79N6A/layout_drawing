import * as React from 'react';
import {Circle, Group} from 'react-konva';
import * as Konva from 'konva';

interface DragAndResizeCircleProps {
    x : number,
    y : number,
    radius : number
}
interface DragAndResizeCircleState {
    color : 'green',
    circleX : number,
    circleY : number,
    radius : number,
    groupX : number,
    groupY : number,
    group : any
}
export default class DragAndResizeCircle extends React.Component < DragAndResizeCircleProps,
DragAndResizeCircleState > {
    public state : DragAndResizeCircleState;
    constructor(props : DragAndResizeCircleProps) {
        super(props);
        this.state = {
            color: 'green',
            circleX: props.x / 2,
            circleY: props.y / 2,
            radius: props.radius,
            groupX: props.x,
            groupY: props.y,
            group: {}
        };
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
            this.setState({groupX: e.attrs.x, groupY: e.attrs.y});
        });
        this.addAnchor(e, this.state.circleX + this.state.radius, this.state.circleY, "anchor");
        e
            .get(".anchor")[0]
            .on("dragmove", () => {
                let newX = e
                    .get(".anchor")[0]
                    .getX();
                let newY = e
                    .get(".anchor")[0]
                    .getY();
                console.log("newX:", newX, " newY:", newY);
                let newRadius = Math.pow(this.state.circleX - newX, 2) + Math.pow(this.state.circleY - newY, 2);
                newRadius = Math.sqrt(newRadius);
                this.setState({radius: newRadius});
            });
    }

    render() {
        return (
            <Group
                ref={this.groupInfo}
                draggable={true}
                x={this.state.groupX}
                y={this.state.groupY}>
                <Circle
                    x={this.state.circleX}
                    y={this.state.circleY}
                    radius={this.state.radius}
                    fill={'green'}/>
            </Group>
        );
    }
}
