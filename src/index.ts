// import { Alesc } from "./classes/AlescPortal";
import { BombeiroMilitarPortal } from "./classes/BombeiroMilitarPortal";
import { MinisterioPublicoPortal } from "./classes/MinisterioPublicoPortal";
import { PoliciaFederalPortal } from "./classes/PoliciaFederalPortal";
import { SantaCatarina } from "./classes/SantaCatarina";
import { Trf4 } from "./classes/Trf4Portal";
// import { PoliciaRodoviariaFederalPortal } from "./classes/PoliciaRodoviariaFederalPortal";

const policiaFederal = new PoliciaFederalPortal("https://www.gov.br/pf/pt-br/assuntos/noticias");
const bombeiroMilitar = new BombeiroMilitarPortal("https://portal.cbm.sc.gov.br/index.php/blog-de-noticias");
// const policiaRodoviaria = new PoliciaRodoviariaFederalPortal("https://www.gov.br/prf/pt-br/search?SearchableText=santa%20catarina");
const ministerioPublico = new MinisterioPublicoPortal("https://www.mpsc.mp.br/noticias-mpsc");
const trf4 = new Trf4('https://www.trf4.jus.br/trf4/controlador.php?acao=noticia_portal');
// const alesc = new Alesc('https://www.alesc.sc.gov.br/imprensa/noticias/');
const santaCatarina = new SantaCatarina('https://noticias.sc.gov.br/todas-as-noticias');


policiaFederal.verifyUrls();
bombeiroMilitar.verifyUrls();
// policiaRodoviaria.verifyUrls();
ministerioPublico.verifyUrls();
trf4.verifyUrls();
// alesc.verifyUrls();

try {
    santaCatarina.verifyUrls();
} catch (err) {
    console.log(err);
}