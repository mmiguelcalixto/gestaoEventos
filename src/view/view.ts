import { EventoController } from "../controller/controller";
import { IBusca, IEvento }  from "../model/IEvento";
import inquirer from "inquirer"

const eventoController = new EventoController();

export async function promptAdcEvento(): Promise<IEvento> {
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

export async function promptEdtEvento(): Promise<IEvento> {
  const input = [
		{
			type: "input",
			name: "id",
			message: "Digite o id do evento: ",
		},
		{
			type: "input",
			name: "nome",
			message: "Digite o nome do evento: ",
		},
		{
			type: "input",
			name: "data",
			message: "Digite a data: ",

		},
		{
			type: "input",
			name: "local",
			message: "Digite o local: ",

		},
		{
			type: "input",
			name: "capacidadeMaxima",
			message: "Digite a capacidade máxima: ",
		},
		{
			type: "input",
			name: "participantesAtuais",
			message: "Digite o número de participantes atuais: ",
		},
	]	

  return await inquirer.prompt<IEvento>(input as any);
}

export async function promptMenuPrincipal(): Promise<string> {
  return inquirer
  .prompt([
    {
    type: 'list',
    name: 'opcao',
    message: 'Escolha uma opção:',
    choices: [
      { name: 'Adicionar evento', value: 'adicionar' },
      { name: 'Listar eventos', value: 'listar' },
      { name: 'Buscar evento', value: 'buscar' },
      { name: 'Editar evento', value: 'editar' },
      { name: 'Cancelar evento', value: 'cancelar' },
      { name: 'Registrar participante', value: 'registrar' },
      { name: 'Sair', value: 'sair' }
    ]
    }
  ])
  .then((resposta) => {
    return resposta.opcao as string;
  });
}

export async function promptBuscarEvento(): Promise<IEvento> {
  const input = [
		{
			type: "input",
			name: "nome",
			message: "Digite o nome do evento: ",
		},
		{
			type: "input",
			name: "local",
			message: "Digite o local: ",
		},
	]	

  return await inquirer.prompt<IEvento>(input as any);
}

export async function promptParticipante(): Promise<IBusca> {
  const input = [
		{
			type: "input",
			name: "id",
			message: "Digite o id do evento: ",
		},
		{
			type: "input",
			name: "novosParticipantes",
			message: "Digite o número de participantes novos:",
		},
	]	

  return await inquirer.prompt<IBusca>(input as any);
}

export async function promptCancelarEvento(): Promise<IEvento> {
  const input = [
		{
			type: "input",
			name: "id",
			message: "Digite o id do evento: ",
		},
	]	

  return await inquirer.prompt<IEvento>(input as any);
}