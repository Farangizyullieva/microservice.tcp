import { Body, Controller, Delete, Get, Inject, Param, ParseIntPipe, Patch, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { CreateUserDto } from "./dto/create-user.dto";
import { firstValueFrom } from 'rxjs'
import { UpdateUserDto } from "./dto/update-user.dto";

@Controller('user')
export class UserController {
    constructor(
        @Inject('USER_SERVICE') private readonly userClient: ClientProxy
    ) { }

    @Post()
    async create(@Body() dto: CreateUserDto) {
        return await firstValueFrom(
            this.userClient.send({ cmd: 'createUser' }, dto)
        )
    }

    @Get()
    async findAll() {
        return await firstValueFrom(this.userClient.send({ cmd: 'findAllUser' }, {}))

    }
    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(this.userClient.send({ cmd: 'findOneUser' }, { id }))
    }

    @Patch(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        return await firstValueFrom(
            this.userClient.send(
                { cmd: 'updateUser' },
                { ...updateUserDto, id },
            ),
        );
    }


    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        return await firstValueFrom(this.userClient.send({ cmd: 'removeUser' }, { id }))
    }
}
