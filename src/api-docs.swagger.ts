import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PageMetaDto } from './common/dtos/page-meta.dto';

export function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Houstep')
    .setDescription('Houstep 과제')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [PageMetaDto],
  });

  SwaggerModule.setup('api-docs', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
    },
  });
}
