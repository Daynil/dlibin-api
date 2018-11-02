import { Module } from '@nestjs/common';
import { SharedModule } from 'shared/shared.module';
import { InnerPathController } from './inner-path.controller';

@Module({
  imports: [SharedModule],
  controllers: [InnerPathController]
})
export class InnerPathModule {}
