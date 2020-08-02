//  Author: Falgun Patel
//  Banner Id:  B00845029
//  javascript file for sprint management page

import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'
import { faArrowDown } from '@fortawesome/free-solid-svg-icons'
import "./SprintManagement.css";

import { Sprints, Tasks } from './Sprints'

class SprintManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            Sprints: Sprints,
            Tasks: Tasks,
            ActiveSprintAvailable: false,
            ActiveSprintOrder: null,
            ActiveSprintID: null,
            MinOrder: null,
        }
        if (Sprints[0]) {
            let minOrder = Sprints[0]['order']
            Sprints.map((Sprint) => {
                if (Sprint['isComplete'] == 0) {
                    this.state['ActiveSprintAvailable'] = true
                    this.state['ActiveSprintOrder'] = Sprint['order']
                    this.state['ActiveSprintID'] = Sprint['sprintID']
                }
                if (minOrder > Sprint['order']) {
                    minOrder = Sprint['order']
                }
            })
            this.state['MinOrder'] = minOrder
        }
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }

    onDragStart = (ev, id) => {
        console.log('dragstart: ', id);
        ev.dataTransfer.setData("taskid", id);
    }

    onDrop = (ev, sprintid) => {
        let taskid = ev.dataTransfer.getData("taskid");
        console.log("Drop: ", taskid);
        let tasks = this.state.Tasks.filter((task) => {
            if (task.taskid == taskid) {
                task.sprintid = sprintid;
            }
            return task;
        })

        console.log("latest: ", tasks);

        this.setState({
            ...this.state,
            tasks
        })
    }

    onDrop = (ev, actSprintId, status) => {
        let taskid = ev.dataTransfer.getData("taskid");
        console.log("Drop: ", taskid);
        let tasks = this.state.Tasks.filter((task) => {
            if (task.taskid == taskid) {
                task.sprintid = actSprintId;
                task.status = status;
            }
            return task;
        })

        console.log("latest: ", tasks);

        this.setState({
            ...this.state,
            tasks
        })
    }

    render() {
        return (
            <section>
                { 
                    this.state.ActiveSprintAvailable == true?
                        <section className="row mt-4 mx-4">
                            <section className="col-12">
                                <section className="sprint border rounded p-2">
                                    <span className="task-header">Active Sprint</span>
                                    <button type="button" className="mr-2 float-right">Delete</button>
                                    <button type="button" className="mr-2 float-right">End Sprint</button>
                                    <button type="button" className="mr-2 float-right">Edit</button>
                                </section>
                            </section>
                            <section className="col-4">
                                <section className="todo border rounded p-2">
                                    <span className="task-header">To Do</span>
                                </section>
                                <section className="min-vh-25 border rounded"
                                    onDragOver={(e) => this.onDragOver(e)}
                                    onDrop={(e) => this.onDrop(e, this.state.ActiveSprintID, null)}>
                                    {
                                        this.state.Tasks.map((Task) => 
                                            Task['sprintid'] == this.state.ActiveSprintID && Task['status'] == null ?
                                                <section className="task draggable"
                                                    onDragStart={(e) => this.onDragStart(e, Task['taskid'])}
                                                    draggable>
                                                    <span className="task-header">{Task['overview']}</span>
                                                </section>
                                                : null
                                        )
                                    }
                                </section>
                            </section>
                            <section className="col-4">
                                <section className="inprogress border rounded p-2">
                                    <span className="task-header">In Progress</span>
                                </section>
                                <section className="min-vh-25 border rounded"
                                    onDragOver={(e) => this.onDragOver(e)}
                                    onDrop={(e) => this.onDrop(e, this.state.ActiveSprintID, 0)}>
                                        {
                                            this.state.Tasks.map((Task) =>
                                                Task['sprintid'] == this.state.ActiveSprintID && Task['status'] == 0 ?
                                                    <section className="task draggable"
                                                        onDragStart={(e) => this.onDragStart(e, Task['taskid'])}
                                                        draggable>
                                                        <span className="task-header">{Task['overview']}</span>
                                                    </section>
                                                    : null
                                            )
                                        }
                                </section>
                            </section>
                            <section className="col-4">
                                <section className="done border rounded p-2">
                                    <span className="task-header">Done</span>
                                </section>
                                <section className="min-vh-25 border rounded"
                                    onDragOver={(e) => this.onDragOver(e)}
                                    onDrop={(e) => this.onDrop(e, this.state.ActiveSprintID, 1)}>
                                        {
                                            this.state.Tasks.map((Task) =>
                                                Task['sprintid'] == this.state.ActiveSprintID && Task['status'] == 1 ?
                                                    <section className="task draggable"
                                                        onDragStart={(e) => this.onDragStart(e, Task['taskid'])}
                                                        draggable>
                                                        <span className="task-header">{Task['overview']}</span>
                                                    </section>
                                                    : null
                                            )
                                        }
                                </section>
                            </section>
                        </section>
                    : null
                }
                

                {/* Sprint 1 */}
                {
                    this.state.Sprints.map((Sprint) =>
                        Sprint['isComplete'] == null? 
                            <section className="row mt-4 mx-4">
                                <section className="col-12">
                                    <section className="sprint border rounded p-2">
                                        <span className="task-header">{Sprint['sprintname']}</span>
                                        <FontAwesomeIcon icon={faArrowDown} size="x" className="mr-2 float-right"/>
                                        <FontAwesomeIcon icon={faArrowUp} size="x" className="mr-2 float-right"/>
                                        <button type="button" className="mr-2 float-right">Delete</button>
                                        <button type="button" className="mr-2 float-right">Edit</button>
                                        {
                                            this.state.ActiveSprintAvailable == false && Sprint['order'] == this.state.MinOrder?
                                                <button type="button" className="mr-2 float-right">Start Sprint</button>
                                                : null
                                        }
                                    </section>
                                    <section className="min-vh-25 border rounded"
                                        onDragOver={(e) => this.onDragOver(e)}
                                        onDrop={(e) => this.onDrop(e, Sprint['sprintID'])}>
                                            {
                                                this.state.Tasks.map((Task) =>
                                                    Task['sprintid'] == Sprint['sprintID']?
                                                        <section className="task draggable"
                                                            onDragStart={(e) => this.onDragStart(e, Task['taskid'])}
                                                            draggable>
                                                            <span className="task-header">{Task['overview']}</span>
                                                        </section>
                                                        : null
                                                )
                                            }
                                    </section>
                                </section>
                            </section>
                        : null
                    )
                }


                {/* Remaining task/issues */}
                <section className="row mt-4 mx-4">
                    <section className="col-12">
                        <section className="sprint border rounded p-2">
                            <span className="task-header">Remaining Task/Issues</span>
                            <button type="button" className="mr-2 float-right">Create Sprint</button>
                        </section>
                        <section className="min-vh-25 border rounded"
                            onDragOver={(e) => this.onDragOver(e)}
                            onDrop={(e) => this.onDrop(e, null)}>
                            {
                                this.state.Tasks.map((Task) =>
                                    Task['sprintid'] == null ?
                                        <section className="task draggable"
                                            onDragStart={(e) => this.onDragStart(e, Task['taskid'])}
                                            draggable>
                                            <span className="task-header">{Task['overview']}</span>
                                        </section>
                                        : null
                                )
                            }
                        </section>
                    </section>
                </section>
            </section>
        //     // .min - vh - 100 {
        //     // min - height: 100vh!important;
        // }
            // <ul id="sprint-colmn-headers">
            //     <li className="to-do-header border rounded">TO DO</li>
            //     <li className="in-progress-header border rounded">IN PROGRESS</li>
            //     <li className="done-header border rounded">DONE</li>
            // </ul>
        )
    }
}

export default SprintManagement;