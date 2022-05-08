```tsx
const Demo = () => {
  const [value, setValue] = React.useState<undefined | Date>(undefined);
  return <DayPicker mode="single" selected={value} onSelect={setValue} />;
};

<Demo />;
```
