import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ResourcesProvider } from '../resources-provider.service';
import { ResourcesMicroserviceProvider } from './resources-microservice-provider.service';
import { HttpModule } from '@nestjs/axios';
import {
  ServerConfiguration,
  DefaultApi,
  createConfiguration,
} from '@morsof/resources-service-api';

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
    {
      provide: 'ResourcesApi',
      useFactory: (RESOURCES_BASE_URL: string) => {
        return new DefaultApi(
          createConfiguration({
            baseServer: new ServerConfiguration(RESOURCES_BASE_URL, {}),
          }),
        );
      },
      inject: ['RESOURCES_BASE_URL'],
    },
  ],
  exports: [ResourcesProvider],
})
export class ResourcesMicroserviceProviderModule {}
