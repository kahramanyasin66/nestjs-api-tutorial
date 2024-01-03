import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Bookmark } from '@prisma/client';

@Injectable()
export class BookmarkService {
  constructor(private prismaService: PrismaService) {}

  async findMany(): Promise<Bookmark[]> {
    return this.prismaService.bookmark.findMany({
      select: {
        id: false,
        createdAt: true,
        updatedAt: true,
        title: true,
        description: true,
        link: true,
        userId: false,
      },
    } as any);
  }
}
