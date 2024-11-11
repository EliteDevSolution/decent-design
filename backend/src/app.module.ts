import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { MailModule } from './mail/mail.module';
import { DesignTempModule } from './design_temp/design_temp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    MailModule,
    DesignTempModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
