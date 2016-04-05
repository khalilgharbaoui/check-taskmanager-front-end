import './stylesheets/components.scss';
import React from 'react';
import jQuery from 'jquery';
import { Link } from 'react-router';
import EditTextField from './EditTextField';
import EditDateField from './EditDateField';


class ProjectItem extends React.Component{

    constructor(){
      super();
      //sets the state for this item
      this.state = {
    loading: true
  };
    }

    componentDidMount() {
    this.setState({
      id: this.props.id,
      name: this.props.name,
      description: this.props.description,
      start_date: this.props.start_date,
      completed: this.props.completed,
      createdAt: this.props.createdAt,
      updatedAt: this.props.updatedAt,
      loading: !!!this.props.id
    });
  }

  updateName(newName) {
    console.log(newName);
    this.syncState({name: newName});
  }

  updateDescription(newDescription) {
    console.log(newDescription);
    this.syncState({description: newDescription});
  }



  syncState(updatedState) {
    console.log("Syncing state!");

    this.setState({
      loading: true
    });
    // we need to rename ourselves again
    let component = this;


    // lets assign the task id to a new variable
    var projectId = component.props.id;

    let newState = jQuery.extend({
      id: this.state.id,
      name: this.state.name,
      description: this.state.description,
      start_date:this.state.start_date,
      completed: this.state.completed
    }, updatedState);

    this.setState(newState);

    console.log(newState);

    jQuery.ajax({
      type: "PUT",
      url: `http://checktaskmanager.herokuapp.com/projects/${projectId}`,
      data: JSON.stringify({
          project: newState
      }),
      contentType: "application/json",
      dataType: "json"
    })
      .done(function(data) {
        console.log(data);

        component.setState({
          id: data.project.id,
          name: data.project.name,
          description: data.project.description,
          start_date: data.project.start_date,
          completed: data.project.completed,
          createdAt: data.project.created_at,
          updatedAt: data.project.updated_at
        });
      })

      .fail(function(error) {
        console.log(error);
      })

      .always(function() {
        component.setState({
          loading: false
        });
        component.props.onChange();
      });
  }

  getClassName() {
    let _classNames = ["list-group-item project"];
    if (this.state.loading) { _classNames.push("loading"); }
    if (this.state.completed) { _classNames.push("completed"); }
    return _classNames.join(" ");
  }







    deleteProject(event){
      event.preventDefault();

      // we need to rename ourselves again
      var component = this;

      // lets assign the task id to a new variable
      var projectId = component.props.id;

      jQuery.ajax({
        method: "DELETE",

        // we have to apend the task id to the url, so the server knows which task to delete.
        url: `http://checktaskmanager.herokuapp.com/projects/${projectId}`,
        contentType: "application/json",
        dataType: "json"
      })
      .done(function(data){
        // when done and the task is removed, we receive a
        // 200 message from the server via ajax/JSON.
        // our parent we changed via an onChange prop. This should then fire the reloadTask method in the parent
        // to reload the updated tasks list from the server
        console.log(data);
        component.props.onChange();
      });
    }

    render(){
      return(
        <div className={this.getClassName()}>
				    <Link to={`/project/${this.props.id}`} className="btn btn-info btn-xs view-project">🔎 view</Link>
              <a className="btn btn-danger btn-xs pull-right vp" onClick={this.deleteProject.bind(this)}>X</a>

        <h4 className="list-group-item-heading">
          <EditTextField value={this.state.name} onChange={this.updateName.bind(this)} isEditable={!this.state.completed} />
        </h4>
        <strong>Project start date: <EditDateField value={this.state.start_date} onChange={this.updateDescription.bind(this)} isEditable={!this.state.completed} /></strong>

        <p><EditTextField value={this.state.description} onChange={this.updateDescription.bind(this)} isEditable={!this.state.completed} /></p>
    </div>
      );
    };
}

export default ProjectItem;
