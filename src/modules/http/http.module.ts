import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
    }),
  ],
})
export class CustomHttpModule {}
