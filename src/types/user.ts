export type User = {
  id: string;
  name: string;
  email: string;
  image: string;
  role: string;
};

export interface UserReservation {
  email: string;
  name: string;
}
