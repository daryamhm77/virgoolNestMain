import {
  Controller,
  Get,
  Body,
  UseGuards,
  Put,
  UseInterceptors,
  Patch,
  Res,
  Post,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiConsumes, ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { UploadedOptionalFiles } from 'src/common/decorators/upload-file.decorator';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { multerStorage } from 'src/common/utils/multer.util';
import {
  ChangeEmailDto,
  ChangePhoneDto,
  ChangeUsernameDto,
  ProfileDto,
} from './dto/profile.dto';
import { ProfileImages } from './types/files';
import { Response } from 'express';
import { CookieKeys } from 'src/common/enums/cookie.enum';
import { CookiesOptionsToken } from 'src/common/utils/cookie.util';
import { PublicMessage } from 'src/common/enums/message.enum';
import { CheckOtpDto, UserBlockDto } from '../auth/dto/auth.dto';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { Roles } from 'src/common/enums/role.enum';
import { CanAccess } from 'src/common/decorators/role.decorator';

@Controller('user')
@ApiTags('User')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Put('/profile')
  @ApiConsumes(SwaggerConsumes.MultipartData)
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        { name: 'image_profile', maxCount: 1 },
        { name: 'bg_image', maxCount: 1 },
      ],
      {
        storage: multerStorage('user-profile'),
      },
    ),
  )
  changeProfile(
    @UploadedOptionalFiles() files: ProfileImages,
    @Body() profileDto: ProfileDto,
  ) {
    return this.userService.changeProfile(files, profileDto);
  }
  @Get('/profile')
  profile() {
    return this.userService.profile();
  }
  @Patch('/change-email')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async changeEmail(
    @Body() changeEmailDto: ChangeEmailDto,
    @Res() res: Response,
  ) {
    const { code, token, message } = await this.userService.changeEmail(
      changeEmailDto.email,
    );
    if (message) return res.json({ message });
    res.cookie(CookieKeys.EmailOTP, token, CookiesOptionsToken());
    res.json({
      code,
      message: PublicMessage.SentOtp,
    });
  }
  @Get('/list')
  @Pagination()
  find(@Query() paginationDto: PaginationDto) {
    return this.userService.find(paginationDto);
  }
  @Get('/followers')
  @Pagination()
  followers(@Query() paginationDto: PaginationDto) {
    return this.userService.followers(paginationDto);
  }
  @Get('/following')
  @Pagination()
  following(@Query() paginationDto: PaginationDto) {
    return this.userService.following(paginationDto);
  }
  @Post('/block')
  @CanAccess(Roles.Admin)
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async block(@Body() blockDto: UserBlockDto) {
    return this.userService.blockToggle(blockDto);
  }
  @Post('/verify-email-otp')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async verifyEmail(@Body() otpDto: CheckOtpDto) {
    return this.userService.verifyEmail(otpDto.code);
  }
  @Patch('/change-phone')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async changePhone(@Body() phoneDto: ChangePhoneDto, @Res() res: Response) {
    const { code, token, message } = await this.userService.changePhone(
      phoneDto.phone,
    );
    if (message) return res.json({ message });
    res.cookie(CookieKeys.PhoneOTP, token, CookiesOptionsToken());
    res.json({
      code,
      message: PublicMessage.SentOtp,
    });
  }
  @Post('/verify-phone-otp')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async verifyPhone(@Body() otpDto: CheckOtpDto) {
    return this.userService.verifyPhone(otpDto.code);
  }
  @Patch('/change-username')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  async changeUsername(@Body() usernameDto: ChangeUsernameDto) {
    return this.userService.changeUsername(usernameDto.username);
  }
  @Get('/follow/:followingId')
  @ApiParam({ name: 'followingId' })
  follow(@Param('followingId', ParseIntPipe) followingId: number) {
    return this.userService.followToggle(followingId);
  }
}

