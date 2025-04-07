'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type Recipe = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

const searchParams = useSearchParams()
const filter = searchParams.get('filter');
const value = searchParams.get('value');

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      let url = 'http://localhost:3001/recipes';
      if (filter && value) {
        url += `?filter=${filter}&value=${value}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setRecipes(data.meals || []);
    };

    fetchRecipes();
  }, [filter, value]);

  return (
    <div>
      <h1 className="text-3xl font-semibold mb-6">All Recipes</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {recipes.map((recipe) => (
          <Link key={recipe.idMeal} href={`/recipes/${recipe.idMeal}`}>
            <div className="border p-2 rounded shadow hover:shadow-lg transition">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded" />
              <p className="mt-2 font-medium">{recipe.strMeal}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
