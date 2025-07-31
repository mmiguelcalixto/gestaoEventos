import { EventoController } from "../controller/controller";
import { IEvento }  from "../model/IEvento";
import inquirer from "inquirer"

const eventoController = new EventoController();

export async function inputEvento(): Promise<IEvento> {
  const input = [
		{
			type: "input",
			name: "nome",
			message: "Digite o nome do evento: ",
			validate: (input: string): boolean | string => {
			if (input.trim() === "") {
				return "O nome não pode ser vazio.";
			}
			return true;
			},
		},
		{
			type: "input",
			name: "data",
			message: "Digite a data: ",
			validate: (input: string): boolean | string => {
				if (!eventoController.isDateValid(input)) {
					return "Formato de data inválido.";
				}
				return true;
			},
		},
		{
			type: "input",
			name: "local",
			message: "Digite o local: ",
			validate: (input: string): boolean | string => {
				if (input.trim() === "") {
					return "O local não pode ser vazio.";
				}
				return true;
			},
		},
		{
			type: "input",
			name: "capacidadeMaxima",
			message: "Digite a capacidade máxima: ",
			validate: (input: number): boolean | string => {
				if (input.toString() === "") {
					return "A capacidade máxima não pode ser vazia.";
				}
				return true;
			},
		},
		{
			type: "input",
			name: "participantesAtuais",
			message: "Digite o número de participantes atuais: ",
		},
	]	

  return await inquirer.prompt<IEvento>(input as any);
}

// export async function promptMenuPrincipal(): Promise<string> {
//   return inquirer
//   .prompt([
//     {
//     type: 'list',
//     name: 'opcao',
//     message: 'Escolha uma opção:',
//     choices: [
//       { name: 'Adicionar aluno', value: 'adicionar' },
//       { name: 'Listar alunos', value: 'listar' },
//       { name: 'Editar aluno', value: 'editar' },
//       { name: 'Excluir aluno', value: 'excluir' },
//       { name: 'Sair', value: 'sair' }
//     ]
//     }
//   ])
//   .then((resposta) => {
//     return resposta.opcao as string;
//   });
// }
