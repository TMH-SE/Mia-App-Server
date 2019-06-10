import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { AddCompanyDto } from './dto/add-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
// import { UsePipes } from '@nestjs/common';
// import { JoiValidationPipe } from 'src/pipes/validations/joi-validation.pipe';
// import { AddCompanySchema } from 'src/pipes/validations/schema/company.schema';

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

  // @UsePipes(new JoiValidationPipe(AddCompanySchema))
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
