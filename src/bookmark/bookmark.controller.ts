import { Controller, Get } from '@nestjs/common';
import { Bookmark } from '@prisma/client';
import { BookmarkService } from './bookmark.service';

@Controller('bookmarks')
export class BookmarkController {
  constructor(private bookmarkService: BookmarkService) {}
  @Get()
  async getAllBookmarks(): Promise<Bookmark[]> {
    return this.bookmarkService.findMany();
  }
}
