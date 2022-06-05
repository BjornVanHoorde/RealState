import { Outlet } from "react-router-dom";
import useFetch from "../../../../core/hooks/useFetch";
import Alert from "../../../Design/Alert/Alert";
import { useUser } from "../../Auth/AuthProvider";
import LoadingIndicator from "../../Shared/Generic/LoadingIndicator/LoadingIndicator";

const ProfileLayout = () => {
  const user = useUser();
  const { isLoading, error, data: userData } = useFetch(`/users/${user.id}`)

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (error) {
    return <Alert color="danger">{error}</Alert>;
  }

  return (
    <>
      <Outlet context={{ user: userData }}/>
    </>
  );
};

export default ProfileLayout;
