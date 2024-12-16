import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateTagDto } from './../dtos/create-tag.dto';
import { Injectable } from '@nestjs/common';
import { Tag } from '../tag.entity';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  public async create(createTagDto: CreateTagDto) {
    let tag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(tag);
  }

  public async findMultipleTags(tags: number[]) {
    let result = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return result;
  }

  public async delete(id: number) {
    await this.tagRepository.delete(id);

    return {
      deleted: true,
      id,
    };
  }

  public async softRemove(id: number) {
    await this.tagRepository.softDelete(id);

    return {
      deleted: true,
      id,
    };
  }
}
