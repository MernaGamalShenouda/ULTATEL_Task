import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentsService {
  constructor(
    @InjectRepository(Student)
    private studentsRepository: Repository<Student>,
  ) {}

  async create(createStudentDto: CreateStudentDto, user: string): Promise<Student> {
    const student = this.studentsRepository.create({
      ...createStudentDto,
      createdBy: user || 'system',
      updatedBy: user || 'system',
    });

    try {
      return await this.studentsRepository.save(student);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY' || error.code === '23505') { 
        throw new ConflictException('Email already exists');
      }
      throw error;
    }
  }

  async findAll(query: any): Promise<Student[]> {
    const { name, gender, country, ageFrom, ageTo } = query;
    
    const qb = this.studentsRepository.createQueryBuilder('student');

    if (name) {
      qb.andWhere('student.firstName LIKE :name OR student.lastName LIKE :name', { name: `%${name}%` });
    }
    if (gender) {
      qb.andWhere('student.gender = :gender', { gender });
    }
    if (country) {
      qb.andWhere('student.country = :country', { country });
    }
    if (ageFrom) {
      const fromDate = new Date();
      fromDate.setFullYear(fromDate.getFullYear() - parseInt(ageFrom, 10));
      qb.andWhere('student.birthdate <= :fromDate', { fromDate: fromDate.toISOString().split('T')[0] });
    }
    if (ageTo) {
      const toDate = new Date();
      toDate.setFullYear(toDate.getFullYear() - parseInt(ageTo, 10));
      qb.andWhere('student.birthdate >= :toDate', { toDate: toDate.toISOString().split('T')[0] });
    }

    return qb.getMany();
  }

  findOne(id: number): Promise<Student> {
    return this.studentsRepository.findOne({ where: { id } });
  }

  async update(id: number, updateStudentDto: UpdateStudentDto, user: string): Promise<void> {
    await this.studentsRepository.update(id, {
      ...updateStudentDto,
      updatedBy: user || 'system',
    });
  }

  async remove(id: number): Promise<void> {
    await this.studentsRepository.delete(id);
  }
}
