import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import Button from "../../../../Design/Button/Button";
import TopBar from "../../../../Design/Container/TopBar";
import Row from "../../../../Design/Table/Row";
import Title from "../../../../Design/Typography/Title";
import CategoryCard from "../../../../Design/Modules/Category/CategoryCard";
import CreateEditCategoryDialog from "../Form/CreateEditCategoryDialog";

const CategoryGrid = ({ categories, onRefresh }) => {
  const { t } = useTranslation();

  const [dialog, setDialog] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);
  useTitle(t("categories.title"));

  const handleDismiss = () => {
    setDialog(false);
    setCurrentCategory(null);
  };

  const handleAddClick = () => {
    setDialog(true);
  };

  const handleEditClick = (category) => {
    setCurrentCategory(category);
  };

  const handleDeleteClick = () => {
    onRefresh();
  };

  const handleUpdate = () => {
    setDialog(false);
    setCurrentCategory(null);
    onRefresh();
  };

  return (
    <>
      <TopBar>
        <Title>{t("categories.title")}</Title>
        <Button onClick={handleAddClick}>{t("categories.create.title")}</Button>
      </TopBar>
      <Row gutter="3" className="justify-content-center mt-3">
        {categories.map((category) => (
          <CategoryCard
            category={category}
            onEdit={handleEditClick}
            onDelete={handleDeleteClick}
            key={category.name}
          />
        ))}
      </Row>
      {(dialog || currentCategory) && (
        <CreateEditCategoryDialog
          onDismiss={handleDismiss}
          onSuccess={() => handleUpdate()}
          category={currentCategory}
        />
      )}
    </>
  );
};

export default CategoryGrid;
