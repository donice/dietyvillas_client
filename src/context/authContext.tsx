"use client";
import React, {
  createContext,
  useContext,
  useReducer,
  Dispatch,
  ReactNode,
  useEffect,
} from "react";
import toast from "react-hot-toast";
import useIsBrower from "../hooks/useIsBrower";
import { setToken } from "@/service/setToken";
import { API_ROUTES } from "@/constants/routes";
import axiosInstance from "@/lib/axiosInstance";

interface LoginResponse {
  status: number;
  token: string;
  user: {
    id: number;
    firstname: string;
    lastname: string;
    gender: string | null;
    email: string;
    identity: string;
    password_reset_code: string;
    phone: string;
    profile_image: string | null;
    is_admin: string;
    status: string;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
  };
}

interface AuthState {
  isSubmitting: boolean;
  token: string | null;
  errors: string | null;
}

// Initial state

const savedToken =
  useIsBrower() && window.sessionStorage.getItem("TOKEN")
    ? window.sessionStorage.getItem("TOKEN")
    : null;

const initialState: AuthState = {
  isSubmitting: false,
  token: savedToken,
  errors: null,
};

type AuthAction =
  | { type: "SET_LOGIN_SUBMITTING"; payload: boolean }
  | { type: "LOGIN"; payload: string }
  | { type: "SET_LOGIN_ERRORS"; payload: string | null }
  | { type: "LOGOUT" };

interface AuthProviderProps {
  children: ReactNode;
}

const AuthStateContext = createContext<AuthState | undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch<AuthAction> | undefined>(
  undefined
);

const url = process.env.NEXT_PUBLIC_BASE_URL;

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "SET_LOGIN_SUBMITTING":
      return { ...state, isSubmitting: action.payload };
    case "LOGIN":
      return { ...state, token: action.payload, errors: null };
    case "SET_LOGIN_ERRORS":
      return { ...state, errors: action.payload };
    case "LOGOUT":
      return { ...state, token: null };
    default:
      throw new Error(`Unhandled action type`);
    // throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    if (state.token) {
      setToken(state.token);
    }
  }, [state.token]);

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};

export const useAuthState = (): AuthState => {
  const state = useContext(AuthStateContext);
  if (state === undefined) {
    throw new Error("useAuthState must be used within an AuthProvider");
  }
  return state;
};

export const useAuthDispatch = (): Dispatch<AuthAction> => {
  const dispatch = useContext(AuthDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useAuthDispatch must be used within an AuthProvider");
  }
  return dispatch;
};

export const login = async (
  dispatch: Dispatch<AuthAction>,
  data: { options: string; password: string }
) => {
  dispatch({ type: "SET_LOGIN_SUBMITTING", payload: true });
  try {
    const response = await axiosInstance.post(`${API_ROUTES.AUTH.LOGIN}`, {
      ...data,
      is_social: false,
    });
    if (response?.data?.resp_code == "00") {
      const { token, user }: LoginResponse = response.data?.data;
      dispatch({ type: "LOGIN", payload: token });

      setToken(token);
      toast.success(response?.data?.resp_description);
      useIsBrower() && sessionStorage.setItem("TOKEN", token);
      useIsBrower() &&
        sessionStorage.setItem("USER_DATA", JSON.stringify(user));
    } else {
      console.log("Login response:", response);
      dispatch({
        type: "SET_LOGIN_ERRORS",
        payload: response?.data?.resp_description,
      });
      toast.error(response?.data?.resp_description || "Login failed");
    }
     console.log("Login djn. response:");
  } catch (error: any) {
    dispatch({
      type: "SET_LOGIN_ERRORS",
      payload: "Invalid login credentials",
    });
    console.log("Login IUWEHRJKNDX. response:", error);
    toast.error(error?.response?.data?.errors?.message || "Login failed");
  } finally {
    dispatch({ type: "SET_LOGIN_SUBMITTING", payload: false });
  }
};

export const logout = (dispatch: Dispatch<AuthAction>) => {
  dispatch({ type: "LOGOUT" });
  setToken(null);
  useIsBrower() && sessionStorage.clear();
};
