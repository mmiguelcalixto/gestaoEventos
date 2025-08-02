import { EventoController } from "./controller/controller";
import { promptAdcEvento, promptBuscarEvento, promptCancelarEvento, promptEdtEvento, promptMenuPrincipal, promptParticipante } from "./view/view";

async function main() {
  const controller = new EventoController();
  let sair = false;

  while (!sair) {
    await promptMenuPrincipal().then(async res => {
      switch (res) {
        case "adicionar":
          await promptAdcEvento().then(
            evento => controller.adicionarEvento(evento)
          )
          break;
        case "listar":
          controller.listarEventos();
          break;
        case "buscar":
          await promptBuscarEvento().then(
            evento => controller.buscarEventos(evento.nome, evento.local)
          );
          break;
        case "editar":
          await promptEdtEvento().then(
            evento => controller.editarEvento(evento.id, { ...evento })
          );
          break;
        case "cancelar":
          await promptCancelarEvento().then(
            evento => controller.cancelarEvento(evento.id)
          );
          break;
        case "registrar":
          await promptParticipante().then(
            evento => controller.registrarParticipante(evento.id, evento.novosParticipantes)
          );
          break;
        case "sair":
          sair = true;
          break;
        default:
          break;
      }
    });
  }
}

main();