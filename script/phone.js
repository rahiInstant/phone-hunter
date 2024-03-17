var items;
const showAllBtn = document.getElementById("show-all-btn");
const showLessBtn = document.getElementById("show-less-btn");
const modal = document.getElementById("modal");

const loadPhoneData = async (brand = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${brand}`
  );
  const data = await res.json();
  globalThis.items = data.data;
  const phones = data.data;
  document.getElementById("result").innerText = `${items.length} items shows.`;
  displayPhone(phones, isShowAll);
};
// function handleShowAllBtn(length = 6) {

// }

// function handleShowLessBtn(length = 6) {
//   if (length > 5) {
//     showLessBtn.classList.add("hidden");
//   } else {
//     showLessBtn.classList.remove("hidden");
//   }
// }

const displayPhone = (phones, isShowAll = false) => {
  const phoneContainer = document.getElementById("phone-container");
  // handleShowAllBtn(length);
  // handleShowLessBtn(length);

  if (phones.length > 5 && !isShowAll) {
    showAllBtn.classList.remove("hidden");
    showLessBtn.classList.add("hidden");
  } else {
    showAllBtn.classList.add("hidden");
    showLessBtn.classList.remove("hidden");
  }
  console.log(isShowAll);
  phoneContainer.textContent = "";
  if (!isShowAll) {
    phones = phones.slice(0, 5);
  }
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
        <button onclick="handleDetailBtn('${phone.slug}')" class=" btn text-white bg-blue-700 mt-4 hover:text-blue-700 hover:border hover:border-blue-700">Show Details</button>
      </div>
    </div>
    `;
    // console.log(phoneCard)
    phoneContainer.appendChild(phoneCard);
  });
  setTimeout(() => {
    handleLoader(false);
  }, 1000);
};

loadPhoneData();

function handleSearch(isShowAll) {
  handleLoader(true);
  const brand = document.getElementById("hunterField");
  let brandName = brand.value == "" ? "iphone" : brand.value;
  // let brandName = brand.value;
  loadPhoneData(brandName, isShowAll);
  // brand.value = ''
}

// showAllBtn.onclick = function () {
//   displayPhone(items, items.length, 5);
// };

// showLessBtn.onclick = function () {
//   displayPhone(items, 5, 6);
// };

showAllBtn.onclick = function () {
  handleSearch(true);
};

showLessBtn.onclick = function () {
  handleSearch(false);
};

function handleLoader(isLoading) {
  const loader = document.getElementById("loader").classList;
  if (isLoading) {
    loader.remove("hidden");
  } else {
    loader.add("hidden");
  }
}

async function loadPhoneDetail(id) {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await res.json();
  const phoneDetail = data.data;
  console.log(phoneDetail);
  document.getElementById("img").setAttribute("src", phoneDetail.image);
  document.getElementById("modelName").innerText = phoneDetail.name;
  document.getElementById("storage").innerText = phoneDetail.mainFeatures.memory;
  document.getElementById("display").innerText = phoneDetail.mainFeatures.displaySize;
}

function handleDetailBtn(id) {
  console.log("detail");
  console.log(id);
  loadPhoneDetail(id);
  modal.classList.remove("opacity-0");
  modal.classList.remove("pointer-events-none");
}

function handleContinueBtn() {
  modal.classList.add("opacity-0");
  modal.classList.add("pointer-events-none");
}
