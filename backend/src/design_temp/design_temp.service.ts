import { Injectable } from '@nestjs/common';
import { DesignTemp } from './entities/design.temp.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDesignTemp } from './dto/create.design.temp';
import { UpdateDesignTemp } from './dto/update.design.temp';
import { UserService } from 'src/user/user.service';

@Injectable()
export class DesignTempService {
  constructor(
    @InjectRepository(DesignTemp)
    private tempRepository: Repository<DesignTemp>,
    private readonly userService: UserService,
  ) {}

  async findAll() {
    try {
      return await this.tempRepository.find();
    } catch (error) {
      return error;
    }
  }

  async findOne(id: number) {
    try {
      const design_temp = await this.tempRepository.findOneBy({ id });
      return design_temp;
    } catch (error) {
      return error;
    }
  }

  async create(
    createDesignTemp: CreateDesignTemp,
    user: any,
  ): Promise<CreateDesignTemp> {
    const definedUser: any = await this.userService.getProfile(user);

    const newDesignTemp = this.tempRepository.create({
      design_name: createDesignTemp.design_name,
      content: createDesignTemp.content,
      user_id: definedUser.id,
    });
    return this.tempRepository.save(newDesignTemp);
  }

  async update(updateDesignTemp: UpdateDesignTemp): Promise<UpdateDesignTemp> {
    const id = updateDesignTemp.id;

    const design_temp = await this.tempRepository.findOneBy({ id });

    design_temp.design_name = updateDesignTemp.design_name;
    design_temp.content = updateDesignTemp.content;
    return this.tempRepository.save(design_temp);
  }

  async remove(id: number): Promise<void> {
    const result = await this.tempRepository.delete(id);

    if (result.affected === 0) {
      throw new Error('Temp not found');
    }
  }
}
