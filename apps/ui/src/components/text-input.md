```tsx
const Demo = () => {
  const [value, setValue] = React.useState('Lorem Ipsum Dolor');

  return <TextInput value={value} onChangeValue={setValue} />;
};

<Demo />;
```

## Disabled

```tsx
<TextInput value="Disabled Input" disabled />
```
