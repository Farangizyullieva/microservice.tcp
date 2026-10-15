import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { RpcException } from '@nestjs/microservices';
import {hash} from 'bcrypt'

@Injectable()
export class UserService {
  constructor (private readonly prisma : PrismaService) {}
  async create(createUserDto: CreateUserDto) {
    const existsname = await this.prisma.user.findUnique({where : {username: createUserDto.username}})
    if (existsname) {
      throw new RpcException('Username already exists ')
    }
    const existsPhone = await this.prisma.user.findUnique({where : {phone : createUserDto.phone}})
    if (existsPhone) {
      throw new RpcException('Phone number is already exists ')
    }
    const hashedPass = await hash(createUserDto.password, 7)
    const user = await this.prisma.user.create ({
      data : {...createUserDto , password : hashedPass}
    });
    return {
      id : user.id,
      username : user.username,
      phone : user.phone,
    }
  }

  async findAll() {
     return this.prisma.user.findMany({
      select : {
        id : true , 
        username : true , 
        phone : true , 
      
      }
    });
    
  }

  
  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({where : {id},  select : {
        id : true , 
        username : true , 
        phone : true , 
  
      }})
      
    if (!user) {
      throw new RpcException ({statuscode : 404, message : 'User not found'})
    }
    return user 
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
     await this.findOne(id)
    const user = await this.prisma.user.update({where : {id} , data : updateUserDto})
    return {
      
      id : user.id,
      username : user.username,
      phone : user.phone,
    }
  }

  async remove(id: number) {
    await this.findOne(id)
    await this.prisma.user.delete({where : {id}})
    return {isDeleted : true }
  }
}
