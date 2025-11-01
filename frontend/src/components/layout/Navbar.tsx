import { Link, useNavigate } from "react-router-dom";
import { useAtomValue, useSetAtom } from "jotai";
import { isAuthenticatedAtom, userAtom, logoutAtom } from "@/store/authAtoms";
import { Newspaper, MessageSquare, Settings, LogOut } from "lucide-react";

export function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = useAtomValue(isAuthenticatedAtom);
  const user = useAtomValue(userAtom);
  const logout = useSetAtom(logoutAtom);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-yellow-300 border-b-4 border-black sticky top-0 z-50 shadow-[0_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="bg-black border-2 border-black p-2 group-hover:rotate-12 transition-transform">
              <Newspaper className="w-6 h-6 text-yellow-300" />
            </div>
            <span className="font-black text-2xl uppercase tracking-tight">Kura K Ho</span>
          </Link>

          <div className="flex items-center gap-3">
            <Link to="/chat">
              <button className="px-4 py-2 bg-white border-3 border-black font-bold uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all flex items-center gap-2">
                <MessageSquare className="w-4 h-4" />
                Chat
              </button>
            </Link>

            {isAuthenticated ? (
              <>
                <Link to="/preferences">
                  <button className="p-3 bg-cyan-400 border-3 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                    <Settings className="w-5 h-5" />
                  </button>
                </Link>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-pink-400 border-3 border-black flex items-center justify-center font-black text-lg">
                    {user?.email.charAt(0).toUpperCase() || "U"}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="p-3 bg-pink-400 border-3 border-black font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button className="px-4 py-2 bg-white border-3 border-black font-bold uppercase text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                    Sign In
                  </button>
                </Link>
                <Link to="/signup">
                  <button className="px-4 py-2 bg-pink-500 border-3 border-black font-bold uppercase text-sm text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-1px] hover:translate-y-[-1px] transition-all">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
