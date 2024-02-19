import { HiOutlineEye, HiOutlineEyeSlash } from "react-icons/hi2";
import { useState } from "react";
import toast from "react-hot-toast";
import Button from "../../components/common/Button";
import { useSignIn } from "./useSignIn";

function LoginForm() {
  // No need for react hook form here, it's just two pieces of states, not a compicated form
  const [email, setEmail] = useState("someone@gmail.com");
  const [password, setPassword] = useState("01234567");
  const [showPassword, setShowPassword] = useState(false);
  const { pendingSignIn, signIn } = useSignIn();

  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      toast.error("No email or password provided", { duration: 5000 });
      return;
    }
    signIn(
      { email, password },
      {
        onSettled: () => {
          // Reset credentials to empty
          setEmail("");
          setPassword("");
          setShowPassword(false);
        },
      },
    );
  }

  function toggleShowPassword(e) {
    e.preventDefault();
    setShowPassword((pre) => !pre);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-lg bg-white p-8 shadow-md dark:bg-dark-bg"
    >
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium">
          Email address
        </label>
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="true"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border-2 border-gray-300 bg-transparent px-2 py-1 text-gray-700 dark:border-gray-700 dark:text-gray-200"
        />
      </div>

      <div className="relative">
        <label htmlFor="password" className="mb-2 block text-sm font-medium">
          Password
        </label>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border-2 border-gray-300 bg-transparent px-2 py-1 text-gray-700 dark:border-gray-700 dark:text-gray-200"
        />
        {showPassword ? (
          <button
            type="button"
            aria-label="Hide password"
            title="Hide password"
            onClick={toggleShowPassword}
            className="absolute right-3 top-[34px] text-gray-700 dark:text-gray-200"
          >
            <HiOutlineEyeSlash className="icon-size " />
          </button>
        ) : (
          <button
            type="button"
            aria-label="Show password"
            title="Show password"
            onClick={toggleShowPassword}
            className="absolute right-3 top-[34px] text-gray-700 dark:text-gray-200"
          >
            <HiOutlineEye className="icon-size" />
          </button>
        )}
      </div>
      <Button disabled={pendingSignIn} extraClasses="w-full">
        {pendingSignIn ? "Loading..." : "Log in"}
      </Button>
      <div className="sec-text-color space-y-3">
        <p>
          <span className="font-bold uppercase tracking-wide">Note: {""}</span>
          Users of the website are hotel employees, so not everyone can become a
          new user, only the employees can add one, and that&apos;s when there
          are logged-in.
        </p>

        <p>
          But in order to use the website as if you are an employee, just use{" "}
          <span className="text-green-600 dark:text-green-500">
            someone@gmail.com
          </span>{" "}
          email and{" "}
          <span className="text-green-600 dark:text-green-500">01234567</span>{" "}
          password.
        </p>

        <p>
          After logged-in, you will be able to do any data manpulation (create,
          edit, delete, update…)
        </p>

        <p className="font-bold uppercase tracking-widest text-red-500 dark:text-red-400">
          Please, do not spoil the data!
        </p>
      </div>
    </form>
  );
}

export default LoginForm;
