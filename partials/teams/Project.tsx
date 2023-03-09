import { useState } from "react";
import ProjectView from "./ProjectView";
import CreateProject from "./CreateProject";

const Project = ({team, setTeam, isEditable}) => {
    // api call to get if team project is created or not
    const [isProjectCreated, setIsProjectCreated] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const createProject = () => {
        // api call to create project
        setIsProjectCreated(true);
    }

    const editProject = () => {
        setIsEditing(true);
    }

    const saveProject = () => {
        // api call to save project
        setIsEditing(false);
    }

    const cancelEdit = () => {
        setIsEditing(false);
    }

    if(isProjectCreated) return <ProjectView project={team.project} editProject={editProject} isEditable={isEditable} />
    
    return <CreateProject createProject={createProject} isEditable={isEditable} />
};

export default Project;