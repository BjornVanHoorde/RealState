import { useTranslation } from "react-i18next";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import Alert from "../../../../Design/Alert/Alert";
import FavoriteGrid from "../../../Shared/Favorite/Grid/FavoriteGrid";
import LoadingIndicator from "../../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const FavoriteOverview = () => {
  const { t } = useTranslation();
  const {
    isLoading,
    error,
    data: favorites,
    invalidate,
  } = useFetch("/favorites");

  useTitle(t("favorites.title"));

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <FavoriteGrid favorites={favorites} onRefresh={invalidate} />
      {favorites.length <= 0 && <h2>{t("favorites.none")}</h2>}
    </>
  );
};

export default FavoriteOverview;
