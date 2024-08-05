import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from '@assignment/user';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/penny'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
