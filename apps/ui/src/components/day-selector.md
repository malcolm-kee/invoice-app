```tsx
const Demo = () => {
  const [value, setValue] = React.useState<undefined | Date>(undefined);
  return (
    <DaySelector
      value={value}
      onChangeValue={setValue}
      placeholder="Select date"
    />
  );
};

<Demo />;
```
