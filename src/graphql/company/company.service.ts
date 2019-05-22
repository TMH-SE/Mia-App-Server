import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { AddCompanyDto, UpdateCompanyDto, Company } from 'src/graphql.schema';

@Injectable()
export class CompanyService {

  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: MongoRepository<Company>
  ){}
  
  async findAll () : Promise<Company[]> {
    return await this.companyRepository.find();
  }

  async findById (id: string): Promise<Company> {
    return await this.companyRepository.findOne(id)
  }

  async create (addCompanyDto: AddCompanyDto) : Promise<Company> {
    return await this.companyRepository.save(addCompanyDto)
  }

  async delete (id: string): Promise<Company> {
    const companyDelete = this.findById(id)
    if (companyDelete) {
      await this.companyRepository.delete(id)
      return companyDelete
    }
    return null
  }

  async update (updateCompanyDto: UpdateCompanyDto): Promise<Company> {
    if (this.findById(updateCompanyDto.id)){
      await this.companyRepository.update(updateCompanyDto.id, updateCompanyDto)
      return updateCompanyDto
    }
    return null
  }

}
