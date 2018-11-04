import { Module } from '@nestjs/common';
import { SharedModule } from '../shared/shared.module';
import { DlibinnetController } from './dlibinnet.controller';

@Module({
  imports: [SharedModule],
  controllers: [DlibinnetController]
})
export class DlibinnetModule {}
