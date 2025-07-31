import fs from "fs"
import { IEvento, Status } from "../model/IEvento";

export class EventoController {
  private dbFile: string = `src/database/database.json`;

  private conteudoDoArquivo = fs.readFileSync(this.dbFile, "utf-8");

  private eventos: IEvento[] = JSON.parse(this.conteudoDoArquivo);
  
  public async adicionarEvento(novoEvento: IEvento): Promise<void> {
    this.eventos.map(evento => {
      if (evento.nome.toLowerCase() === novoEvento.nome.toLowerCase() && evento.data === novoEvento.data) {
        throw new Error("Já existe um evento com esse nome e data.");
      }  
    })

    if (novoEvento.capacidadeMaxima <  0) throw new Error("Valor de capacidade máxima inválido.");
 
    if (Date.now() < new Date(novoEvento.data).getMilliseconds()) {
      novoEvento.status = Status.agendado;
    } else if (Date.now() > new Date(novoEvento.data).getMilliseconds()) {
      novoEvento.status = Status.concluido;
    }

    this.eventos.push(novoEvento);

    await this.salvarEventos();

    console.log(`Evento ${novoEvento.nome} adiconado com sucesso.`);
  }

  public async salvarEventos() {
    try {
      const json = JSON.stringify(this.eventos, null, 2);
      fs.writeFileSync(this.dbFile, json, "utf-8");
    } catch (error) {
      throw error;
    }
  }

  public isDateValid(dateStr: string) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
}