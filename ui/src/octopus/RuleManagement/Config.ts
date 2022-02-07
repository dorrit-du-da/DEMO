import { Factor, Reward, Grade} from "@daml.js/da-marketplace/lib/SmartCash/Rule/Model";


export const parseDate = (d : Date | null) => {
  return (!!d && d.toString() !== "Invalid Date" && new Date(d.getTime() - d.getTimezoneOffset() * 60000).toISOString().slice(0, 10)) || "";
}

export const rewards = [
  {
    label: Reward.DISCOUT,
  },
  {
    label: Reward.MULTIPLY,
  },
  {
    label: Reward.FIXED_PX,
  },
  {
    label: Reward.FIXED_CUT,
  }
]

export const criterias = [
    {
      label: Factor.DATE,
    },
    {
      label: Factor.TIME,
    },
    {
      label: Factor.ONE_OFF_QTY,
    },
    {
      label: Factor.ONE_OFF_AMOUNT,
    },
    {
      label: Factor.ACCUMULATED_QTY,
    },
    {
      label: Factor.ACCUMULATED_AMOUNT,
    },
    {
      label: Factor.MEMBERSHIP,
    },
    {
      label: Factor.ANY,
    }
  ]

  export const grades = [
    {
      label: Grade.GOLD,
    },
    {
      label: Grade.SILVER,
    },
    {
      label: Grade.BRONZE,
    },
    {
      label: Grade.NORMAL,
    }
  ]