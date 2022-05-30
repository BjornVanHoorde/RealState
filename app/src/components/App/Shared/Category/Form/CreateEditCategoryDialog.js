import { useTranslation } from "react-i18next";
import useMutation from "../../../../../core/hooks/useMutation";
import Alert from "../../../../Design/Alert/Alert";
import Modal from "../../../../Design/Modal/Modal";
import CategoryForm from "./CategoryForm";

const CreateEditCategoryDialog = ({
  category,
  onSuccess,
  onDismiss,
  options,
}) => {
  const { t } = useTranslation();

  const { isLoading, error, mutate } = useMutation();
  const isUpdate = category === undefined ? false : true;

  const handleSubmit = (data) => {
    mutate(
      `${process.env.REACT_APP_API_URL}/${
        isUpdate ? `categories/${category.id}` : "categories"
      }`,
      {
        method: isUpdate ? "PATCH" : "POST",
        data,
        onSuccess,
      }
    );
  };

  return (
    <Modal
      title={t(`categories.${isUpdate ? "edit" : "add"}.title`)}
      onDismiss={onDismiss}
    >
      {error && <Alert color="danger">{error}</Alert>}

      <CategoryForm
        label={t(`buttons.${isUpdate ? "save" : "create"}`)}
        onSubmit={handleSubmit}
        initialData={category}
        disabled={isLoading}
        options={options}
      />
    </Modal>
  );
};

export default CreateEditCategoryDialog;
