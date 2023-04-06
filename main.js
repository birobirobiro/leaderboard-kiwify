const names = document.querySelectorAll("[data-name]");
const value = document.querySelectorAll("[data-revenue]");
const namePodium = document.querySelectorAll("[data-name-podium]");
const valuePodium = document.querySelectorAll("[data-revenue-podium]");

function getFormattedRevenue(revenue) {
  const formattedRevenue = ((Math.ceil(revenue / 100) * 100 / 100) / 1000000).toFixed(1);

  return `R$ ${formattedRevenue}${revenue < 1000000 ? " K" : "M"}`;
}

const fetchData = () => {
  fetch('https://cors-everywhere.onrender.com/https://api.kiwify.com.br/v1/open/competition-ranking')
    .then(response => response.json())
    .then(data => {
      data = JSON.parse(data);

      const iterations = data.length > names.length ? names.length : data.length;

      for (let i = 0; i < iterations; i++) {
        names[i].innerHTML = data[i].competition_username;
        value[i].innerHTML = getFormattedRevenue(data[i].revenue);

        if (i < namePodium.length && i < valuePodium.length) {
          namePodium[i].innerHTML = data[i].competition_username;
          valuePodium[i].innerHTML = getFormattedRevenue(data[i].revenue);
        }
      }
    })
    .catch(error => console.error(error));
}

window.addEventListener("load", () => {
  fetchData();
  setInterval(function () {
    fetchData();
  }, 60 * 1000);
})