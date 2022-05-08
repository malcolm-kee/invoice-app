import invariant from 'tiny-invariant';

const charMap = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
const numToChar = (num: string) => charMap[Number(num)] || charMap[0];
const charToNum = (char: string) => {
  const index = charMap.indexOf(char);

  return index === -1 ? 0 : index;
};

export const formatId = (id: number) => {
  const idString = String(id).padStart(6, '0');

  const [firstChar, secondChar] = idString;

  return `${numToChar(firstChar)}${numToChar(secondChar)}${idString.slice(2)}`;
};

export const prettifyId = <Record extends { id: number }>(
  record: Record
): Omit<Record, 'id'> & { id: string } => ({
  ...record,
  id: formatId(record.id),
});

export const decodeId = (id: string) => {
  invariant(typeof id === 'string', 'Id must be of type string.');
  invariant(id.length === 6, 'Id must be 6 characters.');

  return Number(`${charToNum(id[0])}${charToNum(id[1])}${id.slice(2)}`);
};
