import { Controller, Get, UseGuards, Body, Post } from '@nestjs/common';
import { DesignTempService } from './design_temp.service';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { GetUser } from 'src/user/decorators/get-user-decorator';
import { CreateDesignTemp } from './dto/create.design.temp';
import { UpdateDesignTemp } from './dto/update.design.temp';

@Controller('api/design_temp')
export class DesignTempController {
  constructor(private readonly designTempservice: DesignTempService) {}

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async getDesignTemps() {
    return await this.designTempservice.findAll();
  }

  @Post('/findOne')
  @UseGuards(JwtAuthGuard)
  async getDesignTemp(@Body() id: number) {
    return await this.designTempservice.findOne(id);
  }

  @Post('/create')
  @UseGuards(JwtAuthGuard)
  async create(
    @Body() createDesignTemp: CreateDesignTemp,
    @GetUser() user: any,
  ) {
    try {
      await this.designTempservice.create(createDesignTemp, user);
      return {
        status: 'success',
        description: 'created successfully.',
      };
    } catch (error) {
      return {
        status: error,
        description: 'created faield.',
      };
    }
  }

  @Post('/update')
  @UseGuards(JwtAuthGuard)
  async update(@Body() updateDesignTemp: UpdateDesignTemp) {
    try {
      await this.designTempservice.update(updateDesignTemp);
      return {
        status: 'success',
        description: 'updated successfully.',
      };
    } catch (error) {
      return {
        status: 'error',
        description: 'updated faield.',
      };
    }
  }

  @Post('/remove')
  @UseGuards(JwtAuthGuard)
  async remove(@Body() id: number) {
    try {
      await this.designTempservice.remove(id);
      return {
        status: 'success',
        description: 'removed successfully.',
      };
    } catch (error) {
      return {
        status: 'error',
        description: 'removed faield.',
      };
    }
  }
}
