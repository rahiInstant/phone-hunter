var items;
const showAllBtn = document.getElementById("show-all-btn");
const showLessBtn = document.getElementById("show-less-btn");

const loadPhoneData = async (brand = "iphone") => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${brand}`
  );
  const data = await res.json();
  globalThis.items = data.data;
  const phones = data.data;
  document.getElementById("result").innerText = `${items.length} items shows.`;
  displayPhone(phones);
};
function handleShowAllBtn(length = 6) {
  if (length > 5) {
    showAllBtn.classList.remove("hidden");
  } else {
    showAllBtn.classList.add("hidden");
  }
}

function handleShowLessBtn(length = 6) {
  if (length > 5) {
    showLessBtn.classList.add("hidden");
  } else {
    showLessBtn.classList.remove("hidden");
  }
}

const displayPhone = (phones, lastIndex = 5, length) => {
  const phoneContainer = document.getElementById("phone-container");
  handleShowAllBtn(length);
  handleShowLessBtn(length);
  phoneContainer.textContent = "";
  phones = phones.slice(0, lastIndex);
  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList = `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-7xl mx-auto`;
    phoneCard.innerHTML = `
    <div class="w-80 bg-base-100 shadow-xl rounded-xl p-8 flex flex-col items-center" >
      <img class="w-40" src="${phone.image}" />
      <div class="text-center">
        <h2 class="font-bold text-2xl mt-6">${phone.phone_name}</h2>
        <p class="text-base text-[#706F6F] mt-5">
          There are many variations of passages of available, but the
          majority have suffered
        </p>
        <h2 class="font-bold text-2xl mt-2">$999</h2>
        <button class=" btn text-white bg-blue-700 mt-4 hover:text-blue-700 hover:border hover:border-blue-700">Show Details</button>
      </div>
    </div>
    `;
    // console.log(phoneCard)
    phoneContainer.appendChild(phoneCard);
  });
};

loadPhoneData();

document.getElementById("hunterBtn").addEventListener("click", function () {
  const brand = document.getElementById("hunterField").value;
  loadPhoneData(brand);
});

showAllBtn.onclick = function () {
  displayPhone(items, items.length, 5);
};

showLessBtn.onclick = function () {
  displayPhone(items, 5, 6);
};
