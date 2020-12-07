var botui = new BotUI('allius-bot');

let interesse;
let entidadeFilantropica = {
    nome: '',
    maisDeUmAnoDeConstituicao: null,
    manifestacoes: [],
    certificada: null,
    sede: '',
    atividades: '',
    possuiPatrocinador: '',
    temInteresseLie: '',
    temInteresseLieOutros: '',
    projeto: {
        abrangencia: '',
        abrangenciaDescricao: '',
        etapasQuePrecisaDeAssessoria: [],
        etapasQuePrecisaDeAssessoriaOutro: ''
    }
};

let RESPOSTAS = {
    LIE_OBJETIVO: '',
    // EMPRESA
    EMPRESA__NOME: '',
    EMPRESA__TRIBUTACAO_LUCRO_REAL: '',
    EMPRESA__CONTRIBUINTE_ICMS: '',
    EMPRESA__CONTRIBUINTE_ICMS__ESTADOS: '',
    EMPRESA__CONTRIBUINTE_ISS: '',
    EMPRESA__CONTRIBUINTE_ISS__ESTADOS: '',
    EMPRESA__POSSUI_PROJETOS_DEFINIDOS: '',
    EMPRESA__POSSUI_PROJETOS_DEFINIDOS__ALVO: '',

    // ATLETA
    ATLETA__ALTO_RENDIMENTO: '',

    // ENTIDADE_FILANTROPICA
    ENTIDADE_FILANTROPICA__NOME: '',
    ENTIDADE_FILANTROPICA__TEMPO_CONSTITUICAO_MAIOR_UM_ANO: '',
    ENTIDADE_FILANTROPICA__ESPORTE_MANIFESTACOES: '',
    ENTIDADE_FILANTROPICA__LOCALILIZACAO: '',
    ENTIDADE_FILANTROPICA__ATIVIDADES: '',
    ENTIDADE_FILANTROPICA__POSSUI_APOIADORES: '',
    ENTIDADE_FILANTROPICA__INTERESSE: '',
    ENTIDADE_FILANTROPICA__INTERESSE__OUTROS: '',
    ENTIDADE_FILANTROPICA__PROJETO__LIE: '',
    ENTIDADE_FILANTROPICA__PROJETO__LIE_DESCRIPTION: '',
    ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS: '',
    ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS__OUTROS_DESCRICAO: '',
    ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS__DEMANDA_DESCRICAO: '',
}

