import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { apiLogin, AuthVertify, RefreshToken, SignUp } from "api/authService";
import { getDataFromToken } from "hooks/useLocalStore";
import Cookies from "js-cookie";
import { decryptData, encryptData } from "lib/crypto";

type AuthPayload = {
  email: string;
  password: string;
};
type SignUpPayload = {
  fullName: string;
  email: string;
  password: string;
};
type LoginResponse = {
  success: boolean;
  data: any;
};
type AuthContextType = {
  isAuthenticated: boolean;
  user: any;
  login: (data: AuthPayload) => Promise<LoginResponse>;
  register: (data: SignUpPayload) => Promise<boolean>;
  logout: () => boolean;
};

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: {},
  login: async (data) => ({ success: false, data: {} }),
  register: async (data) => false,
  logout: () => true,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});
  const login = async (data: AuthPayload) => {
    const res = await apiLogin(data);

    if (res.success) {
      const dataToken = getDataFromToken(res.data.accessToken);

      if (dataToken) {
        setUser(dataToken);
      }
      const { accessToken, refreshToken } = res.data;
      const encrypted = encryptData({
        accessToken,
        refreshToken,
      });
      Cookies.set("token_info", encrypted, { expires: 7 }); // lưu 7 ngày

      setIsAuthenticated(true);
      router.push("/table-tasks");
      return { success: true, data: dataToken };
    } else {
      return { success: false, data: {} };
    }
  };
  const register = async (data: SignUpPayload) => {
    const res = await SignUp(data);
    return res.success ? true : false;
  };
  const logout = () => {
    return true;
  };
  const getTokensFromCookies = () => {
    const encryptedToken = Cookies.get("token_info");
    if (encryptedToken) {
      try {
        const token_info = decryptData(encryptedToken); // Giải mã token

        if (token_info) {
          return token_info;
        }
      } catch (err) {
        console.error("Lỗi giải mã token từ cookie:", err);
      }
    }
    return null;
  };
  const vertifyToken = async () => {
    var token_info = getTokensFromCookies();
    console.log("token_info", token_info);
    if (!token_info) {
      return;
    }
    const response = await AuthVertify({});

    if (response.success) {
      setIsAuthenticated(true);
      setUser(response.data);
      router.push("/table-tasks");
    } else if (!response.success && response.message === "TokenExpiredError") {
      //1.Call API to refresh token

      const refreshToken = token_info.refreshToken;

      const res = await RefreshToken({ refreshToken });

      //2.Receive new accessToken and vertify
      if (res.success) {
        //+Vertify true -> pass
        //localStorage.setItem('@accessToken', res.data.accessToken);
        const encrypted = encryptData({
          accessToken: res.data.accessToken,
          refreshToken,
        });
        Cookies.set("token_info", encrypted, { expires: 7 }); // lưu 7 ngày

        vertifyToken();
      } else {
        //+Vertify false -> router push to login
        router.push("/login");
      }
    } else {
      router.push("/login");
    }
  };

  useEffect(() => {
    vertifyToken();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
export const useAuth = () => useContext(AuthContext);
