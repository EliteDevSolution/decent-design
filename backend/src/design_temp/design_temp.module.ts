import { Module } from '@nestjs/common';
import { DesignTempController } from './design_temp.controller';
import { DesignTempService } from './design_temp.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DesignTemp } from './entities/design.temp.entity';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([DesignTemp, User]), UserModule],
  controllers: [DesignTempController],
  providers: [DesignTempService],
  exports: [TypeOrmModule],
})
export class DesignTempModule {}
