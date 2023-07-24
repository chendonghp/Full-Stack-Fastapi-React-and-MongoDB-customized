import Link from "next/link";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
const Header = () => {
  const { setUser, setLoading, loading, user } = useAuth();
  useEffect(() => {
    setLoading(true);
    (async () => {
      const userData = await fetch("/api/user");
      try {
        const user = await userData.json();
        setUser(user);
      } catch (error) {
        // if error: set user to null, destroy the cookie
        setUser(null);
      }
    })();
    setLoading(false);
  }, []);
  return (
    <div className=" text-orange-600 p-2 font-bold flex flexrow justify-between items-center">
      <div>
        {loading ? <span>Loading...</span> : ""}
        <Link href="/">
          FARM Cars
          {user ? (
            <span>
              {"  "}{user.username} ({user.role})
            </span>
          ) : (
            ""
          )}
        </Link>
      </div>
      <ul className="flex flex-row space-x-4 ">
        <li>
          <Link href="/cars">Cars</Link>
        </li>
        {user && user.role === "ADMIN" ? (
          <li>
            <Link href="/cars/add">
              Add Car
            </Link>
          </li>
        ) : (
          ""
        )}
        {!user ? (
          <>
            <li>
              <Link href="/account/register">
                Register
              </Link>
            </li>
            <li>
              <Link href="/account/login">
                Login
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href="/account/logout">
                Log out {user.username}
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
};
export default Header;
