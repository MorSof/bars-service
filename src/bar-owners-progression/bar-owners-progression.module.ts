import { BarOwnersProgressionController } from './controllers/bar-owners-progression.controller';
import { BarOwnersProgressionService } from './services/bar-owners-progression.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarOwnersProgressionEntity } from './entities/bar-owners-progression.entity';
import { BarOwnersProgressionDtoConverter } from './services/bar-owners-progression-dto.converter';
import { BarOwnersProgressionEntityConverter } from './services/bar-owners-progression-entity.converter';
import { Module } from '@nestjs/common';
import { ResourceModule } from '../resources/resource.module';
import { BarsModule } from '../bars/bars.module';

@Module({
  controllers: [BarOwnersProgressionController],
  providers: [
    BarOwnersProgressionService,
    BarOwnersProgressionEntityConverter,
    BarOwnersProgressionDtoConverter,
  ],
  imports: [
    TypeOrmModule.forFeature([BarOwnersProgressionEntity]),
    ResourceModule,
    BarsModule,
  ],
  exports: [BarOwnersProgressionService],
})
export class BarOwnersProgressionModule {}
