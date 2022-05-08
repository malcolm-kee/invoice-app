```tsx
import { Dialog, Button } from 'ui';

const Demo = () => {
  const [isShown, setIsShown] = React.useState(false);

  return (
    <>
      <Button onClick={() => setIsShown(true)}>Open</Button>
      <Dialog open={isShown} onDismiss={() => setIsShown(false)}>
        <Dialog.Title>Confirm Deletion</Dialog.Title>
        <p className="text-sm text-gray-600 my-4">
          Are you sure you want to delete invoice #XM9141? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button onClick={() => setIsShown(false)} variant="light">
            Cancel
          </Button>
          <Button onClick={() => setIsShown(false)} variant="red">
            Delete
          </Button>
        </div>
      </Dialog>
    </>
  );
};

<Demo />;
```
