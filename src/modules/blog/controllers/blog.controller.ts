import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Query,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { BlogService } from '../services/blog.service';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { SwaggerConsumes } from 'src/common/enums/swagger-consumes.enum';
import { AuthGuard } from '../../auth/guards/auth.guard';
import { Pagination } from 'src/common/decorators/pagination.decorator';
import { SkipAuth } from 'src/common/decorators/skip-auth.decorator';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { CreateBlogDto, FilterBlogDto, UpdateBlogDto } from '../dto/blog.dto';

@Controller('blog')
@ApiTags('Blog')
@ApiBearerAuth('Authorization')
@UseGuards(AuthGuard)
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post('/')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  create(@Body() blogDto: CreateBlogDto) {
    return this.blogService.create(blogDto);
  }
  @Get('/my')
  myBlogs() {
    return this.blogService.myBlog();
  }
  @Get('/')
  @SkipAuth()
  @Pagination()
  find(@Query() paginationDto: PaginationDto, filterDto: FilterBlogDto) {
    return this.blogService.blogList(paginationDto, filterDto);
  }
  @Delete('/:id')
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.delete(id);
  }
  @Put('/:id')
  @ApiConsumes(SwaggerConsumes.UrlEncoded, SwaggerConsumes.Json)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() blogDto: UpdateBlogDto,
  ) {
    return this.blogService.update(id, blogDto);
  }
  @Get('/like/:id')
  likeToggle(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.likeToggle(id);
  }
  @Get('/bookmark/:id')
  bookmarkToggle(@Param('id', ParseIntPipe) id: number) {
    return this.blogService.bookMarkToggle(id);
  }
  @Get('/by-slug/:slug')
  @SkipAuth()
  @Pagination()
  findOneBySlug(
    @Param('slug') slug: string,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.blogService.findOneBySlug(slug, paginationDto);
  }
}
