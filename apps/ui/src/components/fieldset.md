```tsx frame
import { Fieldset, TextField } from 'ui';

<div>
  <Fieldset legend="Bill From">
    <TextField label="Street Address" />
    <div className="contents md:flex md:gap-3">
      <TextField label="City" fieldClass="flex-1" />
      <TextField label="Post Code" fieldClass="flex-1" />
      <TextField label="Country" fieldClass="flex-1" />
    </div>
  </Fieldset>
  <Fieldset legend="Bill To">
    <TextField label="Street Address" />
  </Fieldset>
</div>;
```
