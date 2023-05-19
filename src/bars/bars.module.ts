import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceModule } from '../resources/resource.module';
import { BarsService } from './services/bars.service';
import { BarsEntityConverter } from './services/bars-entity.converter';
import { BarsDtoConverter } from './services/bars-dto.converter';
import { BarsController } from './controllers/bars.controller';
import { BarEntity } from './entities/bar.entity';

@Module({
  controllers: [BarsController],
  providers: [BarsService, BarsEntityConverter, BarsDtoConverter],
  imports: [TypeOrmModule.forFeature([BarEntity]), ResourceModule],
  exports: [BarsService],
})
export class BarsModule {}
