export interface Movie {
  id: number;
  name: string;
  synopsis: string;
  mainPoster: string;
  avgUserScore: number;
  releaseDate: string;
  directors: string[];
  actors: string[];
  writers: string[];
  genres: string[];
  duration: number;
  personalRating?: number;
  watched?: boolean;
  wantToWatch?: boolean;
}
