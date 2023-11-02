import { Injectable } from "@nestjs/common/decorators";
import {PrismaClient} from '@prisma/client';
@Injectable()
export class PrismaService extends PrismaClient {
  constructor(){
    super({
      datasources: {
        db:{
          url:'postgresql://postgres:12345@localhost:5434/nestapitutorial?schema=public'
        },
      },
    }) ;
  }


 }
