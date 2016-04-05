import './stylesheets/components.scss';
import React from 'react';
import jQuery from 'jquery';
import ProjectItem from './ProjectItem';
import ProjectForm from './ProjectForm';

class ProjectList extends React.Component{

  constructor(){
    super();

    this.state = {
      projects: []
    }
  }

  renderProjects(){

    // we need to rename ourselves
    var component = this;

    // we get the data from the backend via ajax using json
    jQuery.getJSON("http://checktaskmanager.herokuapp.com/projects.json", function(data){
      console.log(data);
      component.setState({
        projects: data.projects
      });
    });

  }

  viewNewProject(){
    // we want to render the project page after successfully adding a new project
  }

  componentDidMount(){
    this.renderProjects();
  }

    render(){
        return (
          <div>
            <ProjectForm onChange={this.renderProjects.bind(this)} />
              <div className="list-group">
                {this.state.projects.map(function(project, i){
              return(
                <ProjectItem key={project.id}
                         id={project.id}
                         name={project.name}
                         description={project.description}
                         start_date={project.start_date}
                         createdAt={project.created_at}
                         onChange={this.renderProjects.bind(this)}
                 />
              );
            }, this)}
          </div>
        </div>
        );
    }
  }

export default ProjectList;
