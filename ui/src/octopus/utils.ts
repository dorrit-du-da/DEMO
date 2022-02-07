import { Condition as InternalCondition } from "@daml.js/da-marketplace/lib/SmartCash/InternalMerchant/Model";
import { Condition as ExternalCondiction } from "@daml.js/da-marketplace/lib/SmartCash/ExternalMerchant/Model";


export const parseDate = (d : Date | null) => {
  return (!!d && d.toString() !== "Invalid Date" && new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)) || "";
}

export const internalCondition = [
  {
    label: InternalCondition.AND,
  },
  {
    label: InternalCondition.OR,
  },
  {
    label: InternalCondition.NONE,
  }
]

export const externalCondition = [
  {
    label: ExternalCondiction.AND,
  },
  {
    label: ExternalCondiction.OR,
  },
  {
    label: ExternalCondiction.NONE,
  }
]