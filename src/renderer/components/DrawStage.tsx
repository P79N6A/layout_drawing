import * as React from 'react';
import {Group, Rect, Text} from 'react-konva';
import * as Konva from 'konva';
import {DragDropContext} from 'react-beautiful-dnd';
import {
    Droppable,
    Draggable,
    DroppableProvided,
    DroppableStateSnapshot,
    DraggableProvided,
    DraggableStateSnapshot
} from 'react-beautiful-dnd';

interface DrawStageProps {
    // x : number, y : number, radius : number
}
interface DrawStageState {
    // color : 'green', circleX : number, circleY : number, radius : number, groupX
    // : number, groupY : number, group : any
    editorShow:boolean,
    textContainer: any,
    jsString: string

}
export default class DragAndResizeRect extends React.Component < DrawStageProps,
DrawStageState > {
    public state : DrawStageState;
    constructor(props : DrawStageProps) {
        super(props);
        var fso;
        try { 
            fso=new ActiveXObject("Scripting.FileSystemObject"); 
        } catch (e) { 
            console.log(e);
            alert("当前浏览器不支持");
            return;
        } 
        var openf1 = fso.OpenTextFile("../../../resource/runningjs/DrawStage.js");
        var str2 = openf1.readAll();
        console.log("str2:",str2);
        this.state = {
            // color: 'green', circleX: props.x / 2, circleY: props.y / 2, radius:
            // props.radius, groupX: props.x, groupY: props.y, group: {}
            editorShow:false,
            textContainer: {},
            jsString: ""
        };
    }

    public loadText = (e:any) => {
        // let temp = 1;
        console.log("text:",e.attrs.text);
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
        const remote = require('electron').remote;
        const Menu = remote.Menu;
        const MenuItem = remote.MenuItem;

        let temp = document.createElement("textarea");
        temp
        let menu = new Menu(); //new一个菜单//添加菜单功能
        menu.append(new MenuItem({
            label: '编辑脚本',
            click: function () {
                console.log('item 1 clicked');
                this.state.editorShow = true;
            }
        }));
        e.on("click",(event:any)=>{
            if(event.evt.button === 2){
                e.preventDefault();
                menu.popup(remote.getCurrentWindow());
            }
        })
        // window.addEventListener("contextmenu",function(o:any){
        //     console.log("enter context menu",o);
        //     o.preventDefault();
        //     menu.popup(remote.getCurrentWindow());
        // })
        // e.on("dragmove", () => {     this.setState({groupX: e.attrs.x, groupY:
        // e.attrs.y}); }); this.addAnchor(e, this.state.circleX + this.state.radius,
        // this.state.circleY, "anchor"); e     .get(".anchor")[0]     .on("dragmove",
        // () => {         let newX = e             .get(".anchor")[0] .getX(); let newY
        // = e             .get(".anchor")[0] .getY(); console.log("newX:", newX, "
        // newY:", newY);         let newRadius = Math.pow(this.state.circleX - newX, 2)
        // + Math.pow(this.state.circleY - newY, 2);         newRadius =
        // Math.sqrt(newRadius);         this.setState({radius: newRadius});     });
    }

    public onDragEnd = (result : any) => {
        // dropped outside the list if (!result.destination) {   return; } const items =
        // reorder(   this.state.items,   result.source.index, result.destination.index
        // ); this.setState({   items, });
        console.log("result:", result);
    }

    render() {
        return (
            <DragDropContext onDragEnd={this.onDragEnd}>
                <Droppable droppableId='droppable'>
                    {(provided : DroppableProvided, snapshot : DroppableStateSnapshot) => (
                        <Draggable draggableId='1' index={0}>
                            {(provided : DraggableProvided, snapshot : DraggableStateSnapshot) => (
                                <Group ref={this.groupInfo} draggable={true} x={0} y={0} name="smallicon">
                                    <Rect
                                        x={0}
                                        y={0}
                                        stroke='#666'
                                        fill='#ddd'
                                        strokeWidth={2}
                                        width={100}
                                        height={100}
                                        name="1"
                                        draggable={true}></Rect>
                                    <Text ref={this.loadText} text={"111"}></Text>
                                </Group>
                                
                            )}
                        </Draggable>
                    )}

                </Droppable>
            </DragDropContext>
        );
    }
}
