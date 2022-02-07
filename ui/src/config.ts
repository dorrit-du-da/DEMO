import * as jwt from "jsonwebtoken";
import { parties } from "./parties";
export const isLocalDev = process.env.NODE_ENV === 'development';

const host = window.location.host.split('.');
const ledgerId = isLocalDev ? "da-marketplace-sandbox" : host[0];
const apiUrl = host.slice(1);
apiUrl.unshift('api');

export const httpBaseUrl = isLocalDev ? undefined : ('https://' + apiUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/data/' + ledgerId + '/');
export const wsBaseUrl = isLocalDev ? 'ws://localhost:7575/' : undefined;

const applicationId = "se2life";
const createToken = (party : string) => jwt.sign({ "https://daml.com/ledger-api": { ledgerId, applicationId, admin: true, actAs: [party], readAs: [party, "Public"] } }, "secret");

let loginUrl = host.slice(1)
loginUrl.unshift('login')
export const dablLoginUrl = loginUrl.join('.') + (window.location.port ? ':' + window.location.port : '') + '/auth/login?ledgerId=' + ledgerId;

export function getParty(name : string) {
  return isLocalDev ? name : (parties.get(name) || "");
}

export function getName(party : string) {
  return isLocalDev ? party : party //(names.get(party) || "");
}

export function getToken(party : string) {
  return isLocalDev ? createToken(party) : createToken(party)  //(tokens.get(party) || "");
}

export function getTemplateId(t : string) {
  const parts = t.split(":").slice(1)
  return parts[0] + "." + parts[1];
}

export const partymap = {
  operator: "PlatformOperator",
  intMerchant1:"MerchandiseService",
  intMerchant2:"CreditCardService",
  intMerchant3:"VoucherService",
  intMerchant4:"DigitalProductService",
  extMerchant1:"Partner1",
  extMerchant2:"Partner2",
  extMerchant3:"Partner3",
  extMerchant4:"Partner4",
  customer1:"Alice",
  customer2:"Bob",
  customer3:"Charlie"
}

export function CheckCustomer(party: string) {
  return (party == partymap.customer1 || party == partymap.customer2 || party == partymap.customer3)
}

export function CheckOperator(party: string) {
  return (party == partymap.operator )
}

export function CheckInternalMerchant(party: string) {
  return (party == partymap.intMerchant1 || party == partymap.intMerchant2 || party == partymap.intMerchant3 || party == partymap.intMerchant4)
}

export function CheckExternalMerchant(party: string) {
  return (party == partymap.extMerchant1 || party == partymap.extMerchant2 || party == partymap.extMerchant3 || party == partymap.extMerchant4)
}

export function CheckRuleCreator(party: string){
  return (party == partymap.intMerchant1 || party == partymap.intMerchant2 || party == partymap.intMerchant3 || party == partymap.intMerchant4 ||party == partymap.extMerchant1 || party == partymap.extMerchant2 || party == partymap.extMerchant3 || party == partymap.extMerchant4 || party == partymap.operator)
}