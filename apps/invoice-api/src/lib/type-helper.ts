import { Prisma } from '../prisma';

export type ArrayMember<T extends any[]> = T[number];

export type Maybe<T> = T | null;

type StringifiedTypes = Prisma.Decimal | Date;

export type DataToJson<T> = {
  [P in keyof T]: T[P] extends StringifiedTypes
    ? string
    : T[P] extends Maybe<StringifiedTypes>
    ? string | null
    : T[P] extends object
    ? DataToJson<T[P]>
    : T[P];
};
