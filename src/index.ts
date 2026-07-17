import { BombeiroMilitarPortal } from "./classes/BombeiroMilitarPortal";
import { PoliciaFederalPortal } from "./classes/PoliciaFederalPortal";

const policiaFederal = new PoliciaFederalPortal("https://www.gov.br/pf/pt-br/assuntos/noticias");
const bombeiroMilitar = new BombeiroMilitarPortal("https://portal.cbm.sc.gov.br/index.php/blog-de-noticias");

policiaFederal.verifyUrls();
bombeiroMilitar.verifyUrls();