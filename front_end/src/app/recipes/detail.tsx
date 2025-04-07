'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

type RecipeDetail = {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strArea: string;
  strCategory: string;
  strMealThumb: string;
  [key: string]: any;
};

export default function RecipeDetailPage({ params }: { params: { id: string } }) {
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const [related, setRelated] = useState<RecipeDetail[]>([]);

  useEffect(() => {
    const fetchRecipe = async () => {
      const res = await fetch(`http://localhost:3001/recipes/${params.id}`);
      const data = await res.json();
      const item = data.meals?.[0];
      setRecipe(item);

      // Fetch related recipes by category
      if (item?.strCategory) {
        const relRes = await fetch(`http://localhost:3001/recipes?filter=category&value=${item.strCategory}`);
        const relData = await relRes.json();
        setRelated(relData.meals?.filter((r: any) => r.idMeal !== item.idMeal) || []);
      }
    };

    fetchRecipe();
  }, [params.id]);

  if (!recipe) return <div>Loading...</div>;

  const getIngredients = () => {
    const ingredients = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push({ ingredient, measure });
      }
    }
    return ingredients;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <div className="md:col-span-3">
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded w-full mb-4" />
        <h1 className="text-3xl font-bold mb-2">{recipe.strMeal}</h1>
        <Link
          href={`/recipes?filter=area&value=${recipe.strArea}`}
          className="text-blue-600 underline text-sm"
        >
          {recipe.strArea}
        </Link>
        <p className="mt-4 whitespace-pre-line">{recipe.strInstructions}</p>

        <h2 className="text-xl font-semibold mt-6 mb-2">Ingredients</h2>
        <ul className="list-disc list-inside">
          {getIngredients().map(({ ingredient, measure }, idx) => (
            <li key={idx}>
              <Link
                href={`/recipes?filter=ingredient&value=${ingredient}`}
                className="text-blue-500 hover:underline"
              >
                {ingredient}
              </Link>{' '}
              - {measure}
            </li>
          ))}
        </ul>
      </div>

      <div className="md:col-span-1">
        <h3 className="text-lg font-semibold mb-2">More in {recipe.strCategory}</h3>
        <ul className="space-y-2">
          {related.map((r) => (
            <li key={r.idMeal}>
              <Link href={`/recipes/${r.idMeal}`} className="text-blue-600 hover:underline">
                {r.strMeal}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}