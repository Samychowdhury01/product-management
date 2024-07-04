/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import router from './app/routes';
import { z } from 'zod';
import notFound from './app/middlewares/notFound';
const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});





// Global Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // Handling the Zod error with a professional error message
  if (err instanceof z.ZodError) {
    res.status(400).json({
      success: false,
      message: `${
        err?.issues[0]?.message !== 'Required'
          ? `${err?.issues[0]?.code} : ${err?.issues[0]?.message}`
          : 'field is required! Please provide required data.'
      }`,
      error: err?.issues,
    });
  } 
  else if(err?.code === 11000 && err.keyPattern.name){
    res.status(400).json({
      success: false,
      message: "Product name must be unique. The name already exists.",
    });
  }
  
  else {
    // Sending JSON response with error details
    res.status(400).json({
      success: false,
      message: err.message || 'Something went wrong!',
      error: err,
    });
  }
});


// apply not found route
app.use(notFound)



export default app;


