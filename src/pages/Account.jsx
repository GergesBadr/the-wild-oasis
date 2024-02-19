import UpdateUserData from "../features/authentication/UpdateUserData";
import UpdateUserPassword from "../features/authentication/UpdateUserPassword";

function Account() {
  return (
    <>
      <h1 className="heading-1">Update your account</h1>
      <UpdateUserData />
      <UpdateUserPassword />
    </>
  );
}

export default Account;
