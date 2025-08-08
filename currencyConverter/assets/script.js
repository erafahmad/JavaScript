import { countryList, defaultCurrencies } from './currency-data.js';

// Free API from ExchangeRate-API (no API key needed for basic usage)
const BASE_URL = "https://open.er-api.com/v6/latest";

// DOM elements
const elements = {
  dropdowns: document.querySelectorAll(".dropdown select"),
  btn: document.querySelector("form button"),
  fromCurr: document.querySelector(".from select"),
  toCurr: document.querySelector(".to select"),
  msg: document.querySelector(".msg"),
  amountInput: document.querySelector(".amount input")
};

/**
 * Initializes dropdown menus with currency options
 */
function initializeDropdowns() {
  elements.dropdowns.forEach(select => {
    // Clear existing options first
    select.innerHTML = '';
    
    for (const currCode in countryList) {
      const newOption = document.createElement("option");
      newOption.innerText = currCode;
      newOption.value = currCode;
      
      // Set default selections
      if (select.name === "from" && currCode === defaultCurrencies.from) {
        newOption.selected = true;
      } else if (select.name === "to" && currCode === defaultCurrencies.to) {
        newOption.selected = true;
      }
      select.append(newOption);
    }

    // Update flag when currency changes
    select.addEventListener("change", (evt) => {
      updateFlag(evt.target);
    });
  });
}

/**
 * Fetches and updates the exchange rate
 */
const updateExchangeRate = async () => {
  let amtVal = parseFloat(elements.amountInput.value);
  
  // Validate amount input
  if (isNaN(amtVal) || amtVal < 0) {
    amtVal = 1;
    elements.amountInput.value = "1";
  }

  // Show loading state
  elements.msg.innerText = "Loading...";
  elements.msg.style.color = "inherit";

  try {
    const response = await fetch(`${BASE_URL}/${elements.fromCurr.value}`);
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const data = await response.json();
    
    if (data.result === "error") {
      throw new Error(data["error-type"]);
    }
    
    const rate = data.rates[elements.toCurr.value];
    
    if (!rate) {
      throw new Error("Currency not found in response");
    }
    
    // Format numbers appropriately
    const formattedAmount = amtVal % 1 === 0 ? amtVal : amtVal.toFixed(2);
    const finalAmount = (amtVal * rate).toFixed(2);
    
    elements.msg.innerText = `${formattedAmount} ${elements.fromCurr.value} = ${finalAmount} ${elements.toCurr.value}`;
  } catch (error) {
    console.error("Error fetching exchange rate:", error);
    elements.msg.innerText = "Failed to fetch exchange rates. Please try again later.";
    elements.msg.style.color = "red";
    
    // Fallback: Use hardcoded rates if API fails (simple example)
    const fallbackRates = {
      "USD": { "INR": 83.50, "EUR": 0.92, "GBP": 0.79 },
      "EUR": { "USD": 1.09, "INR": 90.75, "GBP": 0.86 },
      "INR": { "USD": 0.012, "EUR": 0.011, "GBP": 0.0095 }
    };
    
    if (fallbackRates[elements.fromCurr.value]?.[elements.toCurr.value]) {
      const rate = fallbackRates[elements.fromCurr.value][elements.toCurr.value];
      const finalAmount = (amtVal * rate).toFixed(2);
      elements.msg.innerText = `${amtVal} ${elements.fromCurr.value} = ${finalAmount} ${elements.toCurr.value} (using fallback rates)`;
      elements.msg.style.color = "orange";
    }
  }
};

/**
 * Updates the flag image based on selected currency
 * @param {HTMLElement} element - The select dropdown that triggered the change
 */
const updateFlag = (element) => {
  const currCode = element.value;
  let countryCode = countryList[currCode];
  
  // Special case for EUR (European Union flag)
  if (currCode === "EUR") {
    countryCode = "EU";
  }
  
  const img = element.parentElement.querySelector("img");
  if (img) {
    img.src = `https://flagsapi.com/${countryCode}/flat/64.png`;
    img.alt = `${currCode} flag`;
  }
};

/**
 * Swaps the 'from' and 'to' currencies
 */
const swapCurrencies = () => {
  [elements.fromCurr.value, elements.toCurr.value] = [elements.toCurr.value, elements.fromCurr.value];
  updateFlag(elements.fromCurr);
  updateFlag(elements.toCurr);
  updateExchangeRate();
};

/**
 * Creates and configures the swap button
 */
const createSwapButton = () => {
  const swapBtn = document.createElement("button");
  swapBtn.innerHTML = "⇄ Swap";
  swapBtn.classList.add("swap-btn");
  swapBtn.addEventListener("click", swapCurrencies);
  document.querySelector(".dropdown-container").appendChild(swapBtn);
};

/**
 * Sets up event listeners
 */
const setupEventListeners = () => {
  elements.btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
  });

  // Update rate when amount changes (with debounce)
  let timeoutId;
  elements.amountInput.addEventListener("input", () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(updateExchangeRate, 500);
  });
};

/**
 * Initializes the application
 */
const init = () => {
  initializeDropdowns();
  createSwapButton();
  setupEventListeners();
  updateExchangeRate();
  
  // Set initial flags
  updateFlag(elements.fromCurr);
  updateFlag(elements.toCurr);
};

// Start the application when DOM is loaded
window.addEventListener("DOMContentLoaded", init);