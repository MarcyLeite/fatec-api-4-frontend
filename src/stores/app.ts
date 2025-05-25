// Utilities
import router from "@/router";
import axios from "axios";
import { defineStore } from "pinia";

export const useAppStore = defineStore("user", () => {
  const id = ref<string | null>(localStorage.getItem("id") ?? "");
  const token = ref<string | null>(localStorage.getItem("token") ?? "");
  const name = ref<string | null>(localStorage.getItem("name") ?? "");
  const role = ref<string | null>(localStorage.getItem("role") ?? "");

  const setToken = (s: string | null) => {
    token.value = s;
    localStorage.setItem("token", s ?? "");
  };

  const setName = (s: string | null) => {
    name.value = s;
    localStorage.setItem("name", s ?? "");
  };

  const setRole = (s: string | null) => {
    role.value = s;
    localStorage.setItem("role", s ?? "");
  };

  const setId = (s: string | null) => {
    role.value = s;
    localStorage.setItem("id", s ?? "");
  };

  const logout = () => {
    setToken("");
    setName("");
    setRole("");
    setId("");

    router.push("/");
  };

  const verify = async () => {
    try {
      const result = await axios.get(
        `http://localhost:8080/usuario/verifyData/${token.value}`
      );

      if (result.data === null) {
        logout();
      }
    } catch {
      logout();
    }
  };

  return {
    token,
    setToken,
    name,
    setName,
    role,
    setRole,
    id,
    setId,
    logout,
    verify,
  };
});
