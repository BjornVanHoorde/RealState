import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import useFetch from "../../../../../core/hooks/useFetch";
import useTitle from "../../../../../core/hooks/useTitle";
import { FavoriteRoutes } from "../../../../../core/routing";
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
  const navigate = useNavigate();

  useTitle(t("favorites.title"));

  const handleRefresh = () => {
    navigate(FavoriteRoutes.Index);
    invalidate();
  };

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <FavoriteGrid favorites={favorites} onRefresh={handleRefresh} />
      {favorites.length <= 0 && <h2>{t("favorites.none")}</h2>}
    </>
  );
};

export default FavoriteOverview;
