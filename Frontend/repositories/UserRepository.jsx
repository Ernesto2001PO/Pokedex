import axiosInstance from "../api/axiosInstance";


const User = {
  loginUser: async (credentials) => {
    try {
      const response = await axiosInstance.post("/usuario/login", credentials);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error logging in:", error);
      throw error;
    }
  },
  registerUser: async (userData) => {
    try {
      const response = await axiosInstance.post("/usuario/crear", userData);
      console.log(response.data);

      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  }
  ,
  getAllUsers: async () => {
    try {
      const response = await axiosInstance.get("/usuario/obtener");
      return response.data;
    } catch (error) {
      console.error("Error fetching users:", error);
      throw error;
    }
  },
  makeAdmin: async (id_usuario) => {
    try {
      const response = await axiosInstance.put(`/usuario/hacer_admin/${id_usuario}`);
      return response.data;
    } catch (error) {
      console.error("Error making user admin:", error);
      throw error;
    }
  },
  changePassword: async (id_usuario, newPassword) => {
    try {
      const response = await axiosInstance.put(
        `/usuarios/cambiarPassword/${id_usuario}`,
        { newPassword } 
      );
      return response.data;
    } catch (error) {
      console.error("Error changing password:", error);
      throw error;
    }
  },

}

export default User;
