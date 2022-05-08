import * as React from 'react';
import { createNamedContext } from '~/lib/create-named-context';
import { noop } from '~/lib/fn-lib';

export interface FieldContextType {
  inputId: string | undefined;
  setInputId: React.Dispatch<React.SetStateAction<string>>;
  status: 'success' | 'error' | undefined;
}

export const FieldContext = createNamedContext<FieldContextType>(
  'FieldContext',
  {
    inputId: undefined,
    setInputId: noop,
    status: undefined,
  }
);

export const useFieldControlContext = (providedId: string | undefined) => {
  const reactId = React.useId();
  const id = providedId || reactId;

  const { inputId, setInputId, status } = React.useContext(FieldContext);

  React.useEffect(() => {
    if (id) {
      setInputId(id);
    }
  }, [id, setInputId]);

  return {
    inputId: id || inputId, // so input id is provided even there is no Field wrapper
    status,
  };
};
