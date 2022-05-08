import * as React from 'react';

export const createNamedContext = <ContextType>(
  displayName: string,
  defaultValue: ContextType
) => {
  const context = React.createContext(defaultValue);
  context.displayName = displayName;
  return context;
};
