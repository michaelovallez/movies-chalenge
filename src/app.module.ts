import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SwapiModule } from './swapi/swapi.module';
@Module({
  imports: [ 
    MoviesModule,
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_movies',
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
