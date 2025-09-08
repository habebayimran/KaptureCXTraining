const amountInput = document.getElementById("amountInput");
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const convertBtn = document.getElementById("convertBtn");
const resultOutput = document.getElementById("resultOutput");

const apiURL = "https://open.er-api.com/v6/latest/";

const convertCurrency = async () => {
  try {
    const amount = parseFloat(amountInput.value);
    const from = fromCurrency.value;
    const to = toCurrency.value;

    if (isNaN(amount) || amount <= 0) {
      resultOutput.textContent = "Please enter a valid amount.";
      return;
    }

    const response = await fetch(apiURL + from);
    if (!response.ok) {
      throw new Error("Failed to fetch exchange rates.");
    }

    const data = await response.json();
    const { rates } = data;

    if (!rates[to]) {
      resultOutput.textContent = "Conversion not supported.";
      return;
    }

    const rate = rates[to];
    const convertedAmount = amount * rate;
    resultOutput.textContent = `${convertedAmount.toFixed(2)} ${to}`;
  } catch (error) {
    console.error("Error in conversion:", error);
    resultOutput.textContent = "An error occurred. Please try again.";
  }
};
convertBtn.addEventListener("click", convertCurrency);