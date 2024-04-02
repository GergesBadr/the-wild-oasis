import { useGetUser } from "./useGetUser";
import defaultUser from "../../assets/default-user.png";

function User() {
  const { user } = useGetUser();
  const userName = user?.user_metadata?.full_name || "Unknown username";
  const userAvatar = user?.user_metadata?.avatar || defaultUser;

  return (
    <div className="flex items-center gap-2">
      <img
        src={userAvatar}
        alt={`${userName} Profile photo.`}
        className="w-10 rounded-full"
      />
      <span> {userName} </span>
    </div>
  );
}

export default User;
