import React, {Component} from 'react';
import Task from "./Task.js";
import axios from 'axios';

import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";

import "./styles.css";

class TaskList extends Component {
  state = {
    tasks: [],
    newTask: '',
  }

  componentDidMount() {
    return axios.get(`http://localhost:3000/tasks`)
      .then(taskResponse => {
        this.setState({
          tasks: taskResponse.data
        })
      })
      .catch(error => {
        console.log(error);
      })
  }

  addATask = () => {
    const { newTask, tasks } = this.state;
    console.log( {newTask,tasks} )

    if(newTask) {
      return axios.post(`http://localhost:3000/tasks`, {
        task: newTask,
        completed: Boolean(false)
      })
        .then(taskResponse => {
          //setTasks([...tasks, { title, id: uuid() }]);
          //this.setState([...tasks, taskResponse.data])

          const newTasksArray = [ ...tasks, taskResponse.data];
          console.log(taskResponse.data.task);
          console.log(taskResponse.data);
          console.log(newTasksArray);
          //newTasksArray.push(taskResponse.data.task);
          console.log(newTasksArray);
  
          this.setState({
            tasks: newTasksArray,
            newTask: ''
          })
          console.log(this.state.tasks);
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  handleInputChange = (event) => {
    console.log(event)
    this.setState({
      newTask: event.target.value
    })
    console.log(this.state.newTask)
  }

  doneTask(i){

    if(i){
      const index = this.state.tasks.map(task => task.id).indexOf(i);
      const done = !this.state.tasks[index].completed;
      return axios.put(`http://localhost:3000/tasks/${i}`, {
        task: this.state.tasks[index].task,
        completed: !this.state.tasks[index].completed
      })
        .then(taskResponse => {
          console.log(taskResponse.data);
          this.setState(state => {
            let  {tasks } = state;
            return tasks[index].completed = done;
          });
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  editTask (i, newName) {

    if(i && newName) {
      const index = this.state.tasks.map(task => task.id).indexOf(i);
      console.log(this.state.tasks[index].task)
      return axios.put(`http://localhost:3000/tasks/${i}`, {
        task: newName,
        completed: this.state.tasks[index].completed,
      })
        .then(taskResponse => {          
            this.setState(state => {
              let  {tasks } = state;
              tasks[index].task = newName;
            });
        })
        .catch(error => {
          console.log(error);
        })
    }
  }
   

  deleteTask(i) {

    if(i) {
      return axios.delete(`http://localhost:3000/tasks/${i}`)
        .then(taskResponse => {

          const newTasksArray = this.state.tasks.filter(task => task.id !== i);

          //this.state.tasks=[ ...newTasksArray]; 
          this.setState({tasks: newTasksArray});
        })
        .catch(error => {
          console.log(error);
        })
    }
  }

  renderTask(i) {
    return ( 
      <Task 
        key={i.id}
        value={i}
        doneTask={() => this.doneTask(i.id)}
        deleteTask={() => this.deleteTask(i.id)}
        editTask={(newName) => this.editTask(i.id, newName)}
      />
    );
  }

  render() {
    const { newTask } = this.state;
    //const current = this.state.tasks;
    //const classes = useStyles();
    return (
      <Paper elevation={2} className="paper">
        <div className="form">
          <TextField className="textfield"
                  variant="outlined"
                  required
                  label="Task"
                  name="task"
                  autoComplete="off"

                  onChange={this.handleInputChange}
                  value={newTask}
                  type="text" 
          />
          <Button className="button"
                  type="submit"
                  variant="outlined"
                  //color="success"
                  size="large"
                  onClick={this.addATask}
          >
          ADD  
          </Button>
        </div>

      
        <div>
          {
            this.state.tasks.map(task => this.renderTask(task)) 
          }
        </div>

      </Paper>
    )
  }
}

export default TaskList;