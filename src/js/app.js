import { data } from "../data";

export function main() {
  const container = document.querySelector(".container");

  function showTable(data) {
    container.innerHTML = "";
    for (let i = 0; i < data.length; i++) {
      const row = document.createElement("tr");
      row.classList.add("row");
      row.dataset.id = data[i].id;
      row.dataset.title = data[i].title;
      row.dataset.imdb = data[i].imdb;
      row.dataset.year = data[i].year;
      for (let j in data[i]) {
        const coll = document.createElement("td");
        coll.innerText = data[i][j];
        coll.classList.add("coll");
        row.appendChild(coll);
      }
      container.appendChild(row);
    }
  }

  function sortTable(attr, increasing = true) {
    const sortedData = [...data];
    sortedData.sort((a, b) => {
      let comparisonValue = 0;
      if (attr) {
        const valueA = a[attr];
        const valueB = b[attr];
        if (typeof valueA === "string" && typeof valueB === "string") {
          comparisonValue = valueA.localeCompare(valueB);
        } else if (typeof valueA === "number" && typeof valueB === "number") {
          comparisonValue = valueA - valueB;
        } else {
          comparisonValue = String(valueA).localeCompare(String(valueB));
        }
      } else {
        comparisonValue = 0;
      }
      return increasing ? comparisonValue : -comparisonValue;
    });
    showTable(sortedData);
  }
  showTable(data);

  const sortAttr = ["id", "title", "imdb", "year"];
  let counter = 0;

  setInterval(() => {
    const attr = sortAttr[counter % sortAttr.length];
    const increasing = counter % 2 === 0;
    sortTable(attr, increasing);
    counter++;
  }, 1000);
}