const QUESTIONARIO = {
    LIE_OBJETIVO: {
        PERGUNTA: 'Qual seu interesse em relação à Lei de Incentivo ao Esporte?',
        OPCOES: [
            { text: 'Represento uma entidade sem fins econômicos de natureza esportiva', value: 'sem_fins_lucrativos' }, 
            { text: 'Represento uma empresa que patrocina ou pretende patrocinar projetos por meio de lei de incentivo', value: 'empresa'},
            { text: 'Sou atleta', value: 'atleta'},
            { text: 'Outros', value: 'outros'},
        ]
    },
    // EMPRESA
    EMPRESA__NOME: 'Informe aqui o nome da empresa',
    EMPRESA__TRIBUTACAO_LUCRO_REAL: {
        PERGUNTA: 'A empresa é tributada pelo lucro real ?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'nao' },
            { text: 'Não sei informar', value: 'nao_sei_informar' },
        ]
    },
    EMPRESA__CONTRIBUINTE_ICMS: {
        PERGUNTA: 'A empresa é contribuinte de ICMS ?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'nao' },
            { text: 'Não sei informar', value: 'nao_sei_informar' },
        ]
    },
    EMPRESA__CONTRIBUINTE_ISS: {
        PERGUNTA: 'A empresa é contribuinte de ISS?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'nao' },
            { text: 'Não sei informar', value: 'nao_sei_informar' },
        ]
    },
    EMPRESA__POSSUI_PROJETOS_DEFINIDOS: {
        PERGUNTA: 'A empresa já tem definidos os projetos e/ou entidades que pretende patrocinar?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'nao' },
        ]
    },
    // ATLETA 
    ATLETA__ALTO_RENDIMENTO: {
        PERGUNTA: 'Você é atleta de alto rendimento?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'nao' },
        ]
    },
    ATLETA__MODALIDADE: {
        PERGUNTA: 'Qual modalidade esportiva você pratica?',
        PLACEHOLDER: 'Nome da modalidade',
    },
    ATLETA__VINCULO_PROJETO_LIE: {
        PERGUNTA: 'Sua atividade esportiva é atendida por algum projeto vinculado a leis de incentivo ao esporte?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'nao' },
        ]
    },
    ATLETA__PATROCINADORES: {
        PERGUNTA: 'Você possui patrocinador(es)?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'nao' },
            { text: 'Há empresas interessadas, mas que querem vincular o patrocínio à lei de incentivo ao esporte', value: 'existem_empresas_interessadas' },
        ]
    },

    // ENTIDADE_FILANTROPICA
    ENTIDADE_FILANTROPICA__NOME: 'Pode nos informar o nome da entidade?',
    ENTIDADE_FILANTROPICA__TEMPO_CONSTITUICAO_MAIOR_UM_ANO: {
        PERGUNTA: 'A entidade já possui mais de um ano de constituição?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'nao' },
        ]
    },
    ENTIDADE_FILANTROPICA__ESPORTE_MANIFESTACOES: {
        PERGUNTA: 'A entidade atua em qual(is) manifestação(ões) do esporte?',
        OPCOES: [
            { text: 'Esporte de rendimento', value: 'esporte_de_rendimento', },
            { text: 'Esporte de participação', value: 'esporte_de_participacao', },
            { text: 'Esporte educacional', value: 'esporte_educacional', },
            { text: 'Esporte de formação', value: 'esporte_de_formacao', },
            { text: 'Não sei informar', value: 'nao_sei_informar', },
        ]
    },
    ENTIDADE_FILANTROPICA__POSSUI_CERTIFICACAO: {
        PERGUNTA: 'A entidade é certificada pelo Ministério da Cidadania (Secretaria Especial do Esporte)?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'não' },
            { text: 'Não sei informar', value: 'nao_sei_informar' },
        ]
    },
    ENTIDADE_FILANTROPICA__LOCALILIZACAO_E_ATIVIDADES: {
        PERGUNTA: 'Pode nos informar a cidade onde a entidade tem sede, e a(s) cidade(s) onde suas atividades são realizadas?'
    },
    ENTIDADE_FILANTROPICA__POSSUI_APOIADORES: {
        PERGUNTA: 'A entidade possui patrocinador(es) ou doador(es)?',
        OPCOES: [
            { text: 'Sim', value: 'sim' },
            { text: 'Não', value: 'não' },
            { text: 'Há empresas interessadas, mas que querem vincular o patrocínio/doação à lei de incentivo ao esporte', value: 'ha_empresas_interessadas' },
        ]
    },
    ENTIDADE_FILANTROPICA__INTERESSE: {
        PERGUNTA: 'Qual o interesse da entidade quanto à Lei de Incentivo ao Esporte?',
        OPCOES: [
            { text: 'Nunca utilizou esse mecanismo e quer passar a utilizar', value: 'tem_interesse' },
            { text: 'Tem projeto(s) já apresentado(s) e precisa de assessoria jurídica', value: 'precisa_de_acessoria' },
            { text: 'Outros', value: 'outros' },
        ],
    },
    ENTIDADE_FILANTROPICA__INTERESSE__OUTROS: {
        PERGUNTA: 'Qual outro ?'
    },
    ENTIDADE_FILANTROPICA__PROJETO__LIE: {
        PERGUNTA: 'O(s) projeto(s) encontra(m)-se inserido(s) em que lei de incentivo ao esporte?',
        OPCOES: [
            { text: 'Federal', value: 'federal' },
            { text: 'Estadual', value: 'estadual' },
            { text: 'Municipal', value: 'municipal' },
        ]
    },
    ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS: {
        PERGUNTA: 'A entidade precisa de assessoria em que etapa(s)?',
        OPCOES: [
            { text: 'Elaboração ou alteração do plano de trabalho', value: 'elaboracao_ou_alteracao_do_plano_de_trabalho' },
            { text: 'Captação de recursos', value: 'captacao_de_recursos' },
            { text: 'Execução do projeto', value: 'execucao_do_projeto' },
            { text: 'Prestação de contas', value: 'prestacao_de_contas' },
            { text: 'Preciso de assessoria geral para um ou mais projetos, em fases diferentes', value: 'preciso_de_assessoria_geral_para_um_ou_mais_projetos_em_fases_diferentes' },
            { text: 'Outros', value: 'outros' },
        ]
    },
    ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS__OUTROS_DESCRICAO: 'Descreva aqui qual outra a assessoria jurídica pretendida',
    ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS__DEMANDA_DESCRICAO: 'Descreva aqui a situação que demanda a assessoria jurídica pretendida',

    // OUTROS
    OUTROS_DEMANDA: {
        PERGUNTA: 'Informe aqui a situação que demanda a assessoria jurídica pretendida',
        PLACEHOLDER: 'Digite sua demanda'
    }
}

