import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class RecipeService {
  async getRecipes(filter: string, value: string = ''): Promise<any> {
    let url = '';
    if (filter === 'all') {
      url = `https://www.themealdb.com/api/json/v1/1/search.php?s=`;
    } else if (filter === 'ingredient') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`;
    } else if (filter === 'country') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`;
    } else if (filter === 'category') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`;
    }
    const response = await axios.get(url);
    return response.data.meals;
  }

  async getRecipeInfo(id: string): Promise<any> {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
    const response = await axios.get(url);
    return response.data.meals[0];
  }
}