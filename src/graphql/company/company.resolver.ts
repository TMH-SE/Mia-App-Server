import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { async } from 'rxjs/internal/scheduler/async';
import { AddCompanyDto, UpdateCompanyDto } from 'src/graphql.schema';

@Resolver('Company')
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @Query('companies')
  async companies(@Args('userId') userId: string) {
    return await this.companyService.findAll(userId);
  }

  @Query('company')
  async company(@Args('id') id: string) {
    return await this.companyService.findById(id);
  }

  @Mutation('addCompany')
  async addCompany(@Args('addCompanyDto') addCompanyDto: AddCompanyDto) {
    return await this.companyService.create(addCompanyDto);
  }

  @Mutation('deleteCompany')
  async deleteCompany(@Args('companyId') id: string) {
    return await this.companyService.delete(id);
  }

  @Mutation('updateCompany')
  async updateCompany(
    @Args('updateCompanyDto') updateCompanyDto: UpdateCompanyDto,
  ) {
    return await this.companyService.update(updateCompanyDto);
  }
}
