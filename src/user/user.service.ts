import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdatePatchUserDTO } from './dto/update-patch-user.dto';
import { UpdatePutUserDTO } from './dto/update-put-user.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class UserService {

  constructor(
    private readonly prisma: PrismaService
  ) {}

  async create(user: CreateUserDTO) {

    const { birthAt, ...rest } = user

    const birth: Date | null = birthAt ? new Date(birthAt) : null

    return this.prisma.user.create({
      data: {
        ...rest,
        birthAt: birth
      }
    })
  }

  async list() {
    return this.prisma.user.findMany()
  }

  async show(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id
      }
    })
  }

  async update(id: number, data: UpdatePutUserDTO) {

    await this.exists(id)

    const { birthAt, ...rest } = data

    const birth: Date | null = birthAt ? new Date(birthAt) : null

    return this.prisma.user.update({
      data: {
        birthAt: birth,
        ...rest
      },
      where: {
        id: id
      }
    })

  }

  async updatePartial(id: number, {email, name, password, birthAt}: UpdatePatchUserDTO) {

    await this.exists(id)

    const data: Prisma.UserUpdateInput = {}

    if (email) {
      data.email = email
    }

    if (name) {
      data.name = name
    }

    if (password) {
      data.password = password
    }

    if (birthAt) {
      data.birthAt = new Date(birthAt)
    }
    
    return this.prisma.user.update({
      data,
      where: {
        id: id
      }
    })

  }

  async destroy(id: number) {

    await this.exists(id)

    return this.prisma.user.delete({
      where: {
        id
      }
    })
  }

  async exists(id: number) {
    if (!await this.show(id)) throw new NotFoundException(`User id ${id} not exists.`)
  }

}