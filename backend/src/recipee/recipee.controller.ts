import { Get, Controller, Query } from '@nestjs/common';
import { RecipeService } from './recipee.service';

@Controller('recipes')
export class RecipeController {
  constructor(private readonly recipeService: RecipeService) {}

  @Get()
  async getRecipes(@Query('filter') filter: string, @Query('value') value: string): Promise<any[]> {
    return this.recipeService.getRecipes(filter, value); // returns a Promise
  }
}