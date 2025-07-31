enum Status {
	agendado = "agendado",
	cancelado = "cancelado",
	concluido = "concluido"
}

export interface IEvento {
	id: string,
	nome: string,
	data: string,
	local: string,
	capacidadeMaxima: number,
	participantesAtuais: number,
	status: Status
}