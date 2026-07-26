import app from "./app.js";
import { envVars } from "./app/config/env.js";

const port = envVars.PORT;



const  bootstrap = async () => {

      try {
        app.listen(port, () => {
          console.log(`Server is running on http://localhost:${envVars.PORT}`);
        });
      }catch (error) {
        console.error('Error starting the server:', error);
      }
}

bootstrap();