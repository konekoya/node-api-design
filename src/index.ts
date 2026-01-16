import * as dotenv from 'dotenv';

// Make sure to put this in the entry file of your project so that
// env variables are loaded and available globally
dotenv.config();

import config from './config';
import app from './server';

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
