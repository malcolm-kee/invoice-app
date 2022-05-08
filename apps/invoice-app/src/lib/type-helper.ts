export type NumToString<T> = {
  [P in keyof T]: T[P] extends number
    ? string
    : T[P] extends object
    ? NumToString<T[P]>
    : T[P];
};
