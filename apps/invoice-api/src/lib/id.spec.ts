import { prettifyId, decodeId } from './id';

test('prettifyId', () => {
  expect(
    prettifyId({
      id: 38,
      name: 'Malcolm',
    })
  ).toStrictEqual({
    id: 'AA0038',
    name: 'Malcolm',
  });

  expect(
    prettifyId({
      id: 892399,
      name: 'Yakult',
      items: ['zzzz'],
    })
  ).toStrictEqual({
    id: 'IJ2399',
    name: 'Yakult',
    items: ['zzzz'],
  });
});

test('decodeId', () => {
  expect(decodeId('IJ2399')).toBe(892399);

  expect(
    decodeId(
      prettifyId({
        id: 38,
        name: 'Malcolm',
      }).id
    )
  ).toBe(38);
});
