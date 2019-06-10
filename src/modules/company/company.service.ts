import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Company } from './company.entity';
import { AddCompanyDto } from './dto/add-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
const uuid = require('uuid/v4');

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: MongoRepository<Company>,
  ) {}

  async findAll(userId: string): Promise<Company[]> {
    return await this.companyRepository.find({ user: userId });
  }

  async findById(id: string): Promise<Company> {
    return await this.companyRepository.findOne({ _id: id });
  }

  async create(addCompanyDto: AddCompanyDto): Promise<Company> {
    Object.assign(addCompanyDto, {_id: uuid()});
    return await this.companyRepository.save(addCompanyDto);
  }

  async delete(id: string): Promise<Company> {
    const companyDelete = await this.findById(id);
    if (companyDelete) {
      await this.companyRepository.delete({ _id: id });
      return companyDelete;
    }
    return null;
  }

  async update(updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    if (await this.findById(updateCompanyDto._id)) {
      await this.companyRepository.update(
        { _id: updateCompanyDto._id },
        updateCompanyDto,
      );
      return updateCompanyDto;
    }
    return null;
  }
}
