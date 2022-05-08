```tsx
const Demo = () => {
  const [value, setValue] = React.useState<undefined | Date>(undefined);
  return (
    <DayField
      value={value}
      onChangeValue={setValue}
      placeholder="Select date"
      label="Start Date"
    />
  );
};

<Demo />;
```
