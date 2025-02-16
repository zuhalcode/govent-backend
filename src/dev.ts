import { app, connectDB } from ".";

const PORT = 3001;

async function init() {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
}

init();
