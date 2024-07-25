export interface User {
  name: string;
  birthdate: string;
  username: string;
  email: string;
  password: string;
  ratings: { movieId: number; rating: number }[];
}
