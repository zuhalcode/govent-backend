import { app, connectDB } from ".";

const PORT = 3000;

async function startServer() {
  await connectDB();
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
  );
}

startServer();
