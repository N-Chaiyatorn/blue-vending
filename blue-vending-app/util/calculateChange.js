export default function calculateChange(changeAmount, remainingMoneyMap) {
  const coinBanknoteChangeMap = {
    1000: 0,
    500: 0,
    100: 0,
    50: 0,
    20: 0,
    10: 0,
    5: 0,
    1: 0,
  };

  const coinBankArray = Object.keys(coinBanknoteChangeMap);
  coinBankArray.sort(function (a, b) {
    return b - a;
  });

  let isEnough = true;

  for (let i = 0; i < coinBankArray.length; i++) {
    let banknoteWorth = coinBankArray[i];
    let banknoteRemain = remainingMoneyMap[banknoteWorth];

    if (banknoteWorth == 1 && changeAmount > banknoteRemain) {
      isEnough = false;
      break;
    }

    let quotient = Math.floor(changeAmount / banknoteWorth);
    let remainder = changeAmount % coinBankArray[i];

    if (banknoteRemain >= quotient) {
      coinBanknoteChangeMap[banknoteWorth] = quotient;
      remainingMoneyMap[banknoteWorth] = banknoteRemain - quotient;
    } else {
      coinBanknoteChangeMap[banknoteWorth] = banknoteRemain;
      remainder = remainder + banknoteWorth * (quotient - banknoteRemain);
    }

    changeAmount = remainder;
  }

  if (isEnough) {
    return [isEnough, coinBanknoteChangeMap, remainingMoneyMap];
  } else {
    return [isEnough];
  }
}

