import React from "react";

import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import {withStyles} from "@material-ui/core/styles";

const CssTextField = withStyles({
    root: {
        "& input:valid": {
            paddingTop: "10px",
            paddingLeft: "18px",
        },
        "& input:focus": {
            paddingLeft: "0",
        },
        "& .MuiInput-underline:not(.Mui-disabled):before": {
            borderBottomColor: "white",
            "&:hover fieldset": {
                borderBottomColor: "white",
            },
        },
        //:not(.Mui-disabled)
        "& .MuiInput-underline:after": {
            borderBottomColor: "blue",
        },
    },
})(TextField);

const CssIconButton = withStyles({
    root: {
        paddingLeft: "0",
        paddingRight: "0",
    },
})(IconButton);

class Task extends React.Component {
    state = {
        newName: this.props.value.task
    }

    handleInputChange = (event) => {
        console.log(event.target.value)

        this.props.editTask(event.target.value)

        this.setState({
            newName: event.target.value
        })
    }

    render() {
        return (

        <Box ml={1} mb={1}>
        <Grid container display="flex" justify="center">
            <Grid item xs={1}>
                <Checkbox
                    type="checkbox"
                    onChange={() => this.props.doneTask()} 
                    checked={this.props.value.completed}
                    color="secondary" 
                />
            </Grid>
            <Grid item xs={10}>
                <CssTextField 
                    fullWidth
                    onChange={this.handleInputChange}
                    value={this.state.newName}
                />
            </Grid>
            <Grid item xs={1}>
                <CssIconButton 
                    color="secondary" 
                    onClick={() => this.props.deleteTask()} 
                    className="material-icons">close</CssIconButton>
            </Grid>    
        </Grid>
        </Box>
        );
    }
}

export default Task;