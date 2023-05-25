import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BarsModule } from './bars/bars.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarEntity } from './bars/entities/bar.entity';
import { BarOwnersProgressionEntity } from './bars/entities/bar-owners-progression.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [BarEntity, BarOwnersProgressionEntity],
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    BarsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
