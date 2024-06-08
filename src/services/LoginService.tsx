import axios from "axios";

const api = axios.create({
  baseURL: "https://cafelab-service-new.onrender.com",
});

// Função para criar um novo usuário
export const createUser = async (user: any) => {
  try {
    const response = await api.post("/user", user);
    return response.data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Função para atualizar um usuário
export const updateUser = async (user: any) => {
  try {
    const response = await api.put("/user", user);
    return response.data;
  } catch (error) {
    console.error("Error updating user:", error);
    throw error;
  }
};

// Função para obter usuário por email
export const getUserByEmail = async (email: any) => {
  try {
    const response = await api.get(`/user/by-email?email_user=${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

// Função para obter todos os usuários
export const getAllUsers = async () => {
  try {
    const response = await api.get("/user/all");
    return response.data;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

// Função para login
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.get(`/user/login/${email}/${password}`);
    localStorage.setItem("isLoggedIn", "true");
    return response.data;
  } catch (error) {
    console.error("Error logging in:", error);
    throw error;
  }
};

// Função para deletar um usuário
export const deleteUser = async (id_user: string) => {
  try {
    const response = await api.delete(`/user/${id_user}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

// Função para atualizar a senha do usuário
export const updateUserPassword = async (id_user: string, password: string) => {
  try {
    const response = await api.patch(
      `/user/update/password/account/${id_user}/${password}`
    );
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};
