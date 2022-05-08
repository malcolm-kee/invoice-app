import * as React from 'react';
import { noop } from 'ui';

export const usePersist = <Value>({
  getValue,
  storageKey,
  interval = 3000,
}: {
  getValue: () => Value;
  storageKey: string;
  interval?: number;
}) => {
  const cleanupRef = React.useRef(noop);

  React.useEffect(() => {
    if (interval) {
      const intervalId = window.setInterval(() => {
        const value = getValue();

        window.localStorage.setItem(storageKey, JSON.stringify(value));
      }, interval);

      const cleanup = () => {
        window.clearInterval(intervalId);
        window.localStorage.removeItem(storageKey);
      };

      cleanupRef.current = cleanup;

      return cleanup;
    }
  }, [interval, storageKey]);

  function cleanup() {
    cleanupRef.current();
  }

  const [initialValue] = React.useState(() => {
    const initialStoredValue = window.localStorage.getItem(storageKey);

    return initialStoredValue && JSON.parse(initialStoredValue);
  });

  return {
    cleanup,
    initialValue: initialValue as Value,
  };
};
