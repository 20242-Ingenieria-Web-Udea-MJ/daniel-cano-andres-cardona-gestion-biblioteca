export interface Book {
  id: string;
  title: string;
  author: string;
  image: string;
  genre: string;
  copies_available: number;
}

export interface BookReservation {
  author: string;
  title: string;
}
