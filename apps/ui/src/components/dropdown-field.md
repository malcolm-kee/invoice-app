```tsx
const Demo = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);

  return (
    <DropdownField
      value={value}
      onChangeValue={setValue}
      options={options}
      placeholder="Please select"
      label="Pokemon"
    />
  );
};

const options = [
  {
    label: 'Pikachu',
    value: 25,
  },
  {
    label: 'Bulbasaur',
    value: 1,
  },
  {
    label: 'Charmander',
    value: 4,
  },
];

<Demo />;
```
