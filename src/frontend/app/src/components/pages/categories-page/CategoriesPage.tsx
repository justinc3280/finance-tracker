import React, { useEffect, useState } from 'react';
import Page from '../../page/Page';
import BackendInterface from '../../../backendInterface';
import { Category } from '../../../types';


const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null | undefined>(undefined);
  useEffect(() => {
    const getCategories = async () => {
      const categories = await BackendInterface.getCategories();
      setCategories(categories);
    };

    getCategories();
  }, []);

  return (
    <Page>
      <h1>Categories</h1>
      {categories ?
        <ul>
          {categories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
        : <p>No categories found.</p>
      }
    </Page>
  );
};

export default CategoriesPage;