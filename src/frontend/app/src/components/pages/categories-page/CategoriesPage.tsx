import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Page from '../../page/Page';
import BackendInterface from '../../../backendInterface';
import { Category } from '../../../types';
import CreateCategoryModal from '../../modals/CreateCategoryModal';


const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[] | null | undefined>(undefined);
  useEffect(() => {
    const getCategories = async () => {
      const categories = await BackendInterface.getCategories();
      setCategories(categories);
    };

    getCategories();
  }, []);

  const [showCreateCategoryModal, setShowCreateCategoryModal] = useState<boolean>(false);

  const handleModalClose = () => {
    setShowCreateCategoryModal(false);
  };

  const onCategoryCreated = () => {
    handleModalClose();

    const getCategories = async () => {
      const transactions = await BackendInterface.getCategories();
      setCategories(transactions);
    }

    getCategories();
  };

  return (
    <Page>
      <div className="mb-4">
        <Button variant="primary" size="sm" className="float-end" onClick={() => setShowCreateCategoryModal(true)}>
          Create Category
        </Button>
        <h1>Categories</h1>
      </div>
      {categories ?
        <ul>
          {categories.map(category => (
            <li key={category.id}>{category.name}</li>
          ))}
        </ul>
        : <p>No categories found.</p>
      }
      <CreateCategoryModal show={showCreateCategoryModal} handleClose={handleModalClose} onSuccess={onCategoryCreated} />
    </Page>
  );
};

export default CategoriesPage;