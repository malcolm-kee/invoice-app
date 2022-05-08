```tsx frame height=500
import { Button, SlideOver } from 'ui';

const Demo = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-3 flex-wrap">
      <Button onClick={() => setOpen(true)}>Open</Button>
      <SlideOver open={open} onDismiss={() => setOpen(false)}>
        <SlideOver.Header title="SlideOver demo" showDismissBtn={false} />
        <SlideOver.Content>
          <Button>Something</Button>
        </SlideOver.Content>
        <SlideOver.Footer className="flex justify-between gap-3">
          <Button variant="red" onClick={() => setOpen(false)}>
            Discard
          </Button>
          <div className="flex gap-3">
            <Button variant="secondary">Save as Draft</Button>
            <Button>Save {'&'} Send</Button>
          </div>
        </SlideOver.Footer>
      </SlideOver>
    </div>
  );
};

<Demo />;
```

### Slide from left

```tsx frame height=500
import { Button, SlideOver } from 'ui';

const Demo = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="flex gap-3 flex-wrap">
      <Button onClick={() => setOpen(true)}>Open</Button>
      <SlideOver open={open} onDismiss={() => setOpen(false)} from="left">
        <SlideOver.Header title="SlideOver demo" />
        <SlideOver.Content>
          <Button>Something</Button>
        </SlideOver.Content>
      </SlideOver>
    </div>
  );
};

<Demo />;
```

### With Offset

```tsx frame height=500
import { Button, SlideOver } from 'ui';

const Demo = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <div className="h-screen flex">
      <nav className="w-16 bg-purple-500 fixed inset-y-0 left-0 shadow rounded-r-xl z-30" />
      <main className="flex-1 p-3 pl-16">
        <div className="flex gap-3 flex-wrap">
          <Button onClick={() => setOpen(true)}>Open</Button>
          <SlideOver
            open={open}
            onDismiss={() => setOpen(false)}
            from="left"
            rootClass="pl-16"
          >
            <SlideOver.Header title="SlideOver demo" />
            <SlideOver.Content>
              <Button>Something</Button>
            </SlideOver.Content>
          </SlideOver>
        </div>
      </main>
    </div>
  );
};

<Demo />;
```
