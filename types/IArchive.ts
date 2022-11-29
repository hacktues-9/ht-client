interface ISponsor {
  name: string;
  logo: string;
  url: string;
}

interface ICard {
  id?: number;
  name: string;
  shortDescription: string;
  description?: string;
  date: string;
  location: string;
  backgroundImg: string;
  classNames: string;
  url: string;
  sponsors?: ISponsor[];
}

export type { ICard, ISponsor };