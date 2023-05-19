import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResourcesProvider } from '../resources-provider.service';
import { ResourcesMicroserviceProvider } from './resources-microservice-provider.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [
    {
      provide: ResourcesProvider,
      useClass: ResourcesMicroserviceProvider,
    },
    {
      provide: 'RESOURCES_BASE_URL',
      useFactory: (configService: ConfigService) =>
        configService.get('RESOURCES_PROVIDER_BASE_URL'),
      inject: [ConfigService],
    },
  ],
  exports: [ResourcesProvider],
})
export class ResourcesMicroserviceProviderModule {}
