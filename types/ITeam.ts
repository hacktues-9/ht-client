export interface ITeam {
  id: string; // or maybe a hash string instead of db id - actually a good idea
  name: string;
  logo: string;
  isVerified: boolean;

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

export interface ITeamForm {
  name: string;
  logo: string;
  members: {
    id: string;
    role: string;
  }[];
  technologies: string[];
}
