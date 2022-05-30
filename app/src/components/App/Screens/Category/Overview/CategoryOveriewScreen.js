import useFetch from "../../../../../core/hooks/useFetch";
import Alert from "../../../../Design/Alert/Alert";
import Container from "../../../../Design/Container/Container";
import CategoryGrid from "../../../Shared/Category/Grid/CategoryGrid";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const CategoryOverviewScreen = () => {
  const {
    isLoading,
    data: categories,
    error,
    invalidate,
  } = useFetch("/categories");

  if (isLoading) {
    return <LoadingIndicator />;
  }
  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <Container>
        <CategoryGrid onRefresh={invalidate} categories={categories} />
      </Container>
    </>
  );
};

export default CategoryOverviewScreen;
