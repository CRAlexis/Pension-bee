import 'module-alias/register';
import express from 'express';
import dotenv from 'dotenv'
import Routes from './routes';

const routes = Routes.getInstance();
const app = express();
dotenv.config()

app.get('*', routes.index)
app.listen(process.env.PORT ?? 8080, () => {
    // Log.info("Server running");
});

export default app;