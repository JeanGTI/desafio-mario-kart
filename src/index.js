const player1 = {
    NOME: "Mario🔴",
    VALOCIDADE: 4,
    MANOBRABILIDADE: 3,
    PODER: 3,
    PONTOS: 0,
};

const player2 = {
    NOME: "Luigi🟢",
    VALOCIDADE: 3,
    MANOBRABILIDADE: 4,
    PODER: 4,
    PONTOS: 0,
};



async function rollDice() {
    return Math.floor(Math.random() * 6)+ 1;
}

async function getRandomBlock() {
    let random = Math.random();
    let result;

    switch (true) {
        case random < 0.33:
        result = "RETA"
        break;
    case random < 0.66:
        result = "CURVA"
        break;
    default:
        result = "CONFRONTO"
    }
    return result;
}

async function logRollResult (characterName, block, diceResult, atribute) {
    console.log(`${characterName}🎲 rolou um dado ${block} ${diceResult} + ${atribute} = ${diceResult + atribute}`);


}

async function playRaceEngine(character1, character2) {
    for (let round = 1; round <= 5; round++) {
        if (round == 5) {
            console.log(`🏁 Rodada final ☠️`);
        } else {
            console.log(`🏁 Rodada ${round}!`);
        }
        //sortear bloco
        let block = await getRandomBlock();
        //usei switch pra mudar a forma como é exibido o bloco
        switch (true) {
            case block == "RETA":
                console.log(`🛣️  Bloco: ${block}!\n`);
                break;
            case block == "CURVA":
                console.log(`↩️  Bloco: ${block}!\n`);
                break;
            default:
                console.log(`☠️  Bloco: ${block}!\n`);
        }

        //roldar dados
        let diceResult1 = await rollDice();
        let diceResult2 = await rollDice();

        //teste de habilidade
        let totalTesteSkill1 = 0;
        let totalTesteSkill2 = 0;

        if (block === "RETA") {
            totalTesteSkill1 = diceResult1 + character1.VALOCIDADE;
            totalTesteSkill2 = diceResult2 + character2.VALOCIDADE;
            
            await logRollResult(character1.NOME, "velocidade" , diceResult1, character1.VALOCIDADE);
            await logRollResult(character2.NOME, "velocidade" , diceResult1, character2.VALOCIDADE);

            if (totalTesteSkill1 > totalTesteSkill2) {
                console.log(`${character1.NOME} venceu em velocidade! 🛣️`);
                character1.PONTOS++;
            }
            
            if (totalTesteSkill2 > totalTesteSkill1) {
                console.log(`${character2.NOME} venceu em velocidade! 🛣️`);
                character2.PONTOS++;
            }
        }
        if (block === "CURVA") {
            totalTesteSkill1 = diceResult1 + character1.MANOBRABILIDADE;
            totalTesteSkill2 = diceResult2 + character2.MANOBRABILIDADE;

            await logRollResult(character1.NOME, "manobrabilidade" , diceResult1, character1.MANOBRABILIDADE);
            await logRollResult(character2.NOME, "manobrabilidade" , diceResult1, character2.MANOBRABILIDADE);

            if (totalTesteSkill1 > totalTesteSkill2) {
                console.log(`${character1.NOME} venceu em manobrabilidade! ↩️`);
                character1.PONTOS++;
            }
            
            if (totalTesteSkill2 > totalTesteSkill1) {
                console.log(`${character2.NOME} venceu em manobrabilidade! ↩️`);
                character2.PONTOS++;
            }
        }
        if (block === "CONFRONTO") {
            let powerResult1 = diceResult1 + character1.POWER;
            let powerResult2 = diceResult2 + character1.POWER;

            console.log(`${character1.NOME} confrontou ${character2.NOME}🥊`);
            await logRollResult(character1.NOME, "poder" , diceResult1, character1.PODER);
            await logRollResult(character2.NOME, "poder" , diceResult2, character2.PODER);

            //if ternario
            character2.PONTOS -= powerResult1 > powerResult2 && character2.PONTOS > 0 ? 1 : 0
            character1.PONTOS -= powerResult2 > powerResult1 && character1.PONTOS > 0 ? 1 : 0
            console.log(powerResult1 === powerResult2 ? "Confronto empatado" : "");

            if (powerResult1 > powerResult2 && character2.PONTOS > 0) {
                console.log(`${character1} venceu o confronto! 🐢`);
                character2.PONTOS--;
            }

            
            if (powerResult2 > powerResult1 && character1.PONTOS > 0) {
                console.log(`${character2} venceu o confronto! 🐢`);
                character1.PONTOS--;
            }
        }

        //verifica vencedor
        if (totalTesteSkill1 > totalTesteSkill2) {
            console.log(`${character1.NOME} marcou um ponto!`);
            console.log("________________________________________________________________");
        } else if (totalTesteSkill2 > totalTesteSkill1) {
            console.log(`${character2.NOME} marcou um ponto!`);
            console.log("________________________________________________________________");
        }
        
    }

}

async function declareWinner(character1, character2) {
    console.log("Resultado final:")
    console.log(`${character1.NOME}: ${character1.PONTOS} ponto(s).`)
    console.log(`${character2.NOME}: ${character2.PONTOS} ponto(s).`)

    if (character1.PONTOS > character2.PONTOS) {
        console.log(`\n${character1.NOME} venceu a corrida! Parabéns! 🏆`);
    } else if (character2.PONTOS > character1.PONTOS) {
        console.log(`\n${character2.NOME} venceu a corrida! Parabéns! 🏆`);
    } else {
        console.log(`\nA corrida terminou em empate!`);
    }
}

//Função auto invocavel
(async function main() {
    console.log(`🏁🚦Corrida entre ${player1.NOME} e ${player2.NOME} começando...\n`);
    await playRaceEngine(player1, player2);
    await declareWinner(player1, player2);
})();