import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    const list = generateLinkedList(['Jack', 'Crow']);
    expect(list).toStrictEqual({
      value: 'Jack',
      next: { value: 'Crow', next: { value: null, next: null } },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const list = generateLinkedList(['Jack', 'Crow']);
    expect(list).toMatchInlineSnapshot(`
      {
        "next": {
          "next": {
            "next": null,
            "value": null,
          },
          "value": "Crow",
        },
        "value": "Jack",
      }
    `);
  });
});
