import app from './src/app.js';
import { config } from './src/config/config.js';
import connectionDB from './src/config/db.js';

const serverStart = async () => {
  try {
    const port = config.port || 6000;

    await connectionDB();

    app.get("/", (req, res) => {
      res.send("Server is running");
    });

    app.listen(port, () => {
      console.log(`App is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error starting the server:", error);
    process.exit(1); // Exit the process with a failure code
  }
};

serverStart();
