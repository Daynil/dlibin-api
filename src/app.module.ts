import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { DlibinnetModule } from './dlibinnet/dlibinnet.module';
import { InnerPathModule } from './inner-path/inner-path.module';

@Module({
  imports: [InnerPathModule, DlibinnetModule],
  controllers: [AppController]
})
export class AppModule {}
