import { useState } from "react";
import { useTranslation } from "react-i18next";
import useTitle from "../../../../../core/hooks/useTitle";
import Button from "../../../../Design/Button/Button";
import TopBar from "../../../../Design/Container/TopBar";
import Row from "../../../../Design/Table/Row";
import Title from "../../../../Design/Typography/Title";
import CategoryCard from "../Card/CategoryCard";
import CreateEditCategoryDialog from "../Form/CreateEditCategoryDialog";

const CategoryGrid = ({ categories, onRefresh }) => {
  const { t } = useTranslation();

  const [dialog, setDialog] = useState(false);
  useTitle(t("categories.title"));

  const handleAddClick = () => {
    setDialog(true);
  };

  const handleUpdate = () => {
    setDialog(false);
    onRefresh();
  };

  return (
    <>
      <TopBar>
        <Title>{t("categories.title")}</Title>
        <Button onClick={handleAddClick}>{t("categories.add.title")}</Button>
      </TopBar>
      <Row gutter="3" className="justify-content-center mt-3">
        {categories.map((category) => (
          <CategoryCard category={category.name} key={category.name} />
        ))}
      </Row>
      {dialog && (
        <CreateEditCategoryDialog
          onDismiss={() => setDialog(false)}
          onSuccess={() => handleUpdate()}
        />
      )}
    </>
  );
};

export default CategoryGrid;
