import { createApp } from './app';

const PORT = 4888;

const app = createApp();

app.listen(PORT, () =>
  console.log(`Server listen at http://localhost:${PORT}`)
);
