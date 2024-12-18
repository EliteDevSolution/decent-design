import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpStatus,
  HttpException,
  UnauthorizedException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from './local-auth.guard';
import { ParseIntPipe } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetUser } from './decorators/get-user-decorator';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Handles user login authentication

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req) {
    return this.userService.login(req.user);
  }

  // Handles Refresh Tokens

  @Post('token')
  async refreshToken(@Body() body: { refreshToken: string }) {
    const refreshToken = body.refreshToken;
    // const storedTokenData = this.userService.findRefreshToken(refreshToken);

    try {
      return await this.userService.refreshAccessToken(refreshToken);
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        // Remove the expired token
        this.userService.removeRefreshToken(refreshToken);
        throw error;
      }
      // Other possible exceptions
      throw new InternalServerErrorException('Could not refresh access token');
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getProfile(@GetUser() user: any) {
    return await this.userService.getProfile(user);
  }

  @Get('/all')
  @UseGuards(JwtAuthGuard)
  async findAll(
    @Query('page', new ParseIntPipe()) page: number = 1,
    @Query('limit', new ParseIntPipe()) limit: number = 10,
  ) {
    return this.userService.findAll(page, limit);
  }

  // Handles creating new users

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    // return this.userService.create(createUserDto);
    console.log(createUserDto);
    try {
      await this.userService.create(createUserDto);
      return {
        code: HttpStatus.CREATED,
        status: 'Success',
        description: 'User created successfully.',
      };
    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.BAD_REQUEST,
          status: 'Bad Request',
          description: 'Error creating user.',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // Retrieve a user based on the id

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userService.findOne(id);
      const { /* password, */ ...userWithoutPassword } = user;

      return {
        code: HttpStatus.OK,
        status: 'Success',
        description: 'User retrieved successfully.',
        user: userWithoutPassword,
      };
    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          status: 'Not Found',
          description: 'User not found.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Update a user

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    try {
      await this.userService.update(+id, updateUserDto);
      return {
        code: HttpStatus.OK,
        status: 'Success',
        description: 'User updated successfully.',
      };
    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          status: 'Not Found',
          description: 'User not found.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  // Delete a user

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    try {
      await this.userService.remove(+id);

      return {
        code: HttpStatus.OK,
        status: 'Success',
        description: 'User deleted successfully.',
      };
    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          status: 'Not Found',
          description: 'User not found.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('logout')
  async logout(@Body() body) {
    const { refreshToken } = body;

    if (!refreshToken) {
      throw new UnauthorizedException('No refresh token provided');
    }

    // Call UserService to handle logout process
    await this.userService.logout(refreshToken);

    return {
      code: HttpStatus.OK,
      status: 'Success',
      description: 'Logged out successfully',
    };
  }

  @Post('forgot-password')
  async forgotPassword(@Body('email') email: string) {
    try {
      await this.userService.handleForgotPassword(email);
      return {
        code: HttpStatus.OK,
        status: 'Success',
        description: 'Email with the OTP has been sent.',
      };
    } catch (error) {
      throw new HttpException(
        {
          code: HttpStatus.NOT_FOUND,
          status: 'Not Found',
          description: 'Email not found.',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('otp') otp: string,
    @Body('newPassword') newPassword: string,
  ) {
    if (!email || email.trim() === '') {
      throw new BadRequestException('Email is required');
    }

    if (!otp || otp.trim() === '') {
      throw new BadRequestException('OTP is required');
    }

    if (!newPassword || newPassword.trim() === '') {
      throw new BadRequestException('New password is required');
    }

    try {
      await this.userService.resetPassword(email, otp, newPassword);
      return {
        code: HttpStatus.OK,
        status: 'Success',
        description: 'Password successfully reset',
      };
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException('Could not reset the password');
    }
  }
}
