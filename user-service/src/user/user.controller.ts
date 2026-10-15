
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  @MessagePattern({ cmd: 'createUser' })
  create(@Payload() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @MessagePattern({ cmd: 'findAllUser' })
  findAll() {
    return this.userService.findAll();
  }

  @MessagePattern({ cmd: 'findOneUser' })
  findOne(@Payload() data: { id: number }) {
    return this.userService.findOne(data.id);
  }

  @MessagePattern({ cmd: 'updateUser' })
  update(@Payload() dto: UpdateUserDto) {
    return this.userService.update(dto.id, dto);
  }

  @MessagePattern({ cmd: 'removeUser' })
  remove(@Payload() data: { id: number }) {
    return this.userService.remove(data.id);
  }
}