botui.message
    .bot(QUESTIONARIO.LIE_OBJETIVO.PERGUNTA)
    .then(() => botui.action.button({ delay: 500, action: QUESTIONARIO.LIE_OBJETIVO.OPCOES }))
    .then(({ value }) => {
        RESPOSTAS.LIE_OBJETIVO = value

        switch(RESPOSTAS.LIE_OBJETIVO) {
            case 'sem_fins_lucrativos': 
                return cadastrarEntidadeFilantropica();
            case 'empresa': 
                return cadastrarEmpresa();
            case 'atleta':
                return cadastrarAtleta();
            case 'outros':
                return cadastrarOutros();
        }
    })
    .then(() => {
        fim()
    });


const cadastrarAtleta = async () => {
    // ATLETA__ALTO_RENDIMENTO
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ATLETA__ALTO_RENDIMENTO.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.ATLETA__ALTO_RENDIMENTO.OPCOES }))
        .then(({ value }) => RESPOSTAS.ATLETA__ALTO_RENDIMENTO = value)
        
    // ATLETA__MODALIDADE
        await botui.message.bot({ delay: 500, content: QUESTIONARIO.ATLETA__MODALIDADE.PERGUNTA })
            .then(() => botui.action.text({ action: { placeholder: QUESTIONARIO.ATLETA__MODALIDADE.PLACEHOLDER } }))
            .then(({ value }) => RESPOSTAS.ATLETA__MODALIDADE = value)
            
    // ATLETA__VINCULO_PROJETO_LIE
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ATLETA__VINCULO_PROJETO_LIE.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.ATLETA__VINCULO_PROJETO_LIE.OPCOES }))
        .then(({ value }) => RESPOSTAS.ATLETA__VINCULO_PROJETO_LIE = value)

    // ATLETA__PATROCINADORES
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ATLETA__PATROCINADORES.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.ATLETA__PATROCINADORES.OPCOES }))
        .then(({ value }) => RESPOSTAS.ATLETA__PATROCINADORES = value)

}

const cadastrarOutros = async () => {
    // ATLETA__MODALIDADE
    await botui.message.bot({ delay: 500, content: QUESTIONARIO.OUTROS_DEMANDA.PERGUNTA })
        .then(() => botui.action.text({ action: { placeholder: QUESTIONARIO.OUTROS_DEMANDA.PLACEHOLDER } }))
        .then(({ value }) => RESPOSTAS.OUTROS_DEMANDA = value)
}

