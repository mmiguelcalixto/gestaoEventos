import fs from "fs"
import { v4 as uuidv4 } from 'uuid';
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

    novoEvento.id = uuidv4();

    this.eventos.push(novoEvento);

    await this.salvarEventos();

    console.log(`Evento ${novoEvento.nome} adiconado com sucesso.`);
  }
    
  public listarEventos(): void {
    if (this.eventos.length === 0) {
      console.log("Nenhum evento cadastrado.");
    } else {
      this.eventos.map(evento => {
        console.log(evento);
      });
    }
  } 

  public buscarEventos(nome?: string, local?: string): void {
    if (nome) {
      const nomeEventos = this.eventos.filter(evento => evento.nome.toLowerCase() === nome.toLowerCase())
      if (nomeEventos.length !== 0) {
        nomeEventos.map(evento => console.log(evento));
      } else {
        console.log("Não há eventos com esse nome.")
      }
    }

    if (local) {
      const localEventos = this.eventos.filter(evento => evento.local.toLowerCase() === local.toLowerCase())
      if (localEventos.length !== 0) {
        localEventos.map(evento => console.log(evento));
      } else {
        console.log("Não há eventos nesse local.")
      }
    }
  }

  public async salvarEventos() {
    try {
      const json = JSON.stringify(this.eventos, null, 2);
      fs.writeFileSync(this.dbFile, json, "utf-8");
    } catch (error) {
      throw error;
    }
  }

  public async editarEvento(id: string, novosDados: IEvento): Promise<void> {
    let evento = this.eventos.find(evento => evento.id  === id);
    console.log(novosDados)

    if (evento) {
      evento = {
        id: evento.id,
        nome: novosDados.nome === "" ?  evento.nome : novosDados.nome,
        data: novosDados.data  === "" ? evento.data : novosDados.data,
        local: novosDados.local  === "" ? evento.local : novosDados.local,
        capacidadeMaxima: novosDados.capacidadeMaxima  === null ? evento.capacidadeMaxima : novosDados.capacidadeMaxima,
        participantesAtuais: evento.participantesAtuais,
        status: evento.status,
      };
      
      const index = this.eventos.findIndex(a => a.id === evento?.id);
      this.eventos[index] = evento;

      await this.salvarEventos();

      console.log(`Evento ${id} editado com sucesso.`);
    } else {
      throw new Error(`Evento com id ${id} não encontrado`);
    }
  }

  public async cancelarEvento(id: string): Promise<void> {
    let evento = this.eventos.find(evento => evento.id  === id);

    if (evento) {
      evento.status = Status.cancelado;
      const index = this.eventos.findIndex(a => a.id === evento?.id);
      this.eventos[index] = evento;

      await this.salvarEventos();

      console.log(`Evento ${id} editado com sucesso.`);
    } else {
      throw new Error(`Evento com id ${id} não encontrado`);
    }
  }

  public async registrarParticipante(id: string, novosParticipantes: number): Promise<void> {
    let evento = this.eventos.find(evento => evento.id  === id);
    console.log(novosParticipantes);
    if (evento) {
      if (novosParticipantes <= evento.capacidadeMaxima) {
        evento.participantesAtuais += novosParticipantes;
      } else {
        console.log(novosParticipantes, evento.participantesAtuais)
        console.log(`Esse número de participantes excede a capacidade máxima do evento.`)
      }

      const index = this.eventos.findIndex(a => a.id === evento?.id);
      this.eventos[index] = evento;

      await this.salvarEventos();

    } else {
      throw new Error(`Evento com id ${id} não encontrado`);
    }
  }

  public isDateValid(dateStr: string) {
    const date = new Date(dateStr);
    return !isNaN(date.getTime());
  }
}