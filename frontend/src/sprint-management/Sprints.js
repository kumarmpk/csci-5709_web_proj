//  Author: Falgun Patel
//  Banner Id:  B00845029
//  Dummy data of sprints and tasks for sprint management feature

import React, { Component } from 'react'

const Sprints = [
    {
        'sprintID':1,
        'order':1,
        'sprintname':'abc1',
        'duration':null,
        'startdate':null,
        'enddate':null,
        'description':null,
        'isComplete':0,
        'projectID':1
    }, {
        'sprintID': 2,
        'order': 2,
        'sprintname': 'abc2',
        'duration': null,
        'startdate': null,
        'enddate': null,
        'description': null,
        'isComplete': null,
        'projectID': 1
    }, {
        'sprintID': 3,
        'order': 3,
        'sprintname': 'abc3',
        'duration': null,
        'startdate': null,
        'enddate': null,
        'description': null,
        'isComplete': null,
        'projectID': 1
    }, {
        'sprintID': 4,
        'order': 4,
        'sprintname': 'abc4',
        'duration': null,
        'startdate': null,
        'enddate': null,
        'description': null,
        'isComplete': null,
        'projectID': 1
    }, {
        'sprintID': 5,
        'order': 5,
        'sprintname': 'abc5',
        'duration': null,
        'startdate': null,
        'enddate': null,
        'description': null,
        'isComplete': null,
        'projectID': 1
    }, {
        'sprintID': 6,
        'order': 6,
        'sprintname': 'abc6',
        'duration': null,
        'startdate': null,
        'enddate': null,
        'description': null,
        'isComplete': null,
        'projectID': 1
    }
]

const Tasks = [
    {
        'taskid':1,
        'projectid':1,
        'type':'Task',
        'overview':'Task1',
        'description':'',
        'priority':'Medium',
        'owner':3,
        'environment':'',
        'creator':3,
        'sprintid':1,
        'duedate':null,
        'docid':null,
        'commentid':null,
        'createdDate':null,
        'status':0
    }, {
        'taskid': 2,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task2',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': 2,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': null
    }, {
        'taskid': 3,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task3',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': 3,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': null
    }, {
        'taskid': 4,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task4',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': 4,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': null
    }, {
        'taskid': 5,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task5',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': 5,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': null
    }, {
        'taskid': 6,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task6',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': 6,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': null
    }, {
        'taskid': 7,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task7',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': 1,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': 0
    }, {
        'taskid': 8,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task8',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': 1,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': 1
    }, {
        'taskid': 9,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task9',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': 3,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': null
    }, {
        'taskid': 10,
        'projectid': 1,
        'type': 'Task',
        'overview': 'Task10',
        'description': '',
        'priority': 'Medium',
        'owner': 3,
        'environment': '',
        'creator': 3,
        'sprintid': null,
        'duedate': null,
        'docid': null,
        'commentid': null,
        'createdDate': null,
        'status': null
    } 
]

export {Sprints, Tasks}