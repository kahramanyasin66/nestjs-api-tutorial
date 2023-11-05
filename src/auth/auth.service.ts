import { ForbiddenException, Injectable, } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable({})
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signup(dto: AuthDto) {
        // generate the password 
        const hash = await argon.hash(dto.password);
        try {
            // save the new user in the db
            const user = await this.prismaService.user.create({
                data: {
                    email: dto.email,
                    hash,
                    firstName: dto.firstName,
                    lastName: dto.lastName,
                },
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    createdAt: true,
                    email:true,
                }
            });
           //  delete user.createdAt; // görünmesini istemediğimiz değerler için normalde hash olacak
            // return the saved user
            return this.signToken(user.id, user.email);
        }
        catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credentials taken');
                }
            }

        }


    }

    async signin(dto: AuthDto) {
        // find the user by email  // böyle bir email'e sahip user var mı? 
        const user = await this.prismaService.user.findUnique({
            where: {
                email: dto.email,
            },
        });
        // if user does not exists throw exception // user yoksa hata fırlat !!
        if (!user)
            throw new ForbiddenException(
                'Credentials incorrect',
            );

        //compare password // şifreleri karşılaştır
        const pwMatches = await argon.verify(
            user.hash,
            dto.password,
        );
        //if password incorrect throw exception // şifre hatalı ise hata fırlat
        if (!pwMatches) {
            throw new ForbiddenException(

                'Credentials incorrect',
            );
        }
        //send back the user // herşey yolunda giderse user'ı döndür

        return this.signToken(user.id, user.email);
    }

    async signToken(userId: number, email: string,): Promise<{ access_token: string }> {

        const payload = { sub: userId, email, };

        const secret = this.configService.get('JWT_SECRET');

        const token = await this.jwtService.signAsync(payload, { expiresIn: '15m', secret: secret, },);

        return { access_token: token, };
    }



}