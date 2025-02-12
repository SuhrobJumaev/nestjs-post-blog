import {
  Body,
  Controller,
  Delete,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagService: TagsService) {}

  @Post()
  public create(@Body() createTagDto: CreateTagDto) {
    return this.tagService.create(createTagDto);
  }

  @Delete()
  public async delete(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.delete(id);
  }

  @Delete('soft-delete')
  public async softDelete(@Query('id', ParseIntPipe) id: number) {
    return this.tagService.softRemove(id);
  }
}
