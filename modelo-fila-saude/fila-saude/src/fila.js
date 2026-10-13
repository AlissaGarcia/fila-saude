
function calcularIdade(dataNascimento, dataReferencia) {
  const [anoNascimento, mesNascimento, diaNascimento] = dataNascimento.split("-").map(Number);
  const [anoReferencia, mesReferencia, diaReferencia] = dataReferencia.split("-").map(Number);

  let idade = anoReferencia - anoNascimento;

  if (
    mesReferencia < mesNascimento ||
    (mesReferencia === mesNascimento && diaReferencia < diaNascimento)
  ) {
    idade--;
  }

  return idade;
}

function classificarPrioridade(paciente, dataReferencia) {
  const idade = calcularIdade(paciente.dataNascimento, dataReferencia);

  if (idade >= 80) {
    return "ESPECIAL";
  }

  if (
    idade >= 60 ||
    paciente.gestante === true ||
    paciente.lactante === true ||
    paciente.pcd === true ||
    paciente.criancaDeColo === true
  ) {
    return "PRIORITARIO";
  }

  return "NORMAL";
}

function ordenarFila(pacientes, dataReferencia) {
  const prioridades = {
    ESPECIAL: 1,
    PRIORITARIO: 2,
    NORMAL: 3
  };

  return [...pacientes].sort((pacienteA, pacienteB) => {
    const prioridadeA = prioridades[classificarPrioridade(pacienteA, dataReferencia)];
    const prioridadeB = prioridades[classificarPrioridade(pacienteB, dataReferencia)];

    if (prioridadeA !== prioridadeB) {
      return prioridadeA - prioridadeB;
    }

    const [horasA, minutosA] = pacienteA.chegada.split(":").map(Number);
    const [horasB, minutosB] = pacienteB.chegada.split(":").map(Number);

    const chegadaA = horasA * 60 + minutosA;
    const chegadaB = horasB * 60 + minutosB;

    return chegadaA - chegadaB;
  });
}

function nomeParaPainel(nomeCompleto) {
  const palavras = nomeCompleto.trim().split(/\s+/);

  const primeiroNome =
    palavras[0].charAt(0).toLocaleUpperCase("pt-BR") +
    palavras[0].slice(1).toLocaleLowerCase("pt-BR");

  if (palavras.length === 1) {
    return primeiroNome;
  }

  const ultimoSobrenome =
    palavras[palavras.length - 1].charAt(0).toLocaleUpperCase("pt-BR");

  return `${primeiroNome} ${ultimoSobrenome}.`;
}

module.exports = {
  calcularIdade,
  classificarPrioridade,
  ordenarFila,
  nomeParaPainel
};
