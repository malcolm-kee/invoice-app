```tsx
const Demo = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);

  return (
    <Dropdown
      value={value}
      onChangeValue={setValue}
      options={options}
      placeholder="Please select"
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

## Disabled

```tsx
const Demo = () => {
  const [value, setValue] = React.useState<number | undefined>(undefined);

  return (
    <Dropdown
      value={value}
      onChangeValue={setValue}
      options={options}
      placeholder="Please select"
      disabled
    />
  );
};

const options = [
  {
    label: 'Pikachu',
    value: 25,
  },
];

<Demo />;
```

## Minimal

```tsx
const Demo = () => {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  return (
    <Dropdown
      value={value}
      onChangeValue={setValue}
      options={options}
      placeholder="Filter by status"
      variant="minimal"
    />
  );
};

const options = [
  {
    label: 'Draft',
    value: 'DRAFT',
    selectedLabel: 'Status: Draft',
  },
  {
    label: 'Pending',
    value: 'PENDING',
    selectedLabel: 'Status: Pending',
  },
  {
    label: 'Paid',
    value: 'PAID',
    selectedLabel: 'Status: Paid',
  },
];

<Demo />;
```