const cadastrarEmpresa = async () => {
    // EMPRESA__NOME
    await botui.message.bot({ delay: 500, content: 'Informe aqui o nome da empresa' })
        .then(() => botui.action.text({ action: { placeholder: 'Nome da entidade' } }))
        .then(({ value }) => RESPOSTAS.EMPRESA__NOME = value)
    
    // EMPRESA__TRIBUTACAO_LUCRO_REAL
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.EMPRESA__TRIBUTACAO_LUCRO_REAL.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.EMPRESA__TRIBUTACAO_LUCRO_REAL.OPCOES }))
        .then(({ value }) => RESPOSTAS.EMPRESA__TRIBUTACAO_LUCRO_REAL = value)

    // EMPRESA__CONTRIBUINTE_ICMS
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.EMPRESA__CONTRIBUINTE_ICMS.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.EMPRESA__CONTRIBUINTE_ICMS.OPCOES }))
        .then(({ value }) => {
            RESPOSTAS.EMPRESA__CONTRIBUINTE_ICMS = value

            if(RESPOSTAS.EMPRESA__CONTRIBUINTE_ICMS == 'sim') {
                return botui.message.bot({ delay: 500, content: 'Informe aqui o(s) estado(s) em que a empresa recolhe ICMS' })
                    .then(() => botui.action.text({ action: {} }))
                    .then(({ value }) => RESPOSTAS.EMPRESA__CONTRIBUINTE_ICMS__ESTADOS = value)
            }
        })
        
    // EMPRESA__CONTRIBUINTE_ICMS
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.EMPRESA__CONTRIBUINTE_ISS.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.EMPRESA__CONTRIBUINTE_ISS.OPCOES }))
        .then(({ value }) => {
            RESPOSTAS.EMPRESA__CONTRIBUINTE_ISS = value

            if(RESPOSTAS.EMPRESA__CONTRIBUINTE_ISS == 'sim') {
                return botui.message.bot({ delay: 500, content: 'Informe aqui o(s) estado(s) em que a empresa recolhe ICMS' })
                    .then(() => botui.action.text({ action: {} }))
                    .then(({ value }) => RESPOSTAS.EMPRESA__CONTRIBUINTE_ISS__ESTADOS = value)
            }
        })
        
    // EMPRESA__POSSUI_PROJETOS_DEFINIDOS
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.EMPRESA__POSSUI_PROJETOS_DEFINIDOS.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.EMPRESA__POSSUI_PROJETOS_DEFINIDOS.OPCOES }))
        .then(({ value }) => {
            RESPOSTAS.EMPRESA__POSSUI_PROJETOS_DEFINIDOS = value

            if(RESPOSTAS.EMPRESA__POSSUI_PROJETOS_DEFINIDOS == 'sim') {
                return botui.message.bot({ delay: 500, content: 'Informe aqui o nome da entidade e/ou o projeto que pretende patrocinar' })
                    .then(() => botui.action.text({ action: {} }))
                    .then(({ value }) => RESPOSTAS.EMPRESA__POSSUI_PROJETOS_DEFINIDOS__ALVO = value)
            }
        })
}

const cadastrarEntidadeFilantropica = async () => {
    // ENTIDADE_FILANTROPICA__NOME
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__NOME })
        .then(() => botui.action.text({ action: { placeholder: 'Nome da entidade' } }))
        .then(({ value }) => RESPOSTAS.ENTIDADE_FILANTROPICA__NOME = value)

    // ENTIDADE_FILANTROPICA__TEMPO_CONSTITUICAO_MAIOR_UM_ANO
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__TEMPO_CONSTITUICAO_MAIOR_UM_ANO.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.ENTIDADE_FILANTROPICA__TEMPO_CONSTITUICAO_MAIOR_UM_ANO.OPCOES }))
        .then(({ value }) => RESPOSTAS.ENTIDADE_FILANTROPICA__TEMPO_CONSTITUICAO_MAIOR_UM_ANO = value)

    // ENTIDADE_FILANTROPICA__ESPORTE_MANIFESTACOES
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__ESPORTE_MANIFESTACOES.PERGUNTA })
        .then(() => botui.action.select({
            action: {
                placeholder: 'Selecione a(as) manifestação(ões)',
                multipleselect: true,
                options: QUESTIONARIO.ENTIDADE_FILANTROPICA__ESPORTE_MANIFESTACOES.OPCOES,
                button: {
                    icon: 'check',
                    label: 'Continuar'
                }
            }
        }))
        .then(({ value }) => RESPOSTAS.ENTIDADE_FILANTROPICA__ESPORTE_MANIFESTACOES = value)

    // ENTIDADE_FILANTROPICA__POSSUI_CERTIFICACAO
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__POSSUI_CERTIFICACAO.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.ENTIDADE_FILANTROPICA__POSSUI_CERTIFICACAO.OPCOES }))
        .then(({ value }) => entidadeFilantropica.certificada = value)
    
    // ENTIDADE_FILANTROPICA__LOCALILIZACAO_E_ATIVIDADES
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__LOCALILIZACAO_E_ATIVIDADES.PERGUNTA })
        .then(() => {
            return botui.action.text({
                delay: 500,
                addMessage: false,
                action: {
                    placeholder: 'Sede'
                }
            })
            .then(({ value }) => {
                RESPOSTAS.ENTIDADE_FILANTROPICA__LOCALILIZACAO = value

                botui.message.human({ delay: 500, content: 'Localidade da sede: ' + value })
            })
        })
        .then(() => {
            return botui.action.text({
                delay: 500,
                addMessage: false,
                action: {
                    placeholder: 'Atividades realizadas'
                }
            })
            .then(({ value }) => {
                RESPOSTAS.ENTIDADE_FILANTROPICA__ATIVIDADES = value

                botui.message.human({ delay: 500, content: 'Atividades realizadas: ' + value })
            })
        })

    // ENTIDADE_FILANTROPICA__POSSUI_APOIADORES
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__POSSUI_APOIADORES.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.ENTIDADE_FILANTROPICA__POSSUI_APOIADORES.OPCOES }))
        .then(({ value }) => RESPOSTAS.ENTIDADE_FILANTROPICA__POSSUI_APOIADORES = value)
    
    // ENTIDADE_FILANTROPICA__INTERESSE
    await botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__INTERESSE.PERGUNTA })
        .then(() => botui.action.button({ action: QUESTIONARIO.ENTIDADE_FILANTROPICA__INTERESSE.OPCOES }))
        .then(({ value }) => {
            RESPOSTAS.ENTIDADE_FILANTROPICA__INTERESSE = value
            
            if(RESPOSTAS.ENTIDADE_FILANTROPICA__INTERESSE == 'outros') {
                return botui.action.text({ delay: 500, action: { placeholder: QUESTIONARIO.ENTIDADE_FILANTROPICA__INTERESSE__OUTROS.PERGUNTA } })
                    .then(({ value }) => {
                        RESPOSTAS.ENTIDADE_FILANTROPICA__INTERESSE__OUTROS = value
                    })
            } else if(RESPOSTAS.ENTIDADE_FILANTROPICA__INTERESSE == 'precisa_de_acessoria') {
                return registrarProjeto()
            }
        })
        
}

