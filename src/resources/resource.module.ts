import { Module } from '@nestjs/common';
import { ResourcesDtoConverter } from './convertes/resources-dto.converter';
import { ResourcesService } from './services/resources.service';
import { ResourcesMicroserviceProviderModule } from './providers/resources-microservice-provider/resources-microservice-provider.module';

@Module({
  imports: [ResourcesMicroserviceProviderModule],
  providers: [ResourcesDtoConverter, ResourcesService],
  exports: [ResourcesDtoConverter, ResourcesService],
})
export class ResourceModule {}
