interface ITeam {
  id: string; // or maybe a hash string instead of db id - actually a good idea
  name: string;
  logo: string;

  members: {
    id: string;
    name: string;
    profilePicture: string;
    role: string;
    class: string;
    email?: string;
    discord?: string;
    github?: string;
  }[];

  project: {
    id: string;
    name: string;
    description: string;

    github: string;
    website?: string;

    technologies: string[];
    photos?: string[];
  };

  technologies: string[];
}

const CreateTeam = () => {
  // if in team redirect to team page

  return (
    <div>
        <h1>Create Team</h1>
        <form>
            <label htmlFor="name">Team Name</label>
            <input type="text" name="name" id="name" />
            <label htmlFor="logo">Team Logo</label>
            <input type="file" name="logo" id="logo" />
            <label htmlFor="project">Project Name</label>
            <input type="text" name="project" id="project" />
            <label htmlFor="description">Project Description</label>
            <input type="text" name="description" id="description" />   
            <label htmlFor="github">Project Github</label>
            <input type="text" name="github" id="github" />
            <label htmlFor="website">Project Website</label>
            <input type="text" name="website" id="website" />
            <label htmlFor="technologies">Project Technologies</label>
            <input type="text" name="technologies" id="technologies" />
            <label htmlFor="photos">Project Photos</label>
            <input type="file" name="photos" id="photos" multiple />
            <label htmlFor="members">Team Members</label>
            <input type="text" name="members" id="members" />
            <label htmlFor="role">Team Member Role</label>
            <input type="text" name="role" id="role" />
            <label htmlFor="class">Team Member Class</label>
            <input type="text" name="class" id="class" />
            <label htmlFor="email">Team Member Email</label>
            <input type="text" name="email" id="email" />
            <label htmlFor="discord">Team Member Discord</label>
            <input type="text" name="discord" id="discord" />
            <label htmlFor="github">Team Member Github</label>
            <input type="text" name="github" id="github" />
            <button type="submit">Create Team</button>
        </form>
    </div>
  );
};

export default CreateTeam;