const registrarProjeto = () => {
    return botui.message
        .bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__PROJETO__LIE.PERGUNTA })
        .then(async () => {
            await botui.action.button({ action: QUESTIONARIO.ENTIDADE_FILANTROPICA__PROJETO__LIE.OPCOES })
                .then(async ({ value }) => {
                    RESPOSTAS.ENTIDADE_FILANTROPICA__PROJETO__LIE = value
                    if(value == 'estadual') {
                        await botui.action.text({
                                delay: 500,
                                addMessage: false,
                                action: {
                                    placeholder: 'Indique aqui o estado'
                                }
                            })
                            .then(({ value }) => {
                                RESPOSTAS.ENTIDADE_FILANTROPICA__PROJETO__LIE_DESCRIPTION = value
            
                                botui.message.human({ content: 'Estado: ' + value })
                            })
                    } else if(value == 'municipal') {
                        await botui.action.text({
                                delay: 500,
                                addMessage: false,
                                action: {
                                    placeholder: 'Indique aqui o município'
                                }
                            })
                            .then(({ value }) => {
                                RESPOSTAS.ENTIDADE_FILANTROPICA__PROJETO__LIE_DESCRIPTION = value
            
                                botui.message.human({ content: 'Município: ' + value })
                            })
                    }
                })

            await botui.action.select({
                    action: {
                        placeholder: QUESTIONARIO.ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS.PERGUNTA,
                        multipleselect: true,
                        addMessage: false,
                        options: QUESTIONARIO.ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS.OPCOES,
                        button: {
                            icon: 'check',
                            label: 'Continuar'
                        }
                    }
                })
                .then(async (response) => {
                    RESPOSTAS.ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS = response.text

                    if(response.value.includes('outros')) {
                        await botui.message.bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS__OUTROS_DESCRICAO })
                        await botui.action.text({ action: { placeholder: 'Descreva aqui' } })
                            .then((response) => RESPOSTAS.ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS__OUTROS_DESCRICAO = response)
                    }

                    if(QUESTIONARIO.ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS.OPCOES
                        .filter(opcao => opcao.value != 'outros')
                        .some(opcao => response.value.includes(opcao.value)))
                        {
                            await botui.message.bot({ delay: 500, content: QUESTIONARIO.ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS__DEMANDA_DESCRICAO })
                            await botui.action.text({ action: { placeholder: 'Descreva aqui' } })
                                .then((value) => 
                                    RESPOSTAS.ENTIDADE_FILANTROPICA__PROJETO__ASSESSORIA_ETAPAS__DEMANDA_DESCRICAO = value)
                        }
                })
        })
}

const fim = function () {
    botui.message
        .bot({
            delay: 1000,
            content: 'Obrigado, entraremos em contato em breve.'
    });
}