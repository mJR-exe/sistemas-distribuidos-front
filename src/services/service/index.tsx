import axios from "axios";

import { routes } from "../routes";
import { TypeLogin } from "../types";

class Service {
  async login(data: TypeLogin) {
    return axios({
      url: `${routes.API_URL}/login`,
      method: "POST",
      data,
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async getUsers() {
    return axios({
      url: `${routes.API_URL}/usuarios`,
      method: "GET",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async postUser(data: { email: string; nome: string; password: string }) {
    return axios({
      url: `${routes.API_URL}/usuario`,
      method: "POST",
      timeout: 5000,
      data,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async updateUsers(data: { email: string; nome: string; password: string }, id: number) {
    return axios({
      url: `${routes.API_URL}/usuario/${id}`,
      method: "PUT",
      data,
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async deleteUser(id: number) {
    return axios({
      url: `${routes.API_URL}/usuario/${id}`,
      method: "DELETE",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async getPacientes() {
    return axios({
      url: `${routes.API_URL}/pacientes`,
      method: "GET",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async postPaciente(data: {
    nome: string;
    cpf: string;
    telefone: string;
    dataNasc: string;
    convenio: string;
    endereco: string;
  }) {
    return axios({
      url: `${routes.API_URL}/paciente`,
      method: "POST",
      timeout: 5000,
      data,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async updatePaciente(
    data: {
      nome: string;
      cpf: string;
      telefone: string;
      dataNasc: string;
      convenio: string;
      endereco: string;
    },
    id: number
  ) {
    return axios({
      url: `${routes.API_URL}/paciente/${id}`,
      method: "PUT",
      data,
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async deletePaciente(id: number) {
    return axios({
      url: `${routes.API_URL}/paciente/${id}`,
      method: "DELETE",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async getMedicos() {
    return axios({
      url: `${routes.API_URL}/medicos`,
      method: "GET",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async postMedico(data: { nome: string; crm: string; email: string; password: string }) {
    return axios({
      url: `${routes.API_URL}/medico`,
      method: "POST",
      timeout: 5000,
      data,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async updateMedico(
    data: {
      nome: string;
      crm: string;
      email: string;
      password: string;
    },
    id: number
  ) {
    return axios({
      url: `${routes.API_URL}/medico/${id}`,
      method: "PUT",
      data,
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async deleteMedico(id: number) {
    return axios({
      url: `${routes.API_URL}/medico/${id}`,
      method: "DELETE",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async getAtendimentos() {
    return axios({
      url: `${routes.API_URL}/atendimentos`,
      method: "GET",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async postAtendimento(data: { idMedico: number; idPaciente: number }) {
    return axios({
      url: `${routes.API_URL}/atendimento`,
      method: "POST",
      timeout: 5000,
      data,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async updateAtendimento(
    data: {
      idMedico: number;
      idPaciente: number;
    },
    id: number
  ) {
    return axios({
      url: `${routes.API_URL}/atendimento/${id}`,
      method: "PUT",
      data,
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async deleteAtendimento(id: number) {
    return axios({
      url: `${routes.API_URL}/atendimento/${id}`,
      method: "DELETE",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }

  async getRelatorio() {
    return axios({
      url: `${routes.API_URL}/relatorio`,
      method: "GET",
      timeout: 5000,
      headers: routes.HEADER_REQUEST,
    })
      .then((response) => {
        return Promise.resolve(response);
      })
      .catch((error) => {
        return Promise.reject(error);
      });
  }
}

const service = new Service();
export default service;
