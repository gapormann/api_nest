import { Controller, Post, Body, Get, Param, Put, Patch, Delete, ParseIntPipe } from '@nestjs/common'
import { CreateUserDTO } from './dto/create-user.dto'
import { UpdatePutUserDTO } from './dto/update-put-user.dto'
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {

  constructor (
    private readonly userService: UserService
  ) {}

  @Post()
  async create(@Body() newUser: CreateUserDTO) {
    return this.userService.create(newUser)
  }

  @Get('list')
  async list() {
    return { users: [] }
  }

  @Get(':id')
  async show(@Param('id', ParseIntPipe) id: number) {
    return { user: {}, id }
  }

  @Put(':id')
  async update(@Body() body: UpdatePutUserDTO, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'put',
      ...body, 
      id
    }
  }

  @Patch(':id')
  async partialUpdate(@Body() body: UpdatePatchUserDTO, @Param('id', ParseIntPipe) id: number) {
    return {
      method: 'patch',
      body, 
      id
    }
  }

  @Delete(':id')
  async destroy(@Param('id', ParseIntPipe) id: number) {
    return {id}
  }

}
