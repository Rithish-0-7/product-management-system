import { app } from './app';
import { env } from './config/env';
import { prisma } from './config/prisma';

async function bootstrap() {
  try {
    await prisma.$connect();
    app.listen(env.port, () => {
      console.log(`Backend server running on port ${env.port}`);
    });
  } catch (error) {
    console.error('Failed to start server', error);
    process.exit(1);
  }
}

bootstrap();
