import './stylesheets/components.scss';
import React from 'react';
import jQuery from 'jquery';

class ProjectsForm extends React.Component{

  constructor(){
    super();
  }

  saveProject(event){
    event.preventDefault();
    var component = this;

    var formData = {
      name: component.refs.projectName.value,
      description: component.refs.projectDescription.value,
      start_date: component.refs.projectStartDate.value
    }

    jQuery.ajax({
      type: "POST",
      url: "http://checktaskmanager.herokuapp.com/projects.json",
      contentType: "application/json",
      dataType: "json",
      data: JSON.stringify({
        project: formData
      })
    }).done(function(data){
      console.log(data);
      // on successful post, receiving 200 status from the server, we want to tell our parent
      // that we have changed.
      // our parent was so kind to give us the 'onChange' property :)
      // the onChange property in the parent fires the 'renderTasks' method,
      // reloading the state with the updated tasks.
      component.props.onChange();
    }).fail(function(data){
      console.log(data);
      // we want to show what went wrong on the page, so the user
      // knows what happened and how to fix it.
      component.setState({
        errors: data.statusText
      });
      component.props.onError(component.state.errors);

    });

  }

  render(){
    return(

      <form className="form well" onSubmit={this.saveProject.bind(this)}>

        <div className="form-group">
          <h3> Add a project:</h3>
          <label className="sr-only">Project name</label>
          <input className="form-control" type="text" ref="projectName" placeholder="Project Name" />
        </div>
        <div className="form-group">
          <label className="sr-only">Project description</label>
          <textarea rows="4" cols="40" className="form-control" type="text" ref="projectDescription" placeholder="Project Description" />
        </div>
        <div className="form-group">
          <label className="sr-only">Start Date</label>
          <input className="form-control" type="date" min="2016-01-01" ref="projectStartDate"/>
        </div>
        <button type="submit" className="btn btn-info">+</button>
      </form>
    );
  }

}

export default ProjectsForm;
