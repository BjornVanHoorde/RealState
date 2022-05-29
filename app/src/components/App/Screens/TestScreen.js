import { useAuthContext } from "../Auth/AuthProvider";

const TestScreen = () => {
  const { logout } = useAuthContext();

  return (
    <>
        <h1>Test</h1>
        <button onClick={logout}>Logout</button>
    </>
  )
}

export default TestScreen;