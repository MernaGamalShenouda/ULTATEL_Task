import { Controller, Post, Get, Put, Delete, Body, Param, Request, UseGuards, Query } from '@nestjs/common';
import { StudentsService } from './students.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Student } from './student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createStudentDto: CreateStudentDto, @Request() req) {
    const user = req.user ? req.user.email : 'system';
    return this.studentsService.create(createStudentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query() query: any): Promise<Student[]> {
    return this.studentsService.findAll(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Student> {
    return this.studentsService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(@Param('id') id: number, @Body() updateStudentDto: UpdateStudentDto, @Request() req) {
    const user = req.user ? req.user.email : 'system';
    return this.studentsService.update(id, updateStudentDto, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.studentsService.remove(id);
  }
}
