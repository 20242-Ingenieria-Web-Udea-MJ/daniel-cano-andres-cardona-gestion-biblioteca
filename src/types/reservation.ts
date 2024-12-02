import { BookReservation } from './book';
import { UserReservation } from './user';

export interface Reservation {
  book: BookReservation;
  user: UserReservation;
  id: string;
  returned: boolean;
  reservedAt: string;
}

export interface ReservationsResponse {
  reservations: Reservation[];
}
