import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm'
import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [ 
    MoviesModule,
     TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'db_star_wars',
      autoLoadEntities: true,
      synchronize: true,
    }),
     UsersModule,
     AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
