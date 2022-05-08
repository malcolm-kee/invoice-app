## Playground

```tsx
import { usePropsEditor } from 'react-showroom/client';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

const Playground = () => {
  const propsEditor = usePropsEditor({
    initialProps: {
      children: 'BUTTON',
    },
    controls: {
      children: 'text',
      LeftIcon: {
        type: 'select',
        options: [
          {
            label: 'PlusIcon',
            value: PlusIcon,
          },
          {
            label: 'PencilIcon',
            value: PencilIcon,
          },
          {
            label: 'TrashIcon',
            value: TrashIcon,
          },
        ],
      },
    },
  });

  return <Button {...propsEditor.props} />;
};

<Playground />;
```

## Variant

```tsx
import { Button } from 'ui';

<div className="flex items-center gap-4 flex-wrap">
  <Button>Mark as Paid</Button>
  <Button variant="secondary">Edit</Button>
  <Button variant="red">Delete</Button>
  <Button variant="light">Light</Button>
</div>;
```

## With Left Icon

```tsx
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

<div className="flex items-center gap-4 flex-wrap">
  <Button LeftIcon={PlusIcon}>New Invoice</Button>
  <Button LeftIcon={PencilIcon} variant="secondary">
    Edit
  </Button>
  <Button LeftIcon={TrashIcon} variant="red">
    Delete
  </Button>
</div>;
```

## Disabled

```tsx
<div className="flex items-center gap-4 flex-wrap">
  <Button disabled>New Invoice</Button>
  <Button disabled variant="secondary">
    Edit
  </Button>
  <Button disabled variant="red">
    Delete
  </Button>
</div>
```

## Full Width

```tsx
import { PlusSmIcon } from '@heroicons/react/solid';

<div className="flex flex-col items-center gap-4">
  <Button width="full">New Invoice</Button>
  <Button width="full" variant="secondary">
    Edit
  </Button>
  <Button width="full" variant="red">
    Delete
  </Button>
  <Button width="full" variant="light">
    <span className="flex items-center">
      <PlusSmIcon width={16} height={16} />
      Add New Item
    </span>
  </Button>
</div>;
```

## Other HTML element

Use `render` to customize the HTML element that will be rendered.

```tsx
import { ExternalLinkIcon } from '@heroicons/react/solid';

<Button
  variant="secondary"
  LeftIcon={ExternalLinkIcon}
  render={(btnProps) => (
    <a
      href="https://malcolmkee.com"
      target="_blank"
      rel="noopener noreferrer"
      {...btnProps}
    />
  )}
>
  View
</Button>;
```
