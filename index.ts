const fs = require("fs");

const lerArquivo = (): unknown => {
  return JSON.parse(fs.readFileSync("./bd.json"));
};

const escreverArquivo = (dados: any): void => {
  fs.writeFileSync("./bd.json", JSON.stringify(dados));
};

type Endereco = {
  cep: string;
  rua: string;
  complemento?: string;
  bairro: string;
  cidade: string;
};

type Usuario = {
  nome: string;
  email: string;
  cpf: string;
  profissao?: string;
  endereco: Endereco | null;
};

const cadastrarUsuario = (dados: Usuario): Usuario => {
  const bd = lerArquivo() as Usuario[];
  bd.push(dados);
  escreverArquivo(bd);
  return dados;
};

const listarUsuarios = (filtro?: string): Usuario[] => {
  const bd = lerArquivo() as Usuario[];
  const usuarios = bd.filter((usuario) => {
    if (filtro) {
      return usuario.profissao === filtro;
    }
    return usuario;
  });
  return usuarios;
};

const detalharUsuario = (cpf: string): Usuario => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  return usuario;
};

const atualizarUsuario = (cpf: string, dados: Usuario): Usuario => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  Object.assign(usuario, dados);

  escreverArquivo(bd);

  return dados;
};

const excluirUsuario = (cpf: string): Usuario => {
  const bd = lerArquivo() as Usuario[];
  const usuario = bd.find((usuario) => {
    return usuario.cpf === cpf;
  });

  if (!usuario) {
    throw new Error("Usuário não encontrado");
  }

  const exclusao = bd.filter((usuario) => {
    return usuario.cpf !== cpf;
  });

  escreverArquivo(exclusao);

  return usuario;
};

// const iza = cadastrarUsuario({
//   nome: "izabelly",
//   email: "izabelly.pureza@exemplo.com",
//   cpf: "32145678900",
//   endereco: {
//     cep: "12345-678",
//     rua: "Dos bobos",
//     bairro: "Lugar Nenhum",
//     cidade: "Inexistente",
//   },
// });

// const iza = detalharUsuario("32145678900");

// atualizarUsuario("32145678900", {
//   nome: "izabelly",
//   email: "iza.pureza@exemplo.com",
//   cpf: "32145678900",
//   endereco: {
//     cep: "12345-678",
//     rua: "Dos bobos",
//     bairro: "Lugar Nenhum",
//     cidade: "Inexistente",
//   },
// });

// cadastrarUsuario({
//   nome: "Luan",
//   email: "luan.barradas@exemplo.com",
//   cpf: "12345678900",
//   endereco: {
//     cep: "12345-678",
//     rua: "Dos bobos",
//     bairro: "Lugar Nenhum",
//     cidade: "Inexistente",
//   },
// });

// atualizarUsuario("12345678900", {
//   nome: "Luan",
//   email: "luan.barradas@exemplo.com",
//   cpf: "12345678900",
//   profissao: "Dev",
//   endereco: {
//     cep: "12345-678",
//     rua: "Dos bobos",
//     bairro: "Lugar Nenhum",
//     cidade: "Inexistente",
//   },
// });

// const bd = lerArquivo();

const bd = listarUsuarios("Médico");
console.log(bd);
