import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SwapiModule } from './swapi/swapi.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [ 
    MoviesModule,
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_SCHEMA,
      autoLoadEntities: true,
      synchronize: true,
    }),
     UsersModule,
     AuthModule,
     SwapiModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
